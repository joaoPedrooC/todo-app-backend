import 'express-async-errors'
import express, { json } from 'express'
import helmet from 'helmet'
import cors, { CorsOptions } from 'cors'

import { HandleErrors } from './middlewares/handleErrors.middleware'

import { userRouter } from './routes/user.routes'
import { sessionRouter } from './routes/session.routes'
import { todoRouter } from './routes/todo.routes'

const corsOptions: CorsOptions = {
  origin: 'http://localhost:5173'
}

export const app = express()

app.use(helmet())
app.use(json())
app.use(cors())

app.use('/users', userRouter)
app.use('/session', sessionRouter)
app.use('/todos', todoRouter)

app.use(HandleErrors.execute)