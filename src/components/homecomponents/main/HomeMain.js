// @ts-nocheck
/* eslint-disable */
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
    ImageBackground, Image, Alert,TouchableOpacity  } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import AppColors from './../../../lib/AppColors';
import Tabsection1 from './Tabsection1'
import Tabsection2 from './Tabsection2'
import Tabsection3 from './Tabsection3'

export class HomeMain extends Component {
    constructor(props){
        super(props)

        this.state = {}
        
    }

    render() {
        const Tab = createBottomTabNavigator();

        return (
                <View style={styles.container}>
                    {/* <Text style={styles.txtContainer}>
                        This is Home Page...
                    </Text> */}

                    <Tab.Navigator
                    initialRouteName="Section1"
                    >
                    <Tab.Screen
                        name="Section1"
                        component={Tabsection1}
                        options={{
                        tabBarLabel: 'Section1',
                        tabBarIcon: () => (
                            <Icon name="home" color={'grey'} size={30} />
                        ),
                        }}
                    />
                    <Tab.Screen
                        name="Section2"
                        component={Tabsection2}
                        options={{
                        tabBarLabel: 'Section2',
                        tabBarIcon: () => (
                            <Icon name="address-book" color={'grey'} size={30} />
                        ),
                        }}
                    />
                    <Tab.Screen
                        name="Section3"
                        component={Tabsection3}
                        options={{
                        tabBarLabel: 'Section3',
                        tabBarIcon: () => (
                            <Icon name="comments" color={'grey'} size={30} />
                        ),
                        }}
                    />
                        
                    </Tab.Navigator>
                    
                </View>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.white,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    txtContainer: {
        color: AppColors.primary,
        fontSize: 20,
        alignSelf: "center",
        justifyContent: "center"
    },
});

export default HomeMain;