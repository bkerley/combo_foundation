// import { setupCounter } from './counter.ts'
import shuffle from './game/shuffle.ts'

const app_div = document.querySelector<HTMLDivElement>('#app')!
app_div.innerHTML = ''

const deck = shuffle()

for (const card of deck) {
  const card_div = document.createElement('div')
  card_div.className = 'card'
  card_div.textContent = card.name()
  app_div.appendChild(card_div)
}
