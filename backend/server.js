import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import getEndpoints from 'express-list-endpoints'

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/beach-plz'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080
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
    maxlength: 12,
    minlength: 8,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
  },
})

const User = mongoose.model('User', UserSchema)

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

//--- BEACHES ENDPOINT ---//

app.get('/beaches', authenticateUser, async (req, res) => {
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

//--- REVIEW ENDPOINT ---//

app.get('/review', authenticateUser, async (req, res) => {
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

//--- PROFILE ENDPOINT ---//

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

//--- START THE SERVER ---//
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
