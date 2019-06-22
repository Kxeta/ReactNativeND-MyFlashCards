import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from "react-redux";

import { blue } from './src/util/colors';

import configureStore from'./src/store';


import {
  createAppContainer
} from "react-navigation";
import { TabNavigator, CustomStatusBar } from './src/components';


const AppContainer = createAppContainer(TabNavigator);
export default class App extends Component {
  render(){
    return (
      <Provider store={configureStore()}>
        <View style={{flex: 1}}>
          <CustomStatusBar backgroundColor={blue} barStyle="light-content"/>
          <AppContainer />
        </View>
      </Provider>
    );
  }
}
