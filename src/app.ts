require('dotenv').config('../.env')
import express from 'express'
import router from './routes'
import connectDB from './utils/connectDB'

const port = process.env.PORT

const app = express()
app.use(express.json())
app.use(router)

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`)
  connectDB()
})