import { Card } from "../game/cards.ts"
import FortuneWell from "../game/fortune_well.ts"
import MinorWell from "../game/minor_well.ts"
import Wedge from "../game/wedge.ts"
import Pile from "../game/pile.ts"

export class AbstractWellRendererError extends Error {
  constructor() {
    super("abstract method called on WellRenderer")
  }

  render(): HTMLElement {
    throw new AbstractWellRendererError()
  }
}

class WellRenderer {
  renderCard(card: Card) {
    const card_div = document.createElement('div')
    card_div.className = 'card ' + card.cssClass()
    card_div.id = card.id()
    card_div.dataset.neighbors = card.neighbor_ids().join(' ')
    const spotlight_div = document.createElement('div')
    spotlight_div.className = 'spotlight'
    spotlight_div.textContent = card.symbol()

    card_div.appendChild(spotlight_div)
    card_div.append(card.name())
    return card_div
  }
}

export class FortuneWellRenderer extends WellRenderer {
  render(fortuneWell: FortuneWell) {
    const fortune_well_div = document.createElement('div')
    fortune_well_div.id = 'fortune_well'

    for (const card of fortuneWell.cards) {
      const card_div = this.renderCard(card)
      fortune_well_div.appendChild(card_div)
    }

    return fortune_well_div
  }
}

export class WedgeRenderer extends WellRenderer {
  render(wedge: Wedge) {
    const wedge_div = document.createElement('div')
    wedge_div.id = 'wedge'

    if (wedge.card) {
      const card_div = this.renderCard(wedge.card)
      wedge_div.appendChild(card_div)
    } else {
      wedge_div.textContent = '(empty)'
      wedge_div.className = 'empty'
    }

    const wedge_actions_div = document.createElement('div')
    wedge_actions_div.className = 'wedge_actions'
    wedge_div.appendChild(wedge_actions_div)

    return wedge_div
  }
}

export class MinorWellRenderer extends WellRenderer {
  render(minorWell: MinorWell) {
    const suit_container = document.createElement('div')
    suit_container.className = 'minor_well_container'
    
    const suit_header = document.createElement('h3')
    suit_header.textContent = minorWell.suit
    suit_header.className = 'suit_header'
    suit_container.appendChild(suit_header)

    const well_div = document.createElement('div')
    well_div.className = 'minor_well'
    well_div.id = `minor_well_${minorWell.suit}`

    for (const card of minorWell.cards) {
      const card_div = this.renderCard(card)
      well_div.appendChild(card_div)
    }
    
    suit_container.appendChild(well_div)
    return suit_container
  }
}

export class PileRenderer extends WellRenderer {
  render(pile: Pile) {
    const pile_div = document.createElement('div')
    pile_div.className = 'pile'
    pile_div.id = `pile_${pile.idx}`
    pile_div.dataset.pile_idx = pile.idx.toString()

    for (const card of pile.cards) {
      const card_div = this.renderCard(card)
      pile_div.appendChild(card_div)
    }

    const action_div = document.createElement('div')
    action_div.className = 'pile_actions'
    pile_div.appendChild(action_div)

    return pile_div
  }
}
