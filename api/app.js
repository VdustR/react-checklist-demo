const Koa = require('koa')

const modules = {
  get config () { return require('./config') },
  get serve () { return require('./serve') },
  get api () { return require('./api') }
}

const app = new Koa()
const { port } = modules.config

modules.api(app)
modules.serve(app)

app.listen(port)
console.log(`app is listening on ${port}!`)
