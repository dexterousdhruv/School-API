import { config } from 'dotenv'
import express from 'express'
import cors from 'cors'
import schoolRoutes from './routes/school.route.js'
import { errorResponse } from './utils/error.js'


config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors()) 
app.use(express.json())
app.use(schoolRoutes)
app.use(errorResponse) 

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
