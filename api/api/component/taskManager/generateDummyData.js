const modules = {
  get chance () { return require('../../utilities/chanceUtility') },
  get Task () { return require('../../resource/Task') },
  get taskManager () { return require('./index') }
}

const Task = modules.Task

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

// configuration
const minWords = 1
const maxWords = 3
const minTimeDiff = 1 * MINUTE
const maxTimeDiff = 3 * DAY
const minDummySize = 11
const maxDummySize = 30

const generateTask = () => {
  const {
    chance,
    taskManager
  } = modules
  let content = chance.sentence({ words: chance.natural({ min: minWords, max: maxWords }) })
  content = content.substr(0, content.length - 1) // remove dot
  const createdTime = chance.date()
  const timeDiff = chance.bool() ? 0 : chance.natural({ min: minTimeDiff, max: maxTimeDiff })
  const updatedTime = new Date(Number(createdTime) + timeDiff)
  const task = new Task({
    id: taskManager.getNewId(),
    content: content,
    checked: chance.bool(),
    createdTime,
    updatedTime
  })
  modules.taskManager.push(task)
}

const generateDummy = () => {
  const {
    chance
  } = modules
  const size = chance.natural({ min: minDummySize, max: maxDummySize })
  console.log(`generating ${size} tasks`)
  Array.from(Array(size)).forEach(generateTask)
}

module.exports = generateDummy
