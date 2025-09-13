// import { setupCounter } from './counter.ts'
import Game from './game/game.ts'

const app_div = document.querySelector<HTMLDivElement>('#app')!
app_div.innerHTML = ''

const game = new Game()
game.sweep()

const fortune_well_div = document.createElement('div')
fortune_well_div.id = 'fortune_well'
app_div.appendChild(fortune_well_div)

for (const card of game.fortuneWell.cards) {
  const card_div = document.createElement('div')
  card_div.className = 'card'
  card_div.textContent = card.name()
  fortune_well_div.appendChild(card_div)
}

const minor_wells_div = document.createElement('dl')
minor_wells_div.id = 'minor_wells'
app_div.appendChild(minor_wells_div)

for (const [suit, well] of game.minorWells) {
  const suit_dt = document.createElement('dt')
  suit_dt.textContent = suit
  minor_wells_div.appendChild(suit_dt)

  const well_dd = document.createElement('dd')
  well_dd.className = 'minor_well'
  minor_wells_div.appendChild(well_dd)
  const well_div = document.createElement('ol')
  well_div.className = 'minor_well'
  well_div.id = `minor_well_${suit}`
  for (const card of well.cards) {
    const card_div = document.createElement('div')
    card_div.className = 'card'
    card_div.textContent = card.name()
    well_div.appendChild(card_div)
  }
  well_dd.appendChild(well_div)
  minor_wells_div.appendChild(well_div)
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
