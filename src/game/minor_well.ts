import { Card, MinorArcana } from "./cards.ts"

export default class MinorWell {
  constructor(public suit: string) {}

  public cards: Set<MinorArcana> = new Set()
  private lowest_acceptable_rank = 1

  canAcceptCard(card: Card) {
    if (!(card instanceof MinorArcana)) return false

    if (card.suit != this.suit) return false

    if (card.rank == 1) return true

    return card.rank == this.lowest_acceptable_rank
  }

  assertAcceptsCard(card: Card): asserts card is MinorArcana {
    if (!this.canAcceptCard(card)) {
      throw new Error(`cannot accept card ${card.name()}`)
    }
  }

  acceptCard(card: Card) {
    this.assertAcceptsCard(card)

    this.cards.add(card)
    this.lowest_acceptable_rank += 1
  }

  isComplete() {
    return this.cards.size == 14
  }
}
