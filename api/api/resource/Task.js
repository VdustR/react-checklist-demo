class Task {
  constructor (params = {}) {
    this.id = null
    let content = ''
    Object.defineProperty(this, 'content', {
      enumerable: true,
      get: () => content,
      set: val => {
        this.updatedTime = new Date()
        content = val
      }
    })
    this.checked = false
    this.createdTime = new Date()
    this.updatedTime = new Date()
    Object.assign(this, params)
  }
}

module.exports = Task
