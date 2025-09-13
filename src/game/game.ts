import { SuitNames, MinorArcana } from './cards.ts'
import Pile from './pile.ts'
import { FortuneWell } from './fortune_well.ts'
import { MinorWell } from './minor_well.ts'
import Wedge from './wedge.ts'

import shuffle from './shuffle.ts'

export default class Game {
  public fortuneWell = new FortuneWell()
  public piles = new Array<Pile>(11).
    fill(new Pile()). // placeholder
    map(_ => new Pile())
  public minorWells = new Map<string, MinorWell>(
    SuitNames.map(suit => [suit, new MinorWell(suit)]),
  )
  public wedge = new Wedge()

  constructor() {
    const deck = shuffle()

    let pile_idx = 0

    for (const card of deck) {
      if (card instanceof MinorArcana && card.rank == 1) {
        this.minorWells.get(card.suit)?.acceptCard(card)
        continue
      }

      this.piles[pile_idx].cards.push(card)
      pile_idx = (pile_idx + 1) % this.piles.length
      if (pile_idx == 5) pile_idx++
    }
  }

  sweep() {
    while (this.sweepOnce()) { }
  }

  private sweepOnce() {
    for (const pile of this.piles) {
      if (pile.cards.length == 0) continue

      const top_card = pile.cards[pile.cards.length - 1]

      if (this.fortuneWell.canAcceptCard(top_card)) {
        pile.popCard()
        this.fortuneWell.acceptCard(top_card)
        return true
      }

      if (this.wedge.canAcceptCard(top_card)) {
        for (const well of this.minorWells.values()) {
          if (well.canAcceptCard(top_card)) {
            pile.popCard()
            well.acceptCard(top_card)
            return true
          }
        }
      }
    }
    return false
  }
}