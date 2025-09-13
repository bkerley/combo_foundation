import Game from '../game/game.ts'

export default class HoverRenderer {
  constructor(private app_div: HTMLDivElement,
    private game: Game
  ) {}

  public render() {
    this.app_div.addEventListener('mouseover', 
        this.card_moused_over.bind(this),
      { passive: true })
  }

  private hovered_card: HTMLElement | null = null
  private neighbors: HTMLElement[] = []

  private card_moused_over(event: MouseEvent) {
    const target = event.target as HTMLElement
    if (! target.classList.contains('card')) return

    this.un_hover()

    this.hovered_card = target
    this.hovered_card.classList.add('hovered')

    const neighbor_ids = target.dataset.neighbors?.split(' ') || []
    this.neighbors = neighbor_ids.map(id => 
      document.getElementById(id) as HTMLElement).filter(e => e != null)
    this.neighbors.forEach(neighbor => neighbor.classList.add('neighbor_hover'))

    this.app_div.addEventListener('mouseout', this.un_hover.bind(this), { once: true, passive: true })
  }

  private un_hover() {
    if (! this.hovered_card) return

    this.hovered_card.classList.remove('hovered')
    this.neighbors.forEach(neighbor => neighbor.classList.remove('neighbor_hover'))
    this.hovered_card = null
    this.neighbors = []
  }
}