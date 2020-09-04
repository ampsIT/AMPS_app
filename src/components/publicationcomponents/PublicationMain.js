// @ts-nocheck
/* eslint-disable */
import React,{ Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
ImageBackground, Image, Alert,TouchableOpacity,FlatList,SafeAreaView } from 'react-native' 

import { CommonActions } from '@react-navigation/native';

import {
    widthPercentageToDP as wp2dp,
    heightPercentageToDP as hp2dp,
  } from 'react-native-responsive-screen';   

  import AppColors from './../../lib/AppColors';
  import backend from './../../backend/Backend';

export class PublicationMain extends Component{
    constructor(props){
        super(props)
        
    }
    render(){
        return(
            <SafeAreaView style={styles.container}>
                
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1
    }
})

export default PublicationMain