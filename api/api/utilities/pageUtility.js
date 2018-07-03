const getSegment = (tasks, page = 1, pageSize = 10) => {
  if (Number.isNaN(page)) {
    page = 1
  }

  const begin = (page - 1) * pageSize
  const end = begin + pageSize
  return tasks.slice(begin, end)
}

module.exports = {
  getSegment
}
