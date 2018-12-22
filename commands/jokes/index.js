'use strict'

const collection = require('./collection')

const getStringJoke = (joke) => {
  return `Question: ${joke.question} Answer: ${joke.answer}`
}

class Jokes {
  static get() {
    const number = Math.round(Math.random() * (collection.length - 1))
    return getStringJoke(collection[number])
  }
}

module.exports = Jokes
