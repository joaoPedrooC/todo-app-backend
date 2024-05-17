import express, { json } from 'express'
import helmet from 'helmet'
import { userRouter } from './routes/user.routes'
import { HandleErrors } from './middlewares/handleErrors.middleware'

export const app = express()
app.use(helmet())
app.use(json())

app.use('/users', userRouter)

app.use(HandleErrors.execute)