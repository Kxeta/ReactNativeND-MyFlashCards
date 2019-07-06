import React from 'react';
import {
  createStackNavigator
} from "react-navigation";

import { Decks, Deck, AddCard } from '../views';

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

  // QuizScreen: {
  //   screen: QuizScreen,
  //   navigationOptions: ({ navigation }) => ({
  //     title: "Quiz Time"
  //   })
  // },
  // Add card to deck:
  AddCard: {
    screen: AddCard,
  }
});