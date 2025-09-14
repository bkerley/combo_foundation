import Game from '../game/game.ts'
import Pile from '../game/pile.ts'

export default class ButtonRenderer {
  constructor(private app_div: HTMLDivElement,
    private game: Game
  ) {}

  private want_to_update = false

  public render() {
    this.want_to_update = false
    this.app_div.querySelectorAll('button').forEach(b => b.remove())

    const wedge_is_vacant = this.game.wedge.isVacant()

    if (! wedge_is_vacant) {
      const wedge_div = document.getElementById('wedge')
      const wedge_action_div = wedge_div?.querySelector('.wedge_actions')
      if (! (wedge_div && wedge_action_div)) {
        throw new Error('could not find #wedge .wedge_actions')
      }
      
      for (let i = 0; i < this.game.piles.length; i++) {
        const pile = this.game.piles[i]
        if (! pile.canAcceptCard(this.game.wedge.card!)) continue

        const wedge_to_pile_button = document.createElement('button')
        wedge_to_pile_button.textContent = `pile ${i}`
        wedge_to_pile_button.dataset.pileIdx = i.toString()
        wedge_to_pile_button.addEventListener('click', 
          this.moveFromWedgeToPile.bind(this))       
        wedge_action_div.appendChild(wedge_to_pile_button)
      }
    }

    for (let i = 0; i < this.game.piles.length; i++) {
      const pile = this.game.piles[i]

      if (pile.cards.length == 0) continue

      const pile_div = document.getElementById(`pile_${i}`)
      const pile_action_div = pile_div?.querySelector('.pile_actions')
      if (! pile_action_div) throw new Error(`could not find #pile_${i} .pile_actions`)
      if (! pile_div) throw new Error(`could not find #pile_${i}`)

      if (wedge_is_vacant) {
        const wedge_button = document.createElement('button')
        wedge_button.textContent = 'wedge'
        wedge_button.addEventListener('click', 
          this.moveFromPileToWedge.bind(this, pile))       
        pile_action_div.appendChild(wedge_button)
      }

      for (let j = 0; j < this.game.piles.length; j++) {
        if (i == j) continue
        const target_pile = this.game.piles[j]
        if (! target_pile.canAcceptCard(pile.peekCard())) continue

        const pile_to_pile_button = document.createElement('button')
        pile_to_pile_button.textContent = `pile ${j}`
        pile_to_pile_button.dataset.pileIdx = j.toString()
        pile_to_pile_button.addEventListener('click', 
          this.moveFromPileToPile.bind(this, pile))
        pile_action_div?.appendChild(pile_to_pile_button)
      }
    }
  }

  private planToUpdate() {
    if (this.want_to_update) return
    this.want_to_update = true
    setTimeout(() => {
      this.app_div.dispatchEvent(this.game.game_updated_event)
    }, 0)
  }

  private moveFromPileToWedge(pile: Pile, _event: MouseEvent) {
    const card = pile.popCard()
    this.game.wedge.acceptCard(card)
    this.game.sweep()
    this.planToUpdate()
  }

  private moveFromWedgeToPile(event: MouseEvent) {
    const target = event.target as HTMLElement
    const pile_idx = Number(target.dataset.pileIdx)
    const pile = this.game.piles[pile_idx]
    const card = this.game.wedge.popCard()
    pile.acceptCard(card)
    this.game.sweep()
    this.planToUpdate()
  }

  private moveFromPileToPile(source: Pile, event: MouseEvent) {
    const target = event.target as HTMLElement
    const pile_idx = Number(target.dataset.pileIdx)
    const target_pile = this.game.piles[pile_idx]
    const card = source.popCard()
    target_pile.acceptCard(card)
    this.game.sweep()
    this.planToUpdate()
  }
}