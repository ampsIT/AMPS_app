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

import { SliderBox } from "react-native-image-slider-box";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import Collapsible from 'react-native-collapsible';
import { WebView } from 'react-native-webview';


export class ReadBookpdf extends Component{
    constructor(props){
        super(props)
        this.state = {
          
        }

        
    }

    componentDidMount(){
        console.log("pdf_url: ", this.props.route.params.pdf_url);
    }

  
    render(){
        return(
            <WebView source={{ uri: this.props.route.params.pdf_url }} />
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
})

export default ReadBookpdf