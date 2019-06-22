import { AsyncStorage } from "react-native";

export const STORAGE_KEY = "MyFlashCardsStorage";

export const getDecks = () => {
  return AsyncStorage.getItem(STORAGE_KEY).then(results => {
    return JSON.parse(results) || [];
  });
};

export const saveDeck = deck => {
  return AsyncStorage.mergeItem(
    STORAGE_KEY,
    JSON.stringify({ [deck.id]: deck })
  );
};

export const updateDeck = deck => {
  return AsyncStorage.mergeItem(
    STORAGE_KEY,
    JSON.stringify({ [deck.id]: deck })
  );
};

export const saveCard = (deckId, card) => {
  return AsyncStorage.getItem(STORAGE_KEY).then(results => {
    const decks = JSON.parse(results);
    decks = decks.map(deck => {
      if(deck.id === deckId){
        return {
          ...deck,
          cards: [
            ...deck.cards,
            { id: card.id, question: card.question, answer: card.answer }

          ]
        }
      }
    })
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
  })
};

export const updateCard = (deckId, card) => {
  return AsyncStorage.getItem(STORAGE_KEY).then(results => {
    const decks = JSON.parse(results);
    decks = decks.map(deck => {
      if(deck.id === deckId){
        return {
          ...deck,
          cards: deck.cards.map(c => {
            if(c.id === card.id){
              return {
                id: c.id,
                question: card.question,
                answer: card.answer
              }
            }
            return c;
          })
        }
      }
    })
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
  })
};