import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import loggingMiddleware from './middlewares/loggingMiddleware'
import routesConfig from './routes/routesConfig'

const app: express.Application = express()

app.use(bodyParser.json()) //setup bodyParser for json request
app.use(cors()) //setup cors
app.use(loggingMiddleware) //setup request logger
app.use(routesConfig) //setup routes


app.get('/', (req: express.Request, res: express.Response) => {
  return res.send('Hello World!')
})

export default app
