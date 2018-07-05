const Koa = require('koa')
const cors = require('@koa/cors')

const modules = {
  get config () { return require('./config') },
  get serve () { return require('./serve') },
  get api () { return require('./api') }
}

const app = new Koa()
app.use(cors({ origin: '*' }))
const { port } = modules.config

modules.api(app)
modules.serve(app)

app.listen(port)
console.log(`app is listening on ${port}!`)
