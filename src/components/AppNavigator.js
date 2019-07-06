import React from 'react';
import {
  createStackNavigator
} from "react-navigation";

import { Decks, Deck, AddCard, Quiz } from '../views';

export default AppNavigator = createStackNavigator({
  Home: {
    screen: Decks,
    navigationOptions: {
      header: () => null
    }
  },
  //Shows the Deck details:
  Deck: {
    screen: Deck,
  },

  Quiz: {
    screen: Quiz
  },
  // Add card to deck:
  AddCard: {
    screen: AddCard,
  }
});