// import { setupCounter } from './counter.ts'
import Game from './game/game.ts'



const game = new Game()
game.sweep()

draw(game)

function draw(game: Game) {
  const app_div = document.querySelector<HTMLDivElement>('#app')!
  app_div.innerHTML = ''

  const fortune_well_div = document.createElement('div')
  fortune_well_div.id = 'fortune_well'
  app_div.appendChild(fortune_well_div)

  for (const card of game.fortuneWell.cards) {
    const card_div = document.createElement('div')
    card_div.className = 'card'
    card_div.textContent = card.name()
    fortune_well_div.appendChild(card_div)
  }

  const wedge_div = document.createElement('div')
  wedge_div.id = 'wedge'
  app_div.appendChild(wedge_div)

  if (game.wedge.card) {
    const card_div = document.createElement('div')
    card_div.className = 'card'
    card_div.textContent = game.wedge.card.name()
    wedge_div.appendChild(card_div)
  } else {
    wedge_div.textContent = '(empty)'
    wedge_div.className = 'empty'
  }

  const minor_wells_div = document.createElement('div')
  minor_wells_div.id = 'minor_wells'
  app_div.appendChild(minor_wells_div)

  for (const [suit, well] of game.minorWells) {
    const suit_container = document.createElement('div')
    suit_container.className = 'minor_well_container'
    
    const suit_header = document.createElement('h3')
    suit_header.textContent = suit
    suit_header.className = 'suit_header'
    suit_container.appendChild(suit_header)

    const well_div = document.createElement('div')
    well_div.className = 'minor_well'
    well_div.id = `minor_well_${suit}`
    
    for (const card of well.cards) {
      const card_div = document.createElement('div')
      card_div.className = 'card'
      card_div.textContent = card.name()
      well_div.appendChild(card_div)
    }
    
    suit_container.appendChild(well_div)
    minor_wells_div.appendChild(suit_container)
  }

  const piles_div = document.createElement('ol')
  piles_div.id = 'piles'
  piles_div.start = 0
  app_div.appendChild(piles_div)

  for (const pile of game.piles) {
    const pile_div = document.createElement('li')
    pile_div.className = 'pile'
    piles_div.appendChild(pile_div)

    for (const card of pile.cards) {
      const card_div = document.createElement('div')
      card_div.className = 'card'
      card_div.textContent = card.name()
      pile_div.appendChild(card_div)
    }
  }
}