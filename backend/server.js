import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import getEndpoints from 'express-list-endpoints'

import beaches from './data/beaches.json'

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/beach-plz'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const port = process.env.PORT || 9090
const app = express()

app.use(cors())
app.use(express.json())

//-------------------------USER SCHEMA-------------------------//
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxLength: 12,
    minLength: 8,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
  },
  favorites: {
    type: Array,
  },
})

const User = mongoose.model('User', UserSchema)

//-------------------------REVIEW SCHEMA-------------------------//
const ReviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  authorName: {
    type: String,
    required: false,
  },
  beachId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Review = mongoose.model('Review', ReviewSchema)

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization')

  try {
    const user = await User.findOne({ accessToken: accessToken })

    if (user) {
      req.user = user._id
      req.username = user.username
      next()
    } else {
      res.status(401).json({
        response: 'Please log in.',
        success: false,
      })
    }
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false,
    })
  }
}

//--- LIST OF ENDPOINTS ---//

app.get('/', (req, res) => {
  res.send(getEndpoints(app))
})

//-------------------------REGISTRATION ENDPOINT-------------------------//

app.post('/registration', async (req, res) => {
  const { username, password } = req.body
  try {
    const salt = bcrypt.genSaltSync()

    if (password.length < 8) {
      res.status(400).json({
        response: 'Password must be at least 8 characters long',
        success: false,
      })
    } else {
      const newUser = await new User({
        username: username,
        password: bcrypt.hashSync(password, salt),
      }).save()
      res.status(201).json({
        response: {
          username: newUser.username,
          userId: newUser._id,
          accessToken: newUser.accessToken,
        },
        success: true,
      })
    }
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false,
      message: 'Could not create user.',
    })
  }
})

//-------------------------LOGIN ENDPOINT-------------------------//

app.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        username: user.username,
        accessToken: user.accessToken,
        userId: user._id,
      })
    } else {
      res.status(400).json({
        response: "Username and password don't match",
        success: false,
      })
    }
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false,
    })
  }
})

//-------------------------GET ALL BEACHES-------------------------//

app.get('/beaches', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user })
    const modified = beaches.map((beach) => {
      return {
        ...beach,
        isFavorite: user.favorites.includes(beach.id),
      }
    })

    res.status(200).send({ response: modified, success: true })
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false,
    })
  }
})

//----------------------GET A SPECIFIC BEACH--------------------//

// endpoint for name
app.get('/beach/:id', authenticateUser, async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById({ _id: req.user })
    const beach = beaches.find((beach) => beach.id === id)
    const reviews = await Review.find().where('beachId').in(id)

    if (beach) {
      res.status(200).json({
        beach: {
          ...beach,
          isFavorite: user.favorites.includes(beach.id),
        },
        reviews,
        success: true,
      })
    } else {
      res.status(404).json({
        response: 'No data found',
        success: false,
      })
    }
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false,
    })
  }
})

//-----------------------------PROFILE ENDPOINT-------------------------------//

app.get('/profile', authenticateUser, async (req, res) => {
  const user = await User.findOne({ _id: req.user })
  const reviews = await Review.find({ userId: req.user })

  const userSend = {
    username: user.username,
    favorites: user.favorites,
    reviews: reviews,
  }

  res.send({ ...userSend, success: true }).status(200)
})

//-------------------------FAVORITE------------------------//

// ADD FAVORITES

app.post('/beach/:id/favorite', authenticateUser, async (req, res) => {
  const { id } = req.params
  const user = await User.findOne({ _id: req.user })

  try {
    // om den inte finns
    if (user.favorites.indexOf(id) === -1) {
      // so ere din favvis
      user.favorites.push(id)
      user.save()

      res.send({ favorites: user.favorites, success: true }).status(200)
    } else {
      res.send({ message: 'already in favorites' }).status(201)
    }
  } catch (err) {
    res.send(err).status(400)
  }
})

// REMOVE FAVORITES

app.delete('/beach/:id/favorite', authenticateUser, async (req, res) => {
  const { id } = req.params
  const user = await User.findOne({ _id: req.user })

  try {
    // om den finns

    // har du bara alla andra 'n den i din favs
    const favs = user.favorites.filter((beach) => beach !== id)
    user.favorites = favs
    user.save()

    res.send({ favorites: user.favorites, success: true }).status(200)
  } catch (err) {
    res.send(err).status(400)
  }
})

//-------------------------REVIEW ENDPOINT-------------------------//

app.get('/review', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: 'desc' })
    res.status(200).json(reviews)
  } catch (error) {
    res.status(401).json({
      errors: error,
      response: 'Please log in or sign up.',
    })
  }
})

//--------------------------POST REVIEW-------------------------//

app.post('/review/:beachId', authenticateUser, async (req, res) => {
  const { beachId } = req.params

  try {
    const { message } = req.body
    const userId = req.user._id
    const authorName = req.username

    const newReview = await new Review({
      message: message,
      userId,
      authorName: authorName,
      beachId,
    }).save()
    console.log(newReview)
    res.status(201).json({ response: newReview, sucess: true })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

//-------------------------DELETE REVIEW-------------------------//

app.delete('/review/:reviewId', authenticateUser, async (req, res) => {
  const { reviewId } = req.params

  await Review.deleteOne({
    userId: req.user,
    _id: reviewId,
  })

  const reviews = await Review.find({ userId: req.user })
  res.send({ success: true, reviews }).status(200)
})

//-------------------------START THE SERVER-------------------------//
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
