// import { setupCounter } from './counter.ts'
import Game from './game/game.ts'

import { FortuneWellRenderer, WedgeRenderer, MinorWellRenderer, PileRenderer } from './renderers/well_renderers.ts'
import HoverRenderer from './renderers/hover_renderer.ts'
import ButtonRenderer from './renderers/button_renderer.ts'

const games = [new Game()]
games[0].sweep()

const app_div = document.querySelector<HTMLDivElement>('#app')!

const fortune_well_renderer = new FortuneWellRenderer()
const wedge_renderer = new WedgeRenderer()
const minor_well_renderer = new MinorWellRenderer()
const pile_renderer = new PileRenderer()

const hover_renderer = new HoverRenderer(app_div)

const button_renderer = new ButtonRenderer(app_div)

draw(games[0])

let current_game_is_clone = false

app_div.addEventListener(games[0].game_updated_event.type, () => {
  current_game_is_clone = true
  games.unshift(games[0].shallowClone())
  draw(games[0])
})

app_div.addEventListener(games[0].game_undo_event.type, () => {
  if (1 == games.length) {
    throw new Error('no more games to undo to')
  }
  if (current_game_is_clone) {const _scratch_game = games.shift()}
  const _undid_game = games.shift()
  current_game_is_clone = false

  draw(games[0])
})

function draw(_game: Game) {
  app_div.innerHTML = ''

  app_div.appendChild(button_renderer.render_utility_bar())

  app_div.appendChild(fortune_well_renderer.render(games[0].fortuneWell))

  app_div.appendChild(wedge_renderer.render(games[0].wedge))

  const minor_wells_div = document.createElement('div')
  minor_wells_div.id = 'minor_wells'
  app_div.appendChild(minor_wells_div)

  for (const well of games[0].minorWells.values()) {
    minor_wells_div.appendChild(minor_well_renderer.render(well))
  }

  const piles_div = document.createElement('ol')
  piles_div.id = 'piles'
  piles_div.start = 0
  app_div.appendChild(piles_div)

  for (let i = 0; i < games[0].piles.length; i++) {
    const pile = games[0].piles[i]
    const pile_div = document.createElement('li')
    pile_div.className = 'pile'
    pile_div.id = `pile_${i}`
    piles_div.appendChild(pile_div)

    pile_div.appendChild(pile_renderer.render(pile))
  }

  hover_renderer.render(games[0])
  button_renderer.render(games)
}