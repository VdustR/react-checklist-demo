class Task {
  constructor ({ content, id }) {
    this.id = id
    this.content = content
    this.checked = false
    this.pinned = false
    this.createdTime = new Date()
    this.updatedTime = new Date()
  }
}

module.exports = Task
