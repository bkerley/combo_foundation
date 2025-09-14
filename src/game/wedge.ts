import { Card } from './cards.ts'

export default class Wedge {
  public card: Card | null = null

  isVacant(): boolean {
    return this.card === null
  }

  canAcceptCard(_card: Card): boolean {
    return this.card === null
  }

  acceptCard(card: Card) {
    if (!this.canAcceptCard(card)) {
      throw new Error(`cannot accept card ${card.name()}`)
    }

    this.card = card
  }

  popCard(): Card {
    if (this.card === null) {
      throw new Error("cannot pop from empty wedge")
    }

    const found = this.card
    this.card = null
    return found
  }
}
