// @ts-nocheck
/* eslint-disable */
import React,{ Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
ImageBackground, Image, Alert,TouchableOpacity,FlatList,SafeAreaView } from 'react-native' 
import HomeToolbar from './../components/homecomponents/toolbar/ToolBarHome';
import { CommonActions } from '@react-navigation/native';

export class Department extends Component{
   constructor(props){
       super(props)
       this.route = this.props.route
    //    console.log("props",this.route.params.item)
   }
   
    render(){
   return(
    
       <View style={styles.container}>
           <HomeToolbar 
            navigation={this.props.navigation}
            title={this.route.params.item.name}
            showDrawer={false}
            onIconPress={()=>{this.props.navigation.dispatch(CommonActions.goBack());
            }}
           />
           <Text>
            {this.route.params.item.name}
           </Text>
       </View>
   )}
}
const styles = StyleSheet.create({
      container:{
}
})
export default Department 