import { Cards } from './cards.ts'

export default function shuffle() {
  let deck = Cards.slice()
  let move = new Uint8Array(1)
  for (let i = deck.length - 1; i > 0; i--) {
    do {
      window.crypto.getRandomValues(move)
    } while (move[0] >= deck.length);
    let j = move[0];
    [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap elements
  }

  if (deck.length != Cards.length) {
    throw new Error("internal shuffle error: deck size changed");
  }

  return deck;
}
