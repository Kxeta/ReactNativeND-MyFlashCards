import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from "react-redux";

import { blue } from './src/util/colors';

import configureStore from'./src/store';


import {
  createAppContainer
} from "react-navigation";
import { TabNavigator, CustomStatusBar } from './src/components';
import { setLocalNotification } from './src/util/helpers';


const AppContainer = createAppContainer(TabNavigator);
export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }
  render(){
    return (
      <Provider store={configureStore()}>
        <View style={{flex: 1, alignContent: "center"}}>
          <CustomStatusBar backgroundColor={blue} barStyle="light-content"/>
          <AppContainer />
        </View>
      </Provider>
    );
  }
}
