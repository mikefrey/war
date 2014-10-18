var Deck = require('./deck')
var Player = require('./player')

var deck = new Deck()
var player1 = new Player()
var player2 = new Player()

deck.shuffle(3)
// console.log(deck.cards)

var hands = deck.deal(2)
player1.hand.cards = hands[0]
player2.hand.cards = hands[1]

player1.hand.shuffle()
player2.hand.shuffle()

console.log('Post shuffle: P1 %d, P2 %d', cardCount(player1), cardCount(player2))

function playersHaveCards() {
  return !(player1.hand.empty() && player1.discard.empty()) &&
         !(player2.hand.empty() && player2.discard.empty())
}

function cardCount(player) {
  return player.hand.count() + player.discard.count()
}

function moveDiscardToHand(player) {
  player.discard.shuffle()
  var hand = player.hand.cards
  hand.splice.apply(hand, [hand.length, 0].concat(player.discard.cards))
  player.discard.cards.length = 0
}

function trade(player, cards, others) {
  if (!Array.isArray(cards)) cards = [cards]
  for (var i = 0; i < cards.length; i+=1) {
    var t = cards[i].trades
    cards[i].trades = t ? t+1 : 1
  }
  discard(player, cards)
  discard(player, others)
}

function discard(player, cards) {
  if (!Array.isArray(cards)) cards = [cards]
  var discardPile = player.discard.cards
  discardPile.push.apply(discardPile, cards)
}

function safeDraw(deck, num) {
  var count = deck.count()
  num = count < num+1 ? count-1 : num
  if (num == 0) return []
  var cards = deck.draw(num)
  if (!Array.isArray(cards)) cards = [cards]
  return cards
}

function compareCards() {
  var card1 = player1.hand.draw()
  var card2 = player2.hand.draw()

  console.log('  Played:    P1 %d   P2 %d', card1.number, card2.number)

  if (card1.number > card2.number) {
    trade(player1, card2, card1)
    return player1
  }
  else if (card2.number > card1.number) {
    trade(player2, card1, card2)
    return player2
  }
  else if (card1.number == card2.number) {
    return war(card1, card2)
  }
}

function war(card1, card2) {
  if (cardCount(player1) == 0) {
    trade(player2, card1, card2)
    return player2
  }
  if (cardCount(player2) == 0) {
    trade(player1, card2, card1)
    return player1
  }

  if (player1.hand.count() < 4) {
    console.log('  Player 1 hand is empty')
    moveDiscardToHand(player1)
  }
  if (player2.hand.count() < 4) {
    console.log('  Player 2 hand is empty')
    moveDiscardToHand(player2)
  }

  var p1Cards = safeDraw(player1.hand, 3)
  var p2Cards = safeDraw(player2.hand, 3)

  p1Cards.push(card1)
  p2Cards.push(card2)

  var winner = compareCards()

  if (winner == player1) {
    trade(player1, p2Cards, p1Cards)
  }
  else if (winner == player2) {
    trade(player2, p1Cards, p2Cards)
  }
  return winner
}


var iteration = 0
while(playersHaveCards() && iteration < 1000) {
  console.log('Iteration %d', iteration)

  if (player1.hand.empty()) {
    console.log('  Player 1 hand is empty')
    moveDiscardToHand(player1)
  }

  if (player2.hand.empty()) {
    console.log('  Player 2 hand is empty')
    moveDiscardToHand(player2)
  }

  compareCards()

  // console.log(playersHaveCards())
  console.log('  In hand:   P1 %d, P2 %d', player1.hand.count(), player2.hand.count())
  console.log('  Remaining: P1 %d, P2 %d', cardCount(player1), cardCount(player2))

  iteration+=1
}

console.log('Game Over in %d iterations', iteration)

if (player1.hand.empty() && player1.discard.empty())
  console.log('Player 2 wins')
else if (player2.hand.empty() && player2.discard.empty())
  console.log('Player 1 wins')
else
  console.log('WTF happened?')
