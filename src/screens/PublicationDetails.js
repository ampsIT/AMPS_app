// @ts-nocheck
/* eslint-disable */
import React,{ Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
ImageBackground, Image, Alert,TouchableOpacity,FlatList,SafeAreaView } from 'react-native' 
import HomeToolbar from './../components/homecomponents/toolbar/ToolBarHome';
import PublicationMain from './../components/publicationcomponents/PublicationMain';
import { CommonActions } from '@react-navigation/native';

import {
    widthPercentageToDP as wp2dp,
    heightPercentageToDP as hp2dp,
  } from 'react-native-responsive-screen';  

export class PublicationDetails extends Component{
    constructor(props){
        super(props)
        
    }
   render(){
   return(
       <SafeAreaView style={styles.container}>
           <HomeToolbar 
            navigation={this.props.navigation}
            title={this.props.route.params.item.title}
            showDrawer={false}
            onIconPress={()=>{this.props.navigation.dispatch(CommonActions.goBack());
            }}
           />
            <PublicationMain 
              navigation={this.props.navigation}
              item={this.props.route.params.item}
            />
           </SafeAreaView>
   )}
}
const styles = StyleSheet.create({
      container:{
          flex:1
      },
      detailsContainer:{
        paddingTop:hp2dp('2%'),
        paddingLeft:wp2dp('4%')
      },
      headingContainer:{

      },
      titleText:{
        fontSize: 20,
      },
      content:{
        fontSize: 16,
      }


})

export default PublicationDetails