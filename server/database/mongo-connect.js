const mongoose = require('mongoose')
const autoInc = require('mongoose-auto-increment')

mongoose.Promise = global.Promise

const connect = (env) => {
  if (env.isLocal === true) {
    mongoose.connect('mongodb://localhost:27017/test', {
      useMongoClient: true,
    })
  } else {
    mongoose.connect(env.services.mlab[0].credentials.uri, {
      useMongoClient: true,
    })
  }
  autoInc.initialize(mongoose.connection)
  mongoose.plugin(autoInc.plugin)
}

module.exports = connect
