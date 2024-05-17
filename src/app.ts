import 'express-async-errors'
import express, { json } from 'express'
import helmet from 'helmet'

import { HandleErrors } from './middlewares/handleErrors.middleware'

import { userRouter } from './routes/user.routes'
import { sessionRouter } from './routes/session.routes'

export const app = express()
app.use(helmet())
app.use(json())

app.use('/users', userRouter)
app.use('/session', sessionRouter)

app.use(HandleErrors.execute)