// @ts-nocheck
/* eslint-disable */
import React,{ Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
ImageBackground, Image, Alert,TouchableOpacity,FlatList,SafeAreaView } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import HomeToolbar from './../components/homecomponents/toolbar/ToolBarHome';
import AcharyaDiaryMain from './../components/acharyadiarycomponents/main/AcharyaDiaryMain';

export class AcharyaDiary extends Component{
    render(){
        return(
            <View style={styles.container}>
                <HomeToolbar 
                    navigation={this.props.navigation}
                    title="Acharya Diary"
                    showDrawer={false}
                    onIconPress={()=>{this.props.navigation.dispatch(CommonActions.goBack());
                    }}
                /> 
                 <AcharyaDiaryMain 
                    navigation={this.props.navigation}
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

export default AcharyaDiary;