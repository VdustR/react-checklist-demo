const path = require('path')
const serve = require('koa-static')

const absolutePath = path.resolve(__dirname, '../../build')
const middleware = serve(absolutePath)

module.exports = app => app.use(middleware)
