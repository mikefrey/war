var Deck = module.exports = function(cards) {
  this.cards = cards || generateDefaultDeck(false)
}

var api = Deck.prototype

api.shuffle = function(count) {
  count = count || 3
  for (var i = 0; i < 3; i+=1)
    shuffle(this.cards)
}

api.draw = function(num) {
  return draw(this.cards, num)
}

api.cut = function() {
  cut(this.cards)
}

api.deal = function(numStacks, equalStacks) {
  return deal(this.cards, numStacks, equalStacks)
}

api.empty = function() {
  return !this.cards.length
}

api.count = function() {
  return this.cards.length
}



function generateDefaultDeck(jokers) {
  jokers = jokers !== false
  var cards = []
  var suits = ['H', 'D', 'C', 'S']
  for (var s = 0; s < suits.length; s+=1) {
    for (var i = 1; i < 14; i+=1) {
      cards.push({
        number: i,
        suit: suits[s]
      })
    }
  }
  if (jokers) {
    cards.push({ number: 'J'}, { number: 'J' })
  }
  return cards
}

function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i-=1) {
    var j = Math.round(Math.random() * i)
    var tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }
}

function draw(arr, num) {
  if (typeof num != 'number' || num < 1) num = 1
  num = Math.floor(num)

  if (num > 1) {
    return arr.splice(0, num)
  }

  return arr.shift()
}

function cut(arr) {
  var i = Math.floor(arr.length * Math.random())
  arr.splice.apply(arr, [0, 0].concat(arr.splice(i)))
}

function deal(arr, numStacks, equalStacks) {
  var stacks = []
  for (var s = 0; s < numStacks; s+=1) {
    stacks.push([])
  }

  for (i = 0; i < arr.length; i+=1) {
    if (equalStacks && i%numStacks == 0 && arr.length - i < numStacks) {
      stacks.push(arr.slice(i))
      break
    }
    stacks[i%numStacks].push(arr[i])
  }
  arr.length = 0

  return stacks
}
