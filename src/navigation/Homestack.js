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
    </Homenavigator.Navigator>
)
const detialNavigator = createStackNavigator();
const DetailScreen = () =>(
    <detialNavigator.Navigator
        screenOptions={{
            headerShown: false,
            // navigationOptions: {
            //     gestureDirection: "horizontal",
            //     cardStyleInterpolator: forHorizontalModal
            //   }
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
    
        >
            <detialNavigator.Screen name='DeptScreen' component={Department}/>
            <detialNavigator.Screen name='VideoScreen' component={VideoDetails}/>
            <detialNavigator.Screen name='NewsScreen' component={NewsDetails}/>
            <detialNavigator.Screen name='PublicationScreen' component={PublicationDetails}/>
            <detialNavigator.Screen name='EventScreen' component={EventDetails}/>

    </detialNavigator.Navigator>
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
       {/* <DetailScreen /> */}
    </Drawer.Navigator>
)

const HNavigator = createStackNavigator();
const HNav = () =>(
    < HNavigator.Navigator
    screenOptions={{
        headerShown: false,
      }}
        >
            < HNavigator.Screen name="draw" component={ DrawerNavigator} />
            < HNavigator.Screen name='DeptScreen' component={Department}/>
            < HNavigator.Screen name='VideoScreen' component={VideoDetails}/>
            < HNavigator.Screen name='NewsScreen' component={NewsDetails}/>
            < HNavigator.Screen name='PublicationScreen' component={PublicationDetails}/>
            < HNavigator.Screen name='EventScreen' component={EventDetails}/>

    </ HNavigator.Navigator>
)

export default function HomeStack() {
  return (
      
    //   <DrawerNavigator />
      <HNav/>
        
  );
}