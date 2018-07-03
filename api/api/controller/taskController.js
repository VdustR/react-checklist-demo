const modules = {
  get taskManager () { return require('../component/taskManager') },
  get pageUtility () { return require('../utilities/pageUtility') },
  get apiServerUtility () { return require('../utilities/apiServerUtility') }
}

const setResponse = modules.apiServerUtility.setResponse

const getTaskByIdViaCtx = ctx => {
  const id = ctx.params.id
  if (!id) {
    return null
  }
  const task = modules.taskManager.getById(id)
  return task
}

const validContent = content => {
  return !content || content !== content.trim()
}

const taskController = {
  getAll: async (ctx, next) => {
    let page = Number(ctx.request.query.page || 1)

    if (Number.isNaN(page)) {
      page = 1
    }

    const total = modules.taskManager.tasks.length
    const tasks = modules.pageUtility.getSegment(modules.taskManager.sortedTasks, page)

    setResponse(ctx.response, {
      result: tasks,
      total
    })

    await next()
  },

  create: async (ctx, next) => {
    const { body } = ctx.request
    const { content } = body
    if (validContent(content)) {
      setResponse(ctx.response, {
        error: {
          code: 'formInvalid'
        }
      })
      await next()
      return
    }
    const duplicatedTasks = modules.taskManager.findAll(task => task.content === content)
    if (duplicatedTasks.length > 0) {
      setResponse(ctx.response, {
        error: {
          code: 'contentDuplicated'
        }
      })
      await next()
      return
    }

    const task = modules.taskManager.create({ content })
    setResponse(ctx.response, { result: task.id })
    await next()
  },

  update: async (ctx, next) => {
    const target = getTaskByIdViaCtx(ctx)
    if (!target) {
      setResponse(ctx.response, {
        error: {
          code: 'notFound'
        }
      })
      return
    }
    const { body } = ctx.request
    const { content } = body
    if (validContent(content)) {
      setResponse(ctx.response, {
        error: {
          code: 'formInvalid'
        }
      })
      await next()
      return
    }
    const taskManager = modules.taskManager
    let duplicatedTasks = taskManager.findAll(task => task.content === content)
    duplicatedTasks = duplicatedTasks.filter(task => task !== target)
    if (duplicatedTasks.length > 0) {
      setResponse(ctx.response, {
        error: {
          code: 'contentDuplicated'
        }
      })
      await next()
      return
    }
    target.content = content
    setResponse(ctx.response, { result: true })
    await next()
  },

  remove: async (ctx, next) => {
    const target = getTaskByIdViaCtx(ctx)
    if (!target) {
      setResponse(ctx.response, {
        error: {
          code: 'notFound'
        }
      })
      return
    }
    const taskManager = modules.taskManager
    taskManager.rm(target)
    setResponse(ctx.response, { result: true })
    await next()
  },

  pinned: async (ctx, next) => {
    const target = getTaskByIdViaCtx(ctx)
    if (!target) {
      setResponse(ctx.response, {
        error: {
          code: 'notFound'
        }
      })
      return
    }
    target.pinned = true
    setResponse(ctx.response, { result: true })
    await next()
  },

  unpinned: async (ctx, next) => {
    const target = getTaskByIdViaCtx(ctx)
    if (!target) {
      setResponse(ctx.response, {
        error: {
          code: 'notFound'
        }
      })
      return
    }
    target.pinned = false
    setResponse(ctx.response, { result: true })
    await next()
  },

  checked: async (ctx, next) => {
    const target = getTaskByIdViaCtx(ctx)
    if (!target) {
      setResponse(ctx.response, {
        error: {
          code: 'notFound'
        }
      })
      return
    }
    target.checked = true
    setResponse(ctx.response, { result: true })
    await next()
  },

  unchecked: async (ctx, next) => {
    const target = getTaskByIdViaCtx(ctx)
    if (!target) {
      setResponse(ctx.response, {
        error: {
          code: 'notFound'
        }
      })
      return
    }
    target.checked = false
    setResponse(ctx.response, { result: true })
    await next()
  }
}

module.exports = taskController
