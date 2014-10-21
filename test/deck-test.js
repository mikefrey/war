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
    var notExpected = deck.cards.reduce(concatNum, '')
    deck.shuffle()
    var actual = deck.cards.reduce(concatNum, '')
    t.notEqual(actual, notExpected, 'Shuffles cards')
  })

  t.test('deck.draw', function(t) {
    t.plan(2)

    var deck = new Deck()
    var expected = deck.cards[0]
    var actual = deck.draw()
    t.equal(actual, expected, 'Draws a card off the top of the deck')

    expected = deck.cards.slice(0, 3).reduce(concatNum, '')
    actual = deck.draw(3).reduce(concatNum, '')
    t.deepEqual(actual, expected, 'Draws multiple cards from the top of the deck')
  })

  t.test('deck.deal', function(t) {
    t.plan(4)

    var deck = new Deck([1,2,3,4])
    var expected = [[1,3],[2,4]]
    var actual = deck.deal(2)
    t.deepEqual(actual, expected, 'Deals cards into two stacks')

    deck = new Deck([1,2,3,4,5,6])
    expected = [[1,4],[2,5],[3,6]]
    actual = deck.deal(3)
    t.deepEqual(actual, expected, 'Deals cards into three stacks')

    deck = new Deck([1,2,3,4,5])
    expected = [[1,3],[2,4],[5]]
    actual = deck.deal(2, true)
    t.deepEqual(actual, expected, 'Can force even stacks with remainder stack')

    deck = new Deck([1,2,3,4,5])
    expected = [[1,3,5],[2,4]]
    actual = deck.deal(2)
    t.deepEqual(actual, expected, 'Will deal unevenly')

  })

  t.test('deck.cut', function(t) {
    t.plan(1)

    var deck = new Deck([1,2,3,4,5,6,7,8,9,0])
    deck.cut()
    var actual = deck.cards[deck.cards.indexOf(0)+1]
    var expected = 1
    t.equal(actual, expected, 'Cuts cards')
  })

})
