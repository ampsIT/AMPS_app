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
import Icon from 'react-native-vector-icons/FontAwesome5';
import {MaterialCommunityIcons}from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from '../../../screens/Login'
import AppColors from '../../../lib/AppColors'
export class NavigationDrawer extends Component{
    constructor(props){
        super(props)
        // LoginObj = new Login
        // this.navigate = this.props.navigation.navigate;
    }
   render(){
   return(
    <DrawerContentScrollView>
       <View style={styles.container}>
            <View style={styles.userSection}>
            <Avatar
                rounded
                // source={{
                //     uri:'',
                // }}
                title="U"
                size="xlarge"
            />
                <Text style={styles.nameText}>
                    Welcome, User
                 </Text>
            </View>

            <View style={styles.drawerItems}>
            <DrawerItem
                icon={() => ( <Icon
                name='location-arrow'
                color={'grey'}
                size={25}
                />)}
                label="AMPS Navigation"
                labelStyle={styles.labelStyle}
                onPress={() => {}}
            />
            <DrawerItem
                icon={() => ( <Icon
                name='list-alt'
                color={'grey'}
                size={25}
                />)}
                label="Acarya Diary"
                labelStyle={styles.labelStyle}
                onPress={() => {}}
            />
            <DrawerItem
                icon={() => ( <Icon
                name='user-friends'
                color={'grey'}
                size={20}
                />)}
                label="Revolutionary Marriage"
                labelStyle={styles.labelStyle}
                onPress={() => {}}
            />
            </View>

            <View style={styles.comItems}>
            <Text style={styles.headingText}>
                Communicate
            </Text>
            <DrawerItem
                icon={() => ( <Icon
                name='address-book'
                color={'grey'}
                size={25}
                />)}
                label="Contact Us"
                labelStyle={styles.labelStyle}
                onPress={() => {}}
            />
            <DrawerItem
                icon={() => ( <Icon
                name='share'
                color={'grey'}
                size={20}
                />)}
                label="Share With Friends"
                labelStyle={styles.labelStyle}
                onPress={() => {}}
            />
            <DrawerItem
                icon={() => ( <Icon
                name='info'
                color={'grey'}
                size={25}
                />)}
                label="About App"
                labelStyle={[styles.labelStyle, {marginLeft:wp2dp('2.5%')}]}
                onPress={() => {}}
            />
             <DrawerItem
                icon={() => ( <Icon
                name='mobile'
                color={'grey'}
                size={24}
                />)}
                label="More App"
                labelStyle={[styles.labelStyle,{marginLeft:wp2dp('1%')}]}
                onPress={() => {}}
            />
            <DrawerItem
                icon={() => ( <Icon
                name='comment'
                color={'grey'}
                size={24}
                />)}
                label="Feedback"
                labelStyle={[styles.labelStyle]}
                onPress={() => {}}
            />
            </View>
            <DrawerItem
                icon={() => ( <Icon
                name='external-link-alt'
                color={'grey'}
                size={24}
                />)}
                label="SignOut"
                labelStyle={[styles.labelStyle,{marginLeft:wp2dp('-5%')}]}
                // onPress={() => { LoginObj.signOut()}}
            />
            
           
        </View>


    </DrawerContentScrollView>
   )}
}
const styles = StyleSheet.create({
    contianer:{
        flex:1
    },
    userSection:{
        // backgroundColor:"green",
        alignItems: 'center',
        paddingBottom: hp2dp('2%'),
        borderBottomWidth:0.2,
        // backgroundColor:AppColors.primary,
    },
    nameText:{
        fontSize:25
    },
    drawerItems: {
        // paddingBottom: hp2dp('1%'),
        borderBottomWidth:0.2
    },
    labelStyle:{
        fontSize:16,
        
    },
    comItems:{
        borderBottomWidth:0.2
    },
    headingText:{
        fontSize:16,
        padding: wp2dp('3%')
    },
    // labelPos:{marginLeft:wp2dp('3%')}
})

export default NavigationDrawer;