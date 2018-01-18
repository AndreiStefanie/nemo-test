const express = require('express')
const bodyParser = require('body-parser')
const cfenv = require('cfenv')
const userApi = require('./server/api/user.js')
const dbConn = require('./server/database/mongo-connect.js')
const client = require('./client/routes/route.js')
const validator = require('express-validator')

const app = express()

const env = cfenv.getAppEnv()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(validator())

dbConn(env)

const apiPrefix = '/api'

const userRouter = express.Router()
userRouter.get('/', userApi.getUsers)
userRouter.get('/:id', userApi.getUser)
userRouter.post('/', userApi.createUser)
userRouter.delete('/:id', userApi.deleteUser)
userRouter.delete('/clean', userApi.cleanUsers)
app.use(`${apiPrefix}/user`, userRouter)

app.use(express.static(`${__dirname}/client/public/webapp`))

// bootstrap front-end app
client(app)

app.listen(env.port, () => {
  if (env.isLocal === true) {
    console.log(`Listening at ${env.url}`)
  }
})
