import React from 'react';
import { Platform } from 'react-native';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import { Entypo } from "@expo/vector-icons";

import AppNavigator from './AppNavigator';
import { AddDeck } from '../views';

import { white, blue } from '../util/colors';

const HomeTabRouteConfig = {
  Home: {
    screen: AppNavigator,
    navigationOptions: {
      tabBarLabel: "My Decks",
      tabBarIcon: ({ tintColor }) => (
        <Entypo name="list" size={30} color={tintColor} />
      )
    }
  },

  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: "Create Deck",
      tabBarIcon: ({ tintColor }) => (
        <Entypo name="add-to-list" size={30} color={tintColor} />
      )
    }
  }
};

const HomeTabNavigationConfig = {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? blue : white,
      style: {
        height: 60,
        backgroundColor: Platform.OS === "ios" ? white : blue,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      },
      labelStyle: {
        paddingTop: 3,
        fontSize: 14,
        fontWeight: "bold"
      }
    }
  };

export default Tabs = Platform.OS === "ios"
? createBottomTabNavigator(HomeTabRouteConfig, HomeTabNavigationConfig)
: createMaterialTopTabNavigator(HomeTabRouteConfig, HomeTabNavigationConfig);