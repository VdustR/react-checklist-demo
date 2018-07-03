const modules = {
  get Task () { return require('../resource/Task') },
  get chance () { return require('../utilities/chanceUtility') }
}

const getId = () => modules.chance.hash({length: 8})

class TaskManager {
  constructor () {
    this.tasks = []
  }

  get sortedTasks () {
    return this.tasks.sort((a, b) => {
      if (a.pinned && !b.pinned) {
        return 1
      }
      if (!a.pinned && b.pinned) {
        return -1
      }
      if (a.checked && !b.checked) {
        return 1
      }
      if (!a.checked && b.checked) {
        return -1
      }
      return b.updatedTime - a.updatedTime
    })
  }

  push (task) {
    const tasks = this.tasks
    if (!tasks.includes(task)) {
      tasks.push(task)
    }
    return this
  }

  rm (task) {
    const tasks = this.tasks
    let index = null
    do {
      index = tasks.indexOf(task)
      const exist = index >= 0
      if (exist) {
        tasks.splice(index, 1)
      }
    } while (tasks.includes(task))
    return this
  }

  findAll (fn) {
    const tasks = this.tasks
    const matchedTasks = tasks.filter(fn)
    return matchedTasks
  }

  getNewId () {
    const tasks = this.tasks
    let id = null
    let counter = 3
    do {
      if (counter-- === 0) {
        // TODO: bad practice
        throw new Error('too many duplicated id spawn')
      }
      id = getId()
    } while (tasks.find(task => task.id === id))
    return id
  }

  create ({ content }) {
    const Task = modules.Task

    const task = new Task({
      id: this.getNewId(),
      content
    })
    this.push(task)
    return task
  }

  getById (id) {
    const tasks = this.tasks
    const task = tasks.find(task => task.id === id) || null
    return task
  }
}

const taskManager = new TaskManager()

module.exports = taskManager
