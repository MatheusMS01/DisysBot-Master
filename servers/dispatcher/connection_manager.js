
const shortid = require('shortid')

var connections = []

module.exports.add = function (connection) {
  connection.id = shortid.generate()
  connections.push(connection)
}

module.exports.remove = function (connection) {
  const index = connections.indexOf(connection)

  if (index > -1) {
    connections.splice(index, 1)
  }
}

module.exports.get = function get(id) {
  connections.forEach(function (connection) {
    if (connection.id === id) {
      return connection
    }
  })

  return null
}

module.exports.send = function (id, packet) {
  const socket = get(id)

  if (!socket) {
    throw 'connection not found'
  }

  socket.write(packet)
}