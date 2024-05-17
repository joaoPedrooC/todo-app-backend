import express, { json } from 'express'
import helmet from 'helmet'
import { userRouter } from './routes/user.routes'

export const app = express()
app.use(json())
app.use(helmet())

app.use('/users', userRouter)