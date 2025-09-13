export class AbstractCardError extends Error {
  constructor() {
    super("can't deal with an abstract Card")
  }
}

export class Card {
  canStackOn(_other: Card): boolean {
    throw new AbstractCardError()
  }

  name() : string {
    throw new AbstractCardError()
  }
}

export class MajorArcana extends Card {
  constructor(public arcana_name: string, public number: number) {
    super()
  }

  canStackOn(other: Card): boolean {
    if (!(other instanceof MajorArcana)) {
      return false
    }

    if (this.number == other.number + 1) {
      return true
    }

    if (this.number == other.number - 1) {
      return true
    }

    return false
  }

  name() : string {
    return `${this.arcana_name} (#${this.number})`
  }
}


export const SuitNames: string[] = ['wands', 'cups', 'swords', 'pentacles']
const RankNames = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king']


export class MinorArcana extends Card {
  constructor(public suit: string, public rank: number) {
    super()
  }

  canStackOn(other: Card): boolean {
    if (!(other instanceof MinorArcana)) {
      return false
    }

    if (this.suit != other.suit) {
      return false
    }

    if (this.rank == other.rank + 1) {
      return true
    }

    if (this.rank == other.rank - 1) {
      return true
    }

    return false
  }

  name() : string {
    return `${RankNames[this.rank - 1]} of ${this.suit}`
  }
}

export const Majors = [
  new MajorArcana('fool', 0),
  new MajorArcana('magician', 1),
  new MajorArcana('priestess', 2),
  new MajorArcana('empress', 3),
  new MajorArcana('emperor', 4),
  new MajorArcana('hierophant', 5),
  new MajorArcana('lovers', 6),
  new MajorArcana('chariot', 7),
  new MajorArcana('strength', 8),
  new MajorArcana('hermit', 9),
  new MajorArcana('wheel-of-fortune', 10),
  new MajorArcana('justice', 11),
  new MajorArcana('chillen', 12),
  new MajorArcana('death', 13),
  new MajorArcana('temperance', 14),
  new MajorArcana('devil', 15),
  new MajorArcana('tower', 16),
  new MajorArcana('star', 17),
  new MajorArcana('moon', 18),
  new MajorArcana('sun', 19),
  new MajorArcana('judgement', 20),
  new MajorArcana('world', 21)
]

export const Minors: MinorArcana[] = []

for (const suit of SuitNames) {
  for (const rank of RankNames ) {
    Minors.push(new MinorArcana(suit, RankNames.indexOf(rank) + 1))
  }
}

export const Cards = [...Majors, ...Minors]
