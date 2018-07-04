class Task {
  constructor (params = {}) {
    this.id = null
    this.content = ''
    this.checked = false
    this.createdTime = new Date()
    this.updatedTime = new Date()
    Object.assign(this, params)
  }
}

module.exports = Task
