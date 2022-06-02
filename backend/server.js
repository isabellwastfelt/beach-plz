import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import getEndpoints from 'express-list-endpoints'

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/beach-plz'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const port = process.env.PORT || 9090
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

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
})

const User = mongoose.model('User', UserSchema)

//--- Review schema ---//
const ReviewSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 150,
    trim: true,
  },
  // hearts: {
  //   type: Number,
  //   default: 0
  // },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
})

const Review = mongoose.model('Review', ReviewSchema)

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization')

  try {
    const user = await User.findOne({ accessToken: accessToken })

    if (user) {
      req.user = user._id
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

//--- REGISTRATION ENDPOINT ---//

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

//--- LOGIN ENDPOINT ---//

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

//--- REVIEW ENDPOINT ---//
//--- show review feed ---//

app.get('/review', authenticateUser, async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: 'desc' })
      .limit(20)
      .exec()
    res.status(200).json(reviews)({
      response: {
        id: req.user._id,
        username: req.user.username,
      },
      success: true,
    })
  } catch (error) {
    res.status(401).json({
      errors: error,
      response: 'Please log in or sign up.',
    })
  }
})

//--- POST REVIEW ---//

app.post('/review', async (req, res) => {
  const { message } = req.body

  try {
    const newReview = await new Review({ message: message }).save()
    res.status(201).json({ response: newReview, sucess: true })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

//--- DELETE REVIEW ---//

app.delete('/review/:_id', authenticateUser, async (req, res) => {
  const { _id } = req.params
  try {
    const deleteReview = await Review.findByIdAndDelete(_id)({
      response: {
        id: req.user._id,
        username: req.user.username,
      },
      success: true,
    })
    if (deleteReview) {
      res.status(200).json({ response: deleteReview })
    } else {
      res
        .status(404)
        .json({ success: false, message: 'Sorry, something went wrong', error })
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

//--- add stars??? ---//

//--- PROFILE ENDPOINT ---//
//--- show profile info ---//

app.get('/profile', authenticateUser, async (req, res) => {
  try {
    res.status(200).json({
      response: {
        id: req.user._id,
        username: req.user.username,
      },
      success: true,
    })
  } catch (error) {
    res.status(401).json({
      errors: error,
      response: 'Failed to log in.',
    })
  }
})

//--- FAVOURITES ENDPOINT ---//
//--- add(post) favourite ---//
// Taken from Happy thoughts, needs tweaking

// app.post("/thoughts/:id/like", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const likeUpdate = await Thought.findByIdAndUpdate(id, {
//       $inc: { like: 1 },
//     });
//     res.status(200).json(likeUpdate);
//   } catch (error) {
//     res.status(400).json({ response: error, success: false });
//   }
// });

//--- remove from favourites ---//

//--- START THE SERVER ---//
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

//-------------- från joannas projekt som de fick från daniel för filtrering
// app.get('/thoughts', authenticateUser)
// app.get('/thoughts', async (req, res) => {
//   const listOfproperties = Object.keys(req.params)
//   const searchCriteria = {}

//   listOfproperties.map((singleCriteria) => {
//     searchCriteria[singleCriteria] = req.params[singleCriteria]
//   })

//   const thoughts = await Thought.find(searchCriteria)
//   res.status(200).json({ response: thoughts, success: true })
// })
