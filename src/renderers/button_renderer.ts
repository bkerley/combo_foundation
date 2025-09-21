import Game from '../game/game.ts'
import Pile from '../game/pile.ts'

export default class ButtonRenderer {
  constructor(private app_div: HTMLDivElement) {}

  private want_to_update = false

  public render_utility_bar() {
    const utility_bar = document.createElement('div')
    utility_bar.id = 'utility_bar'

    return utility_bar
  }

  public render(games: Game[]) {
    const game = games[0]
    this.want_to_update = false
    this.app_div.querySelectorAll('button').forEach(b => b.remove())

    const wedge_is_vacant = game.wedge.isVacant()

    if (! wedge_is_vacant) {
      const wedge_div = document.getElementById('wedge')
      const wedge_action_div = wedge_div?.querySelector('.wedge_actions')
      if (! (wedge_div && wedge_action_div)) {
        throw new Error('could not find #wedge .wedge_actions')
      }

      for (let i = 0; i < game.piles.length; i++) {
        const pile = game.piles[i]
        if (! pile.canAcceptCard(game.wedge.card!)) continue

        const wedge_to_pile_button = document.createElement('button')
        wedge_to_pile_button.textContent = `pile ${i}`
        wedge_to_pile_button.dataset.pileIdx = i.toString()
        wedge_to_pile_button.addEventListener('click', 
          this.moveFromWedgeToPile.bind(this, game))       
        wedge_action_div.appendChild(wedge_to_pile_button)
      }
    }

    for (let i = 0; i < game.piles.length; i++) {
      const pile = game.piles[i]

      if (pile.cards.length == 0) continue

      const pile_div = document.getElementById(`pile_${i}`)
      const pile_action_div = pile_div?.querySelector('.pile_actions')
      if (! pile_action_div) throw new Error(`could not find #pile_${i} .pile_actions`)
      if (! pile_div) throw new Error(`could not find #pile_${i}`)

      if (wedge_is_vacant) {
        const wedge_button = document.createElement('button')
        wedge_button.textContent = 'wedge'
        wedge_button.addEventListener('click', 
          this.moveFromPileToWedge.bind(this, pile, game))       
        pile_action_div.appendChild(wedge_button)
      }

      for (let j = 0; j < game.piles.length; j++) {
        if (i == j) continue
        const target_pile = game.piles[j]
        if (! target_pile.canAcceptCard(pile.peekCard())) continue

        const pile_to_pile_button = document.createElement('button')
        pile_to_pile_button.textContent = `pile ${j}`
        pile_to_pile_button.dataset.pileIdx = j.toString()
        pile_to_pile_button.addEventListener('click', 
          this.moveFromPileToPile.bind(this, pile, game))
        pile_action_div?.appendChild(pile_to_pile_button)
      }
    }

    const utility_bar = document.getElementById('utility_bar')
    if (! utility_bar) throw new Error('could not find #utility_bar')

    if (games.length > 1) {
      const undo_button = document.createElement('button')
      undo_button.textContent = 'undo'

      undo_button.addEventListener('click', () => {
        setTimeout(() => {
          this.app_div.dispatchEvent(game.game_undo_event)
        }, 0)
      })
      utility_bar.appendChild(undo_button)
    }
    utility_bar.appendChild(document.createTextNode(`${games.length} undos`))
  }

  private planToUpdate(game: Game) {
    if (this.want_to_update) return
    this.want_to_update = true
    setTimeout(() => {
      this.app_div.dispatchEvent(game.game_updated_event)
    }, 0)
  }

  private moveFromPileToWedge(pile: Pile, game: Game, _event: MouseEvent) {
    const card = pile.popCard()
    game.wedge.acceptCard(card)
    game.sweep()
    this.planToUpdate(game)
  }

  private moveFromWedgeToPile(game: Game, event: MouseEvent) {
    const target = event.target as HTMLElement
    const pile_idx = Number(target.dataset.pileIdx)
    const pile = game.piles[pile_idx]
    const card = game.wedge.popCard()
    pile.acceptCard(card)
    game.sweep()
    this.planToUpdate(game)
  }

  private moveFromPileToPile(source: Pile, game: Game, event: MouseEvent) {
    const target = event.target as HTMLElement
    const pile_idx = Number(target.dataset.pileIdx)
    const target_pile = game.piles[pile_idx]
    const card = source.popCard()
    target_pile.acceptCard(card)
    game.sweep()
    this.planToUpdate(game)
  }
}