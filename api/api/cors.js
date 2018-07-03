const cors = require('@koa/cors')

const applyCors = app => app.use(cors())

module.exports = applyCors
