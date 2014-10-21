var test = require('tape')
var assert = require('assert')
var Deck = require('../deck.js')

test('Deck Class', function(t) {

  t.test('Deck exists', function(t) {
    t.plan(1)
    t.ok(Deck, 'Deck exists')
  })

})

test('Deck Instance', function(t) {

  function concatNum(m, c) { return m + c.number }

  t.test('deck.shuffle', function(t) {
    t.plan(1)

    var deck = new Deck()
    var initialCards = deck.cards.reduce(concatNum, '')
    deck.shuffle()
    var shuffledCards = deck.cards.reduce(concatNum, '')
    t.notEqual(initialCards, shuffledCards, 'Shuffles cards')
  })

  t.test('deck.draw', function(t) {
    t.plan(2)

    var deck = new Deck()
    var firstCard = deck.cards[0]
    var card = deck.draw()
    t.equal(firstCard, card, 'Draws a card off the top of the deck')

    var firstThree = deck.cards.slice(0, 3).reduce(concatNum, '')
    var drawThree = deck.draw(3).reduce(concatNum, '')
    t.deepEqual(firstThree, drawThree, 'Draws multiple cards from the top of the deck')
  })



})
