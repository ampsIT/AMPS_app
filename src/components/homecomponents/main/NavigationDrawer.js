// @ts-nocheck
/* eslint-disable */
import React,{ Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
ImageBackground, Image, Alert,TouchableOpacity,FlatList,SafeAreaView } from 'react-native' 
import {
    DrawerItem,
    DrawerContentScrollView,
  } from '@react-navigation/drawer';
import { Avatar, Accessory } from 'react-native-elements';
import {
    widthPercentageToDP as wp2dp,
    heightPercentageToDP as hp2dp,
  } from 'react-native-responsive-screen';
import auth, { firebase } from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';

import Icon from 'react-native-vector-icons/FontAwesome5';
import {MaterialCommunityIcons}from 'react-native-vector-icons/MaterialCommunityIcons';
import backend from '../../../backend/Backend'
import AppColors from '../../../lib/AppColors'


export class NavigationDrawer extends Component{
    constructor(props){
        super(props)
        this.navigate = this.props.navigation.navigate;
        this.state={
            user:{},
            userLetter: "",
            userId: "",
            username: ""
        }
                                 
    }
    async componentDidMount (){
        let self = this;
        const uid = auth().currentUser.uid
         await firestore()
             .collection('user')
            .doc(uid)
            .get()
            .then(querysnap => {
                if(querysnap.empty){
                    console.log('No matching documents.');
                    return;
                }
                else{
                    console.log("username: ", querysnap.data().name)
                    var letter = self.capitalisedString(querysnap.data().name)
                    self.setState({
                        userLetter: letter,
                        username: querysnap.data().name
                    })
                    console.log("username: ", self.state.userLetter)
                }
            })
            // .then(res=> {
            //     this.setState(prevstate=>{
            //         let user = Object.assign(prevstate.user,res._data) 
            //         // let userLetter = self.capitalisedString(res._data.name)
            //         return {user}
            //     })
            // });   

    }

    capitalisedString(name){
        return name.charAt(0).toUpperCase();
    }

    onClickSignOut = async ()=>{
        let res = await backend.signOut()
        if (res){
            this.navigate('Login')
        }
    }
   render(){
      
   return(
    <DrawerContentScrollView
    >
       <View >
            <View style={styles.userSection}>
                <Avatar
                    rounded
                    // source={{
                    //     uri:'',
                    // }}
                    overlayContainerStyle={{backgroundColor: AppColors.primary}}
                    color={AppColors.primary}
                    title={this.state.userLetter}
                    size="large"
                    // activeOpacity={0.3}
                />
                <Text style={styles.nameText}>
                    Welcome {this.state.username}!
                </Text>
            </View>

            <View style={styles.drawerItems}>
            <DrawerItem
                // icon={() => ( <Icon
                // name='location-arrow'
                // color={'grey'}
                // size={25}
                // />)}
                icon={({ focused, color, size }) => <Icon color={'grey'} size={16} name={focused ? 'location-arrow' : 'location-arrow'} />}
                label="AMPS Navigation"
                labelStyle={styles.labelStyle}
                onPress={(focused) => {this.props.navigation.navigate('Navigation')}}
                activeTintColor={AppColors.primary}
                // inactiveBackgroundColor={AppColors.primary}
            />
            <DrawerItem
                icon={() => ( <Icon
                name='list-alt'
                color={'grey'}
                size={16}
                />)}
                label="Acarya Diary"
                labelStyle={styles.labelStyle}
                onPress={() => {this.props.navigation.navigate('AcharyaDiaryScreen')}}
            />
            <DrawerItem
                icon={() => ( <Icon
                name='user-friends'
                color={'grey'}
                size={16}
                />)}
                label="Revolutionary Marriage"
                labelStyle={styles.labelStyle}
                onPress={() => {}}
            />
            </View>
        </View>
            <View style={styles.comItems}>
            {/* <Text style={styles.headingText}>
                Communicate
            </Text> */}
            
            {/* <DrawerItem
                icon={() => ( <Icon
                name='share'
                color={'grey'}
                size={16}
                />)}
                label="Share With Friends"
                labelStyle={styles.labelStyle}
                onPress={() => {}}
            /> */}
            <DrawerItem
                icon={() => ( <Icon
                name='share'
                color={'grey'}
                size={16}
                />)}
                label="Donate Us"
                labelStyle={[styles.labelStyle, {marginLeft:wp2dp('1%')}]}
                onPress={() => {}}
            />
            <DrawerItem
                icon={() => ( <Icon
                name='info'
                color={'grey'}
                size={16}
                />)}
                label="AMPS Calender"
                labelStyle={[styles.labelStyle, {marginLeft:wp2dp('3.5%')}]}
                onPress={() => {}}
            />
             <DrawerItem
                icon={() => ( <Icon
                name='mobile'
                color={'grey'}
                size={16}
                />)}
                label="Connect With us"
                labelStyle={[styles.labelStyle,{marginLeft:wp2dp('2.5%')}]}
                onPress={() => {}}
            />
            <DrawerItem
                icon={() => ( <Icon
                name='address-book'
                color={'grey'}
                size={16}
                />)}
                label="Contact Us"
                labelStyle={[styles.labelStyle,{marginLeft:wp2dp('1%')}]}
                onPress={() => {}}
            />
            <DrawerItem
                icon={() => ( <Icon
                name='comment'
                color={'grey'}
                size={16}
                />)}
                label="Feedback"
                labelStyle={[styles.labelStyle,{marginLeft:wp2dp('1%')}]}
                onPress={() => {}}
            />
            </View>
            
            <View style={styles.buttonView}>
                <View >
                <DrawerItem
                    icon={() => ( <Icon
                    name='external-link-alt'
                    color={'grey'}
                    size={16}
                    />)}
                    label="SignOut"
                    labelStyle={[styles.labelStyle,{marginLeft:wp2dp('1.5%')}]}
                    onPress={() => {this.onClickSignOut()}}
                />
                </View>
            </View>
            
            
            
           
        


    </DrawerContentScrollView>
   )}
}
const styles = StyleSheet.create({
    container:{
        
        // backgroundColor:'red'
    },
    userSection:{
        flexDirection: 'row',
        // backgroundColor:"green",
        paddingStart: 12,
        marginTop:hp2dp('-1%'),
        // alignItems: 'center',
        paddingVertical: 16,
        // borderBottomWidth:0.2,
        backgroundColor:AppColors.secondary,
    },
    nameText:{
        fontSize: 16,
        color: AppColors.white,
        alignSelf: 'center',
        paddingStart: 12
    },
    drawerItems: {
        // paddingBottom: hp2dp('1%'),
        // borderBottomWidth:0.2
    },
    labelStyle:{
        fontSize: 14,
        // fontWeight:'500'
        color:'grey'
    },
    comItems:{
        // borderBottomWidth:0.2
    },
    headingText:{
        fontSize:16,
        padding: wp2dp('2%')
    },
    buttonView:{
        // marginTop:hp2dp('25%'),
        // backgroundColor: 'yellow',
        flex:1,
        // marginVertical:'auto'
        // alignItems:'flex-end'
    }
    // labelPos:{marginLeft:wp2dp('3%')}
})

export default NavigationDrawer;