import { Card } from './cards.ts'

export default class Pile {
  public cards: Card[] = []

  constructor(public idx: number) {}

  canAcceptCard(card: Card | null): boolean {
    if (!card) return false
    if (this.cards.length == 0) return true

    const top_card = this.cards[this.cards.length - 1]
    return card.canStackOn(top_card)
  }

  acceptCard(card: Card) {
    if (!this.canAcceptCard(card)) {
      throw new Error(`cannot accept card ${card.name()}`)
    }

    this.cards.push(card)
  }

  peekCard(): Card | null {
    if (this.cards.length == 0) return null

    return this.cards[this.cards.length - 1]
  }

  popCard(): Card {
    const found = this.cards.pop()

    if (!found) throw new Error("cannot pop from empty pile")

    return found
  }
}