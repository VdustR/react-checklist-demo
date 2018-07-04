const modules = {
  get Task () { return require('../../resource/Task') },
  get chance () { return require('../../utilities/chanceUtility') },
  get generateDummyData () { return require('./generateDummyData') }
}

const getId = () => modules.chance.hash({length: 8})

const defaultSortPriority = ['updatedTime', 'content', 'createTime']

const localeCompare = (strA, strB) => {
  return strA.localeCompare(strB, undefined, {
    sensitivity: 'base'
  })
}

class TaskManager {
  constructor () {
    this.tasks = []
  }

  query ({
    checked,
    orderBy = null,
    order = 'desc'
  }) {
    let tasks = this.tasks
    if (checked !== undefined) {
      tasks = tasks.filter(task => task.checked === checked)
    }

    const isAsc = order === 'asc'
    let sortPriority = [...defaultSortPriority]
    if (orderBy && defaultSortPriority.includes(orderBy)) {
      sortPriority = sortPriority.filter(prop => prop !== orderBy)
      sortPriority = [orderBy, ...sortPriority]
    }

    return tasks.sort((a, b) => {
      for (let property of sortPriority) {
        const aVal = a[property]
        const bVal = b[property]
        if (a[property] !== b[property]) {
          if (property === 'content') {
            return isAsc ? localeCompare(aVal, bVal) : localeCompare(bVal, aVal)
          }
          return isAsc ? aVal - bVal : bVal - aVal
        }
      }

      return 0
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

setImmediate(modules.generateDummyData)

module.exports = taskManager
