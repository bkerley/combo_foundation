import { Card, MinorArcana } from "./cards.ts"

export class MinorWell {
  constructor(public suit: string) {}

  public cards: Set<MinorArcana> = new Set()
  private lowest_acceptable_rank = 1

  canAcceptCard(card: Card) {
    if (!(card instanceof MinorArcana)) return false

    if (card.suit != this.suit) return false

    return card.rank == this.lowest_acceptable_rank
  }

  acceptCard(card: MinorArcana) {
    if (!this.canAcceptCard(card)) {
      throw new Error(`cannot accept card ${card.name()}`)
    }

    this.cards.add(card)
    this.lowest_acceptable_rank += 1
  }

  isComplete() {
    return this.cards.size == 14
  }
}
