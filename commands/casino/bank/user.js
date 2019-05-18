'use strict'

const fs = require('fs')
const Promise = require('bluebird')

const Storage = require('./storage')

class User {
  constructor (options = {}) {
    this.id = options.id
    this.money = options.money || 0
    this.author = options.username || ''
  }

  get username () {
    return this.author ? this.author : ''
  }

  load () {
    return Storage.load().then((data) => {
      return data.find((user) => user.id === this.id)
    }).then((user) => {
      if (!user) {
        return Promise.reject(new Error('User is not exist'))
      }
      this.id = user.id
      this.money = user.money
      this.author = username
      return this
    })
  }

  save () {
    return Storage.load().then((data = []) => {
      const index = data.findIndex(user => user.id === this.id)
      const newData = index > 0 ? [...data.slice(0, index), this.toJSON(), ...data.slice(index + 1, data.length)] : [...data, this.toJSON()]
      return Storage.save(newData)
    }).then((data = []) => {
      const user = data.find((user) => user.id === this.id)
      if (!user) {
        return Promise.reject(new Error('User wasn\'t saved'))
      }
      return user
    })
  }

  setMoney (money) {
    const {money: originMoney} = this
    this.money = money
    return this.save().catch((e) => {
      this.money = originMoney
      return Promise.reject(e)
    })
  }

  toJSON () {
    const {id, username, money} = this
    return {id, username, money}
  }

  static getFromMessage (message = {}) {
    return new User({
      id: message.author ? message.author.id : null,
      username: message.author ? message.author.username : null
    })
  }
}

module.exports = User
