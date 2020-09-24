// @ts-nocheck
/* eslint-disable */
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
    ImageBackground, Image, Alert,TouchableOpacity  } from 'react-native';
import AppColors from '../../../lib/AppColors';


    export default class TabSection2 extends Component {
        constructor(props){
            super(props)
    
            this.state = {}
            
        }
    
        render() {
            return (
                    <View style={{ flex: 1, justifyContent: 'center'}}>
                        <Text style={{ alignSelf: "center", fontSize: 16, 
                                color: AppColors.greymid}}>
                            Coming Soon....
                        </Text>
                    </View>
            )
        }    
    }    