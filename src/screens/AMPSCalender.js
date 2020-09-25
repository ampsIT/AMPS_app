// @ts-nocheck
/* eslint-disable */
import React,{ Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
ImageBackground, Image, Alert,TouchableOpacity,FlatList,SafeAreaView } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

import HomeToolbar from './../components/homecomponents/toolbar/ToolBarHome';
import FastImage from 'react-native-fast-image';
import AppColors from '../lib/AppColors';
// import AcharyaDiaryMain from './../components/acharyadiarycomponents/main/AcharyaDiaryMain';

export class AMPSCalender extends Component{
    constructor(props){
        super(props)

        this.state = {
            calender_url: ''
        }
        // this.navigate = this.props.navigation.navigate;

    }

    componentDidMount(){
        this.fetchCalenderUrl();
    }

    fetchCalenderUrl(){
        let self = this;
        database().ref("calender_details").child("year_2020").child("details")
        .once("value", function(snapshot){
            if(snapshot.exists()){
                if(snapshot.val().cal_img_url){
                    self.setState({
                        calender_url: snapshot.val().cal_img_url
                    })
                }
            }
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <HomeToolbar 
                    navigation={this.props.navigation}
                    title="AMPS Calender"
                    showDrawer={false}
                    onIconPress={()=>{this.props.navigation.dispatch(CommonActions.goBack());
                    }}
                /> 
                <View style={{ flex: 1}}>
                    <Text style={styles.txtinfo}>
                        This is working calender of AMPS 2020
                    </Text>
                    <FastImage 
                        style={styles.imgcalender} 
                        // imageStyle={{
                        //         borderTopLeftRadius: 12, 
                        //         borderTopRightRadius: 12
                        //     }}
                        source = {{ uri: this.state.calender_url}}
                        resizeMode="contain"
         
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    txtinfo: {
        marginVertical: 12,
        marginHorizontal: 8,
        color: AppColors.black,
        fontSize: 16
    },
    imgcalender: {
        height: 600,
        width: 300,
        alignSelf: "center"
    }
})

export default AMPSCalender