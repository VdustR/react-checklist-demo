const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const modules = {
  get applyCors () { return require('./cors') },
  get taskController () { return require('./controller/taskController') }
}

const router = new Router()
const apiRouter = new Router()

apiRouter.use(bodyParser())

apiRouter.get('/tasks', modules.taskController.getAll)
apiRouter.post('/tasks', modules.taskController.create)
apiRouter.put('/tasks/:id', modules.taskController.update)
apiRouter.delete('/tasks/:id', modules.taskController.remove)
apiRouter.put('/tasks/:id/checked', modules.taskController.checked)
apiRouter.delete('/tasks/:id/checked', modules.taskController.unchecked)

modules.applyCors(router)
router.use('/api', apiRouter.routes(), apiRouter.allowedMethods())
router.use('/api', async () => {})

const applyApiRouter = app => {
  app
    .use(apiRouter.routes())
    .use(apiRouter.allowedMethods())
}

module.exports = applyApiRouter
