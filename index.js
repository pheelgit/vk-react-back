import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'
import dotenv from 'dotenv'

import { UserController } from './controllers/index.js'
import { checkAuth } from './utils/index.js'

import postRoutes from './routes/postRoutes.js'
import authRoutes from './routes/authRoutes.js'
import friendRoutes from './routes/friendRoutes.js'

const user = process.env.DB_USER || 'pheel'
const password = process.env.DB_PASSWORD || '16288277101alj'

const { DB_USER, DB_PASSWORD } = dotenv.config().parsed

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@vk-react.ydb4hpp.mongodb.net/miniVK?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('db Ok')
  })
  .catch(err => {
    console.log('Db error:', err)
  })

const app = express()
app.use(express.json())
app.use(cors())
// app.use('/uploads', express.static('uploads'))

// const storage = multer.diskStorage({
//   destination: (_, _1, cb) => {
//     cb(null, 'uploads')
//   },
//   filename: (_, file, cb) => {
//     cb(null, file.originalname)
//   },
// })

// const upload = multer({ storage })

app.use('/api/auth/', authRoutes)
app.use('/api/post', postRoutes)
app.use('/api/friend', friendRoutes)

//getUser
app.get('/:id', checkAuth, UserController.getUser)

// app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
//   res.status(200).json({
//     message: 'изображение загруженно',
//     url: `/uploads/${req.file?.originalname}`,
//   })
// })

app.get('/', async (req, res) => {
  return res.status(200).send(`все работает ${DB_PASSWORD} \ ${DB_USER}`)
})

app.listen(4444, err => {
  if (err) {
    return console.log(err)
  }

  console.log('server Ok')
})
