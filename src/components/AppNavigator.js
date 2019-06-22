import React from 'react';
import {
  createStackNavigator
} from "react-navigation";

import { Decks } from '../views';

export default AppNavigator = createStackNavigator({
  Home: {
    screen: Decks,
    navigationOptions: {
      header: () => null
    }
  },
  // //Mostra os detalhes de 1 deck:
  // DeckDetails: {
  //   screen: DeckScreen,
  //   navigationOptions: ({ navigation }) => ({
  //     title: "Details of deck"
  //   })
  // },

  // QuizScreen: {
  //   screen: QuizScreen,
  //   navigationOptions: ({ navigation }) => ({
  //     title: "Quiz Screen"
  //   })
  // },
  // // Add card to deck:
  // AddCard: {
  //   screen: AddCard,
  //   navigationOptions: ({ navigation }) => ({
  //     title: "Add Card"
  //   })
  // }
});