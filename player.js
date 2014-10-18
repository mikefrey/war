var Deck = require('./deck')

var Player = module.exports = function() {
  this.hand = new Deck([])
  this.discard = new Deck([])
}
