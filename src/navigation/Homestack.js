// @ts-nocheck
/* eslint-disable */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Home } from '../screens/Home';
import {NavigationDrawer} from './../../src/components/homecomponents/main/NavigationDrawer'
import {Department} from '../screens/Department'
import {VideoDetails} from '../screens/VideoDetails'
import {NewsDetails} from '../screens/NewsDetails'
import {PublicationDetails} from '../screens/PublicationDetails';
import {EventDetails} from './../screens/EventDetails';
import { CardStyleInterpolators } from '@react-navigation/stack';
import AppColors from './../lib/AppColors';

const Homenavigator = createStackNavigator();
const HomeScreen = () =>(
    <Homenavigator.Navigator
        screenOptions={{
            headerShown: false,
            // navigationOptions: {
            //     gestureDirection: "horizontal",
            //     cardStyleInterpolator: forHorizontalModal
            //   }
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
    
        >
            <Homenavigator.Screen name='homeScreen' component={Home}/>
            <Homenavigator.Screen name='DeptScreen' component={Department}/>
            <Homenavigator.Screen name='VideoScreen' component={VideoDetails}/>
            <Homenavigator.Screen name='NewsScreen' component={NewsDetails}/>
            <Homenavigator.Screen name='PublicationScreen' component={PublicationDetails}/>
            <Homenavigator.Screen name='EventScreen' component={EventDetails}/>

    </Homenavigator.Navigator>
)
const Drawer = createDrawerNavigator()
const DrawerNavigator = () => (
    <Drawer.Navigator 
    initialRouteName='Home' 
    screenOptions={{
        headerShown: false,
      }}
    drawerContent={(props) => (<NavigationDrawer
                            {...props}
                            
                        // navigation={this.props.navigation}
                        />)}
                        drawerContentOptions={{
                            activeTintColor: '#e91e63',
                            inactiveTintColor:AppColors.primary
                          }}   

    >
       <Drawer.Screen name="Home" component={HomeScreen} />

    </Drawer.Navigator>
)

export default function HomeStack() {
  return (
        <DrawerNavigator />
  );
}