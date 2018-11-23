'use strict'

const Discord = require('discord.js')
const Promise = require('bluebird')
const RP = require('request-promise')
const EventEmitter = require('eventemitter2')

const FREQUENCY = 2500
const COINS_API = 'https://api.coinmarketcap.com/v1/ticker/'

const mediator = new EventEmitter()

let isPolling = false

module.exports = class Holdings {
  /**
   * Fetches data from the api
   */
  static fetch () {
    return RP({
      url: COINS_API,
      method: 'GET',
      json: true
    })
  }

  /**
   * Activate the polling
   */
  static startPolling () {
    isPolling = true
    return Holdings.poll()
  }

  /**
   * Poll requests from the api
   */
  static poll () {
    return Holdings.fetch().then((data) => {
      mediator.emit('data', data)
      if (isPolling) {
        setTimeout(Holdings.poll, FREQUENCY)
      }
    })
  }

  /**
   * Passing functions to the event emitter
   */
  static on (...args) {
    return mediator.on(...agrs)
  }

  static off (...args) {
    return mediator.on(...agrs)
  }

  static emit (...args) {
    return mediator.on(...agrs)
  }
}
