
import React from 'react'
import { StatusBar, View } from 'react-native'
import Constants from 'expo-constants'

const CustomStatusBar = (props) => {
    const { backgroundColor } = props;
    return (
      <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
        <StatusBar backgroundColor={backgroundColor} {...props} />
      </View>
    )
}

export default CustomStatusBar