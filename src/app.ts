import express, { json } from 'express'
import helmet from 'helmet'

export const app = express()
app.use(json())
app.use(helmet())
