import { Card, MajorArcana, Majors } from "./cards.ts"

let min_major_rank = Majors.
  map(c => c.number).
  reduce((a, b) => Math.min(a, b), Majors[0].number)

let max_major_rank = Majors.
  map(c => c.number).
  reduce((a, b) => Math.max(a, b), Majors[0].number)

class FortuneWell {
  public cards: Set<MajorArcana> = new Set()
  private lowest_acceptable_number = min_major_rank
  private highest_acceptable_number = max_major_rank

  canAcceptCard(candidate: Card) {
    if (!(candidate instanceof MajorArcana)) {
      return false;
    }

    return (
      candidate.number >= this.lowest_acceptable_number ||
      candidate.number <= this.highest_acceptable_number
    )
  }

  acceptCard(card: MajorArcana) {
    if (!this.canAcceptCard(card)) {
      throw new Error(`cannot accept card ${card.name()}`);
    }
    
    this.cards.add(card)
    if (card.number == this.lowest_acceptable_number) {
      this.lowest_acceptable_number += 1
    }
    if (card.number == this.highest_acceptable_number) {
      this.highest_acceptable_number -= 1
    }
  }
  
  isComplete() {
    return this.cards.size == Majors.length
  }
}
