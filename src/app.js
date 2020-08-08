// @ts-nocheck
/* eslint-disable */
import React, { Component } from 'react';
import 'react-native-gesture-handler';
// import { createSwitchNavigator, createAppContainer} from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import { Home } from './screens/Home';
import { Loading } from './screens/Loading';
import {Login} from './screens/Login'
import {Register} from './screens/Register'


// const Authnavigator = createStackNavigator({
//     Login:{screen: Login},
//     Register:{screen: Register},
// }, {
//     headerMode: 'none',
//     initialRouteName: 'Login'
// });

// const Homenavigator = createStackNavigator({
//     Home: {screen: Home},
// }, {
//     headerMode: 'none',
//     initialRouteName: 'Home'
// });

// const Appnavigator = createSwitchNavigator({
//     Loading,
//     Authnavigator,
//     Homenavigator
//   }, {
//         headerMode: 'none',
//         initialRouteName: 'Loading' 
// });

// const AppContainer = createAppContainer(Appnavigator);

// export default class App extends Component {
//     render() {
//         return (
//             <NavigationContainer>
//                 <AppContainer navigator={this.props.navigator} />
//             </NavigationContainer>
//         );
//       }
// }



const Homenavigator = createStackNavigator();
const HomeScreen = () =>(
    <Homenavigator.Navigator
        screenOptions={{
            headerShown: false
        }}
        >
            <Homenavigator.Screen name='homeScreen' component={Home}/>
    </Homenavigator.Navigator>
)
const Authnavigator = createStackNavigator();
const Auth = () =>(
    <Authnavigator.Navigator
    screenOptions={{
        headerShown: false
    }}
    >
        <Authnavigator.Screen name='loading' component={Loading}/>
        <Authnavigator.Screen name='Login' component={Login}/>
        <Authnavigator.Screen name='Register' component={Register}/>
    </Authnavigator.Navigator>
)

const Drawer = createDrawerNavigator()
const DrawerNavigator = () => (
    <Drawer.Navigator initialRouteName='Home' screenOptions={{
        headerShown: false
      }}>
       <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
)

const Appnavigator = createStackNavigator();
const AppContainer = () =>(
<Appnavigator.Navigator
screenOptions={{
    headerShown: false
}}
    >
        <Appnavigator.Screen name='Auth' component={Auth}/>
        {/* <Appnavigator.Screen name='Drawer' component={HomeScreen}/> */}
        <Appnavigator.Screen name ='Drawer' component={DrawerNavigator}/>

</Appnavigator.Navigator>
)

export default class App extends Component {
    render() {
        return (
            <NavigationContainer>
            <AppContainer/>
            </NavigationContainer>
        );
      }
}