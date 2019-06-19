import { AsyncStorage } from "react-native";

export const STORAGE_KEY = "MyFlashCardsStorage";

export const getDecks = () => {
  return AsyncStorage.getItem(STORAGE_KEY).then(results => {
    return JSON.parse(results);
  });
};

export const saveDeck = deck => {
  return AsyncStorage.mergeItem(
    STORAGE_KEY,
    JSON.stringify({ [deck.id]: deck })
  );
};

export const saveCard = (deckId, card) => {
  return AsyncStorage.getItem(STORAGE_KEY).then(results => {
    const decks = JSON.parse(results);
    decks[deckId] = {
      ...decks[deckId],
      cards: [
        ...decks[deckId].cards,
        { question: card.question, answer: card.answer }
      ]
    };
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
  });
};