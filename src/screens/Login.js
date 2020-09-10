// @ts-nocheck
/* eslint-disable */
import React, { useEffect, useState, useContext } from 'react';
import { validateAll } from 'indicative/validator';
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
    ImageBackground, Image, Alert,TouchableOpacity, SafeAreaView  } from 'react-native';
import {
    // Input,
    // Card,
    // FormValidationMessage,
    Button
} from 'react-native-elements';

import backend from '../backend/Backend'
import AppColors from '../lib/AppColors';
import {
widthPercentageToDP as wp2dp,
heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen'; 
import Icon from 'react-native-vector-icons/FontAwesome';

import { AuthContext } from './../navigation/AuthProvider';

export default function LogIn({ navigation }){
    const [emailAddress, setemailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [SignUpErrors, setSignUpErrors] = useState({});
    const [isLoading, setLoading] = useState(false)
    const { login } = useContext(AuthContext);


    const goToSignUp = () => {

    }

    const handleSignIn = () => {
        // setSignUpErrors(null)

        // console.log(emailAddress,password)
        // console.log("error console 1",SignUpErrors)
        // setSignUpErrors({})
        // console.log("error console",SignUpErrors)
        const rules = {
            email: 'required|email',
            password: 'required|string|min:6|max:40'
        };

        const data = {
            email: emailAddress,
            password: password
        };

        const messages = {
            required: field => `${field} is required`,
            // 'username.alpha': 'Username contains unallowed characters',
            'email.email': 'Please enter a valid email address',
            'password.min': 'Wrong Password is too short',
        };

        const changeState = ()=>{setLoading(true)}
        validateAll(data, rules, messages)
            .then(() => {
                // setLoading(isLoading=>!isLoading)
                changeState()
                console.log(isLoading)
                // let email = emailAddress.toString();
                // let pass = password.toString();
                console.log('success sign in now: ', emailAddress + "_" + password);
                let response = login(emailAddress, password);
                if (response && response.user) {
                        Alert.alert("Success ✅", "Logged successfully");
                      }
                else{                
                    setLoading(false)
                    setSignUpErrors({'error':response})
                    Object.values(SignUpErrors).forEach((item)=>{
                        Alert.alert('error',item)
                    })
                    setSignUpErrors({});
                }
                // consoe.log(res)
                // return res
            })
            .catch(err => {
                setLoading(false)
                const formatError = {};
                err.forEach(err => {
                    formatError[err.field] = err.message;
                    // console.log("error",err.message)
                });
                setSignUpErrors(formatError);
                console.log("state",SignUpErrors)
                Object.values(SignUpErrors).forEach((item)=>{
                    Alert.alert('error',item)
                })
                setSignUpErrors({});

            });
    };
   function showActivity(){
       return(
        <View style = {styles.overlayLoadingContainer}>
       
            <ActivityIndicator 
                        size={50} color={"red"} />
        </View>
        
         )
   }

    return(
        <>
        {isLoading ?
            showActivity()
            :null}
            <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer} >
                <Image
                    source={require('../lib/logo_small.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                {/* <Text style={styles.logoText}>
                    AMPS
                </Text> */}
            </View>
            <View style={styles.inputContainer}>
            <View style={styles.InputandIcon}>
                <Icon name="envelope" color={'grey'} size={20} style={styles.inputIcon} />
                <TextInput
                    placeholder={'Email address'}
                    style={styles.textInput}
                    value={emailAddress}
                    onChangeText={setemailAddress}
                />
            </View>
            <View style={styles.InputandIcon}>
                <Icon name="lock" color={'grey'} size={24}
                    style={styles.inputIcon}
                />
                <TextInput
                    placeholder={'Password'}
                    style={styles.textInput}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                    {/* <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={this.setVisible}
                    >
                        <Icon name={passVisible==false? 'eye':'eye-slash'}
                        
                            color={'grey'} size={20}
                            />
                </TouchableOpacity> */}
            </View>
            {/* <View style={styles.errorTextView}> 
            
            </View> */}
            <TouchableOpacity
                style={styles.loginButton}
                // buttonStyle={styles.loginButton}
                // title="Log In"
                onPress={() => handleSignIn()}
            >
                <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>
           <TouchableOpacity
                style={styles.navButton}
                onPress={() => navigation.navigate('Signup')}
            >
                <Text style={styles.navButtonText}>New to Ananda Marga?{'\n'}Join and Be a Part of Our Family</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
        </>
        
    )
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        // backgroundColor:'rgba(128,128,128,0.1)',
        backgroundColor: '#162525',
        justifyContent: 'center',
        alignItems: 'center'

    },
    logo:{
        width: 240,
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
        width: '100%',
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.4)',
        alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: 24,
        borderTopStartRadius: 36,
        borderTopEndRadius: 36,
    },
    InputandIcon: {
        marginVertical: 4,
    },
    textInput:{
        // backgroundColor:'rgba(128,128,128,0.1)',
        backgroundColor:'#fff',
        width:wp2dp('80%'),
        borderRadius:25,
        paddingLeft:wp2dp('12%'),
        marginTop:hp2dp('1%'),
        zIndex: 9,
        elevation: 5
    },
    inputIcon: {
        position: 'absolute',
        top:hp2dp('3%'),
        left:wp2dp('5%'),
        zIndex: 9,
        elevation: 5
    },
    PasswordinputIcon:{
        position: 'absolute',
        top:hp2dp('11%'),
        left:wp2dp('3.5%'),
        zIndex: 9,
        elevation: 5
    },
    eyeIcon: {
        position: 'absolute',
        left:wp2dp('70%'),
        bottom:hp2dp('2%')
    },
    loginButton: {
        marginTop: 12,
        borderRadius: 25,
        backgroundColor: AppColors.secondary,
        width: wp2dp('80%'),
        height: 48,
        alignItems:'center',
        justifyContent:'center',
        zIndex: 9,
        elevation: 5
    },
    loginButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
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
        color:AppColors.primary
    },
    registerContainer:{
        alignItems:'center',
        marginTop:hp2dp('2%'),
        flexDirection:'row',
        // marginLeft:wp2dp('5%')
    },
    navButton: {
        marginTop: 15
      },
      navButtonText: {
        width:wp2dp('80%'),
        textAlign: 'center',
        backgroundColor: AppColors.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        borderRadius: 48,
        zIndex: 9,
        elevation: 5
      },
        errorText: {
            fontSize: 20,
        },
        errorTextView:{
            backgroundColor:'red',
            // flex:1
        },
        overlay: {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'black',
            opacity: 0.4,
          },
          overlayLoadingContainer:{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            justifyContent:'center',
            alignItems:'center',
            zIndex: 1,
            opacity: 0.4,
            backgroundColor: 'black'
         },
}) 