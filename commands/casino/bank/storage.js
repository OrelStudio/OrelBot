'use strict'

const fs = require('fs')

const loadStorage = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./commands/casino/bank/storage.json', 'utf8', (err, data) => {
      if (err) {
        return reject(err)
      }
      return resolve(JSON.parse(data))
    })
  })
}

const saveStorage = (data = []) => {
  return new Promise((resolve, reject) => {
    fs.writeFile('./commands/casino/bank/storage.json', JSON.stringify(data, null, 2), (err) => {
      return err ? reject(err) : resolve(data)
    })
  })
}

class Storage {
  static load (...args) {
    return loadStorage(...args)
  }
  static save (...args) {
    return saveStorage(...args)
  }
}

module.exports = Storage
