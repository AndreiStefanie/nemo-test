const path = require('path')

module.exports = (express) => {
  express.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/webapp/', 'index.html'))
  })
}
