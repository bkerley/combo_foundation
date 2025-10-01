import Game from '../game/game.ts'

export default class HoverRenderer {
  constructor(private app_div: HTMLDivElement) {}

  public render(game: Game) {
    this.app_div.addEventListener('mouseover', 
        this.card_moused_over.bind(this, game),
      { passive: true })
  }

  private hovered_card: HTMLElement | null = null
  private neighbors: HTMLElement[] = []
  private move_candidates: HTMLElement[] = []

  private card_moused_over(game: Game, event: MouseEvent) {
    let target = event.target as HTMLElement
    if (target.parentElement?.classList.contains('card')) {
      target = target.parentElement
    }
    if (!target.classList.contains('card')) return

    this.un_hover()

    this.hovered_card = target
    this.hovered_card.classList.add('hovered')

    this.highlightNeighbors(target)
    this.highlightMoveCandidates(target, game)

    this.app_div.addEventListener('mouseout', this.un_hover.bind(this), { once: true, passive: true })
  }


  private un_hover() {
    if (! this.hovered_card) return

    this.hovered_card.classList.remove('hovered')
    this.unhighlightNeighbors()
    this.unhighlightMoveCandidates()
    this.hovered_card = null
  }

  private highlightNeighbors(target: HTMLElement) {
    const neighbor_ids = target.dataset.neighbors?.split(' ') || []
    this.neighbors = neighbor_ids.map(id => document.getElementById(id) as HTMLElement).filter(e => e != null)
    this.neighbors.forEach(neighbor => neighbor.classList.add('neighbor_hover'))
  }
  private unhighlightNeighbors() {
    this.neighbors.forEach(neighbor => neighbor.classList.remove('neighbor_hover'))
    this.neighbors = []
  }

  private highlightMoveCandidates(target: HTMLElement, game: Game) {
    const card = game.findCardById(target.id)
    if (! card) return

    for (let i = 0; i < game.piles.length; i++) {
      const pile = game.piles[i]
      if (pile.canAcceptCard(card)) {
        const pile_div = document.getElementById(`pile_${i}`)
        if (pile_div) {
          pile_div.classList.add('move_candidate')
          this.move_candidates.push(pile_div)
        }
      }
    }

    if (game.fortuneWell.canAcceptCard(card)) {
      const fortune_well_div = document.getElementById('fortune_well')
      if (fortune_well_div) {
        fortune_well_div.classList.add('move_candidate')
        this.move_candidates.push(fortune_well_div)
      }
    }

    if (game.wedge.canAcceptCard(card)) {
      const wedge_div = document.getElementById('wedge')
      if (wedge_div) {
        wedge_div.classList.add('move_candidate')
        this.move_candidates.push(wedge_div)
      }
    }

    for (const well of game.minorWells.values()) {
      if (well.canAcceptCard(card)) {
        const well_div = document.getElementById(`minor_well_${well.suit}`)
        if (well_div) {
          well_div.classList.add('move_candidate')
          this.move_candidates.push(well_div)
        }
      }
    }
  }
  private unhighlightMoveCandidates() {
    this.move_candidates.forEach(div => div.classList.remove('move_candidate'))
    this.move_candidates = []
  }
}