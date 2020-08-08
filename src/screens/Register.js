// @ts-nocheck
/* eslint-disable */
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
    ImageBackground, Image, Alert,TouchableOpacity,SafeAreaView  } from 'react-native';
import auth, { firebase } from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';

import AppColors from '../lib/AppColors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    widthPercentageToDP as wp2dp,
    heightPercentageToDP as hp2dp,
  } from 'react-native-responsive-screen'; 
export class Register extends Component {
    constructor(props){
        super(props)

        this.state = {passVisible:true,
                      press:false,
                      name:'',
                      email:'',
                      password:'',
                     }
        this.navigate = this.props.navigation.navigate;
    }
    setVisible = () =>{
        if(this.state.press==false){
        this.setState({passVisible:false,press:true})
        }
        else{
            this.setState({passVisible:true,press:false})
        }
    }
    SignUpFunction = () =>{
        this.SignUp(this.state.name,this.state.email,this.state.password)
        // console.log(this.state)

    }

    SignUp = (name,email,password) =>{

        try{
            auth().createUserWithEmailAndPassword(email,password)
            .then((data)=>{
                console.log('user',data.user)
                if(data.user.uid){
                    const user = {
                        uid:data.user.uid,
                        email:email,
                        name:name
                    }
                    firestore()
                    .collection('user')
                    .doc(data.user.uid)
                    .set(user)
                    .then(() => {
                        console.log('User added!');
                    });
                }
            })
            
            }
        catch(error){
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                }
    
                if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
                }
    
                console.error(error);

        }
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer} >
                <Image
                    source={require('../lib/computer.png')}
                    style={styles.logo}
                />
                <Text style={styles.logoText}>
                    AMPS
                </Text>

            <View style={styles.inputContainer}>
            <Icon name="user" color={'grey'} size={20}
            style={styles.NameIcon}
            />
                <TextInput
                placeholder={'Name'}
                style={styles.textInput}
                onChangeText={(text)=>{this.setState({name:text})}}
                />

            <Icon name="envelope" color={'grey'} size={20}
            style={styles.inputIcon}
            />
                <TextInput
                placeholder={'Email address'}
                style={styles.textInput}
                onChangeText={(text)=>{this.setState({email:text})}}
                />
            <Icon name="lock" color={'grey'} size={23}
            style={styles.PasswordinputIcon}
            />
                <TextInput
                placeholder={'Password'}
                style={styles.textInput}
                onChangeText={(pass)=>{this.setState({password:pass})}}
                secureTextEntry={this.state.passVisible}
                />
            <TouchableOpacity
            style={styles.eyeIcon}
            onPress={this.setVisible}
            >
                <Icon name={this.state.press==false? 'eye':'eye-slash'}
                
                    color={'grey'} size={20}
                     />
            </TouchableOpacity>
            </View>
            </View>
            {/* <Button
            title="Login"
            color="orange"
            style={styles.loginButton}
            /> */}
            <TouchableOpacity style={styles.loginButton}
            onPress={this.SignUpFunction}
            >
                <Text style={styles.buttonText}>
                    SignUp
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
            );
    }
}

export default Register;

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'rgba(128,128,128,0.1)',
        justifyContent:'center',
        alignItems:'center'

    },
    logo:{
        
        // backgroundColor:'black'
    },
    logoContainer:{
        alignItems:'center'
    },
    logoText:{
        fontSize:20,
        fontWeight:'700',
        color:'black',
        marginTop:hp2dp('1%')
    },
    inputContainer: {
        
    },
    textInput:{
        backgroundColor:'rgba(128,128,128,0.1)',
        width:wp2dp('80%'),
        borderRadius:25,
        paddingLeft:wp2dp('10%'),
        marginTop:hp2dp('1%')
    },
    NameIcon:{
        position: 'absolute',
        top:hp2dp('3%'),
        left:wp2dp('4%')
    },
    inputIcon: {
        position: 'absolute',
        top:hp2dp('11%'),
        left:wp2dp('3%')
    },
    PasswordinputIcon:{
        position: 'absolute',
        top:hp2dp('19%'),
        left:wp2dp('3.5%')
    },
    eyeIcon: {
        position: 'absolute',
        left:wp2dp('70%'),
        bottom:hp2dp('2%')
    },
    loginButton: {
        marginTop:hp2dp('1%'),
        borderRadius:25,
        backgroundColor:AppColors.primary,
        width:wp2dp('80%'),
        height:hp2dp('7%'),
        alignItems:'center',
        justifyContent:'center',
        elevation:4
    },
    buttonText:{
        fontSize: 25,
        textAlign:'center',
        // justifyContent:'center'
    },
    googleButton: {
        marginTop:hp2dp('1%'),
        borderRadius:25,
        backgroundColor:'white',
        width:wp2dp('80%'),
        height:hp2dp('7%'),
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        elevation:3
        // height:hp2dp('8%'),
    },
    orText: {
        fontSize: 20,
        marginVertical:hp2dp('1%')
    },
    gicon:{
        position: 'absolute',
        top:hp2dp('2%'),
        left:hp2dp('5%')
    },
    gimage:{
        width:wp2dp('5%'),
        height:hp2dp('3%'),
        // marginLeft:wp2dp('8%'),
        // marginTop:hp2dp('2%')
        // justifyContent:'center'
    },
    imgcontainer:{
        // justifyContent:'center'
        marginRight:wp2dp('2%')
    },
    txtContainer:{
        // justifyContent:'center',
        // alignItems:'center'
    },
    AccountText: {
        fontSize: 15,
    },
    registerText: {
        fontSize: 20,
        marginLeft:wp2dp('1%'),
        color:'orange'
    },
    registerContainer:{
        alignItems:'center',
        marginTop:hp2dp('2%'),
        flexDirection:'row',
        marginLeft:wp2dp('15%')
    }
});