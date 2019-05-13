'use strict'

const fs = require('fs')

const loadStorage = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./commands/casino/bank/storage.json', (err, data) => {
      if (err) {
        return reject(err)
      }
      return resolve(data)
    })
  })
}

const saveStorage = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile('./commands/casino/bank/storage.json', data, (err) => {
      return err ? reject(err) : resolve(data)
    })
  })
}

class Storage {
  static load () {
    return loadStorage()
  }
  static save () {
    return saveStorage()
  }
}

module.exports = Storage
