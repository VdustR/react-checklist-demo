const util = require('util')

const hasOwnProperty = Object.prototype.hasOwnProperty

const errorCodeToStatusMap = {
  contentDuplicated: 400,
  formInvalid: 400,
  notFound: 404
}

const getStatus = code => {
  if (hasOwnProperty.call(errorCodeToStatusMap, code)) {
    return errorCodeToStatusMap[code]
  }

  throw new Error(`${util.inspect(code)} not found in \`errorCodeToStatusMap\``)
}

const setResponse = (response, {
  status = null,
  error = null,
  result = null,
  total = null
}) => {
  if (error) {
    response.status = status || getStatus(error.code)
    response.body = JSON.stringify({ error })
    return
  }

  if (status) {
    response.status = status
  }

  const body = { result }
  if (total !== null) {
    body.total = total
  }

  response.body = JSON.stringify(body)
}

module.exports = {
  setResponse
}
