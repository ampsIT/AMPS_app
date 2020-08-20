// @ts-nocheck
/* eslint-disable */
import React,{ Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
ImageBackground, Image, Alert,TouchableOpacity,FlatList,SafeAreaView } from 'react-native' 
import HomeToolbar from './../components/homecomponents/toolbar/ToolBarHome';
import { CommonActions } from '@react-navigation/native';
import {VideoComponent} from '../components/VideoComponent'
import {
    widthPercentageToDP as wp2dp,
    heightPercentageToDP as hp2dp,
  } from 'react-native-responsive-screen';   
export class VideoDetails extends Component{
    constructor(props){
        super(props)
        
    }
   render(){
   return(
       <View style={styles.container}>
           <HomeToolbar 
            navigation={this.props.navigation}
            title={this.props.route.params.item.title}
            showDrawer={false}
            onIconPress={()=>{this.props.navigation.dispatch(CommonActions.goBack());
            }}
           />
           <Text>
           {this.props.route.params.item.title}
           </Text>
           <VideoComponent/>
           </View>
   )}
}
const styles = StyleSheet.create({
      container:{
          flex:1
},
backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})

export default VideoDetails