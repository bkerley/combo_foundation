import { SuitNames, MinorArcana, Card } from './cards.ts'
import Pile from './pile.ts'
import FortuneWell from './fortune_well.ts'
import MinorWell from './minor_well.ts'
import Wedge from './wedge.ts'

import shuffle from './shuffle.ts'

export default class Game {
  public fortuneWell = new FortuneWell()
  public piles: Pile[] = []
  public minorWells = new Map<string, MinorWell>(
    SuitNames.map(suit => [suit, new MinorWell(suit)]),
  )
  public wedge = new Wedge()
  private cards_by_id = new Map<string, Card>()

  public game_updated_event = new Event('game_updated')

  constructor() {
    const deck = shuffle()

    let pile_idx = 0
    for (let i = 0; i < 11; i++) {
      this.piles[i] = new Pile(i)
    }

    for (const card of deck) {
      this.cards_by_id.set(card.id(), card)

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
    // add sweep combos here
    while (this.sweepOnce()) { 
      // keep sweeping 
    }
  }

  public findCardById(id: string): Card | undefined {
    return this.cards_by_id.get(id)
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

      if (this.wedge.isVacant()) {
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