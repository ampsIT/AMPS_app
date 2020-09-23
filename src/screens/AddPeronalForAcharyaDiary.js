// @ts-nocheck
/* eslint-disable */
import React,{ Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
ImageBackground, Image, Alert,TouchableOpacity,FlatList,SafeAreaView } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import HomeToolbar from './../components/homecomponents/toolbar/ToolBarHome';
import AddAcharyaPersonal from './../components/addpersonalforacharyacomponents/main/AddAcharyaPersonalmain';

export class AddPersonalForAcharyaDiary extends Component{
    render(){
        return(
            <View style={styles.container}>
                <HomeToolbar 
                    navigation={this.props.navigation}
                    title="Acharya Personal Info"
                    showDrawer={false}
                    onIconPress={()=>{this.props.navigation.dispatch(CommonActions.goBack());
                    }}
                /> 
                 <AddAcharyaPersonal 
                    navigation={this.props.navigation}
                    items = {this.props.route.params.item}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1
    }
})

export default AddPersonalForAcharyaDiary;