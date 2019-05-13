'use strict'

const User = require('./user')
const Storage = require('./storage')

// users
const users = []


class Bank {
  static register (user) { // user will be message.author => <@id> * user instance, get the first number that is the id, nah
    return Storage.load().then((users = []) => {
      const registeredUser = users.find(u => user.id === u.id) // user.author.id, user.author is the parameter "user"
      if (registeredUser) {
        return registeredUser
      }
      const newUser = new User(user)
      return newUser.save()
    })
  }

  static getUser (id) { // try to create new user if doesn't exist *read above at register function*
    return Promise.resolve().then(() => {
      if (users.hasOwnProperty(id)) {
        return users[id]
      }
      const user = new User({id})
      return user.load()
    })
  }

  /**
   *  creates new array with id and user of every user registered
   */
  static getUsers (ids = []) {
    return Storage.load().then((users = []) => {
      const usersByIds = users.reduce((obj, user) => {
        obj[user.id] = user
        return obj
      }, {})
      return ids.map((id) => {
        return usersByIds[id]
      })
    })
  }

  static getMoney (user) {
    return Storage.load().then((users = []) => {
      const tUser = user.find(u => user.id === u.id)
      getUser(tUser)
      return tUser.money
    })
  }

  /**
   * move money from A to B
   */
  static transact (movedBy, elseUser, sumMoney) {
    Storage.load().then(() => {
      if (users.hasOwnProperty(movedBy.id) && users.hasOwnProperty(elseUser.id)) {
        movedBy.money -= sumMoney
        elseUser.money = sumMoney
      }
    })
  }

  static addMoney (addedTo, sum) {
    Storage.load(() => {
      if (users.hasOwnProperty(addedTo, sum)) {
        addedTo.money = sum
      }
    })
  }
}

module.exports = Bank
