// import { setupCounter } from './counter.ts'
import Game from './game/game.ts'
import MinorWell from './game/minor_well.ts'
import Pile from './game/pile.ts'

import { FortuneWellRenderer, WedgeRenderer, MinorWellRenderer, PileRenderer } from './renderers/well_renderers.ts'
import HoverRenderer from './renderers/hover_renderer.ts'
import ButtonRenderer from './renderers/button_renderer.ts'

const game = new Game()
game.sweep()

let app_div = document.querySelector<HTMLDivElement>('#app')!

let fortune_well_renderer = new FortuneWellRenderer(game.fortuneWell)
let wedge_renderer = new WedgeRenderer(game.wedge)
let minor_well_renderers = 
  Array.from(game.minorWells.values()).
  map((well: MinorWell) => new MinorWellRenderer(well))
let pile_renderers = game.piles.
  map((pile: Pile) => new PileRenderer(pile))

let hover_renderer = new HoverRenderer(app_div, game)

let button_renderer = new ButtonRenderer(app_div, game)

draw(game)

app_div.addEventListener(game.game_updated_event.type, () => {
  draw(game)
})

function draw(game: Game) {
  app_div.innerHTML = ''

  app_div.appendChild(fortune_well_renderer.render())

  app_div.appendChild(wedge_renderer.render())

  const minor_wells_div = document.createElement('div')
  minor_wells_div.id = 'minor_wells'
  app_div.appendChild(minor_wells_div)

  for (const renderer of minor_well_renderers) {
    minor_wells_div.appendChild(renderer.render())
  }

  const piles_div = document.createElement('ol')
  piles_div.id = 'piles'
  piles_div.start = 0
  app_div.appendChild(piles_div)

  for (let i = 0; i < pile_renderers.length; i++) {
    const renderer = pile_renderers[i]
    const pile_div = document.createElement('li')
    pile_div.className = 'pile'
    pile_div.id = `pile_${i}`
    piles_div.appendChild(pile_div)

    pile_div.appendChild(renderer.render())
  }

  hover_renderer.render()
  button_renderer.render()
}