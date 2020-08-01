// @ts-nocheck
/* eslint-disable */
import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { NavigationContainer } from '@react-navigation/native';

import { Home } from './screens/Home';
import { Loading } from './screens/Loading';

const Homenavigator = createStackNavigator({
    Home: {screen: Home}
}, {
    headerMode: 'none',
    initialRouteName: 'Home'
});

const Appnavigator = createSwitchNavigator({
    Loading,
    Homenavigator
  }, {
        headerMode: 'none',
        initialRouteName: 'Loading' 
});

const AppContainer = createAppContainer(Appnavigator);

export default class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <AppContainer navigator={this.props.navigator} />
            </NavigationContainer>
        );
      }
}