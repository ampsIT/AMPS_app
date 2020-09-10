// @ts-nocheck
/* eslint-disable */
import React, { useEffect, useState, useContext } from 'react';
import { validateAll } from 'indicative/validator';
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput, Button,
    ImageBackground, Image, Alert,TouchableOpacity,SafeAreaView  } from 'react-native';
import {Picker} from '@react-native-community/picker';
// import {
//     Input,
//     Card,
//     FormValidationMessage,
//     Button
// } from 'react-native-elements';

import backend from '../backend/Backend'
import AppColors from '../lib/AppColors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
widthPercentageToDP as wp2dp,
heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen'; 

import { AuthContext } from './../navigation/AuthProvider';
import { ScrollView } from 'react-native-gesture-handler';

export default function Register({ navigation }){
    const [name, seteName] = useState('');
    const [emailAddress, setemailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [contactno, setContactno] = useState('');
    const [gender, setGender] = useState('Select Gender');
    const [category, setCategory] = useState('Select User Category');
    const [passVisible, setpassVisible] = useState(false);
    const [confirmpassVisible, setconfirmpassVisible] = useState(false);
    const [SignUpErrors, setSignUpErrors] = useState({});

    const { register } = useContext(AuthContext); // should be signUp

    // setVisible = () => {

    // }

    const goTosignIn = () => {
        navigation.navigate('Login')
    }

    const handleSignUp = () => {
        const rules = {
            email: 'required|email',
            password: 'required|string|min:6|max:40|confirmed',
            username: 'required|alpha',
            gender: 'required|string',
            category: 'required|string'
        };

        const data = {
            email: emailAddress,
            password: password,
            password_confirmation: passwordConfirm,
            username: name,
            gender: gender,
            category: category
        };

        const messages = {
            required: field => `${field} is required`,
            'username.alpha': 'Username contains unallowed characters',
            'email.email': 'Please enter a valid email address',
            'password.min':
                'Password is too short. Must be greater than 6 characters',
            'password.confirmed': 'Passwords do not match'
        };

        validateAll(data, rules, messages)
            .then(() => {
                console.log('success sign in');
                register(emailAddress, password, name, gender, category, contactno);
            })
            .catch(err => {
                const formatError = {};
                err.forEach(err => {
                    formatError[err.field] = err.message;
                });
                setSignUpErrors(formatError);
            });
    }

    useEffect(() => {}, [SignUpErrors]);

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={{flex: 1, width: '100%', }}>
                <View style={{flex: 1, width: '100%', paddingBottom: 24,}}>
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
                            <Icon name="user" color={'grey'} size={20}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                placeholder={'Name'}
                                style={styles.textInput}
                                value={name}
                                onChangeText={seteName}
                            />
                        </View>
                        <View style={styles.InputandIcon}>
                            <Icon name="envelope" color={'grey'} size={20}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                placeholder={'Email address'}
                                style={styles.textInput}
                                value={emailAddress}
                                onChangeText={setemailAddress}
                            />
                        </View>
                        <View style={styles.InputandIcon}>
                            <Icon name="lock" color={'grey'} size={20}
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
                            <View style={styles.InputandIcon}>
                                <Icon name="lock" color={'grey'} size={20}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    placeholder={'Confirm Password'}
                                    style={styles.textInput}
                                    value={passwordConfirm}
                                    onChangeText={setPasswordConfirm}
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
                            <View style={styles.InputandIcon}>
                                <Icon name="phone" color={'grey'} size={20}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    placeholder={'Contact No'}
                                    style={styles.textInput}
                                    value={contactno}
                                    onChangeText={setContactno}
                                    keyboardType={'number-pad'}
                                />
                            </View>
                            <View style={styles.genderPView}>
                                <Icon name='users' color={'grey'} size={20}
                                style={styles.genderIcon}
                                />
                                <Picker
                                    selectedValue={gender}
                                    style={styles.genderPicker}
                                    mode={'dropdown'}
                                    onValueChange={(itemValue, itemIndex) =>{
                                        if(itemValue!='Select Gender'){
                                            setGender(itemValue)
                                        }
                                    }}>
                                    <Picker.Item label="Select Gender" value="Select Gender" />
                                    <Picker.Item label="Male" value="male" />
                                    <Picker.Item label="Female" value="female" />
                                    <Picker.Item label="Other" value="other" />
                                </Picker>
                                </View>
                                <View style={styles.genderPView}>
                                    <Icon name='user-circle' color={'grey'} size={20}
                                    style={styles.categoryIcon}
                                    />
                                    <Picker
                                        selectedValue={category}
                                        style={styles.genderPicker}
                                        mode={'dropdown'}
                                        onValueChange={(itemValue, itemIndex) =>{
                                            if(itemValue!='Select User Category'){
                                                setCategory(itemValue)
                                            }
                                        }}>
                                        <Picker.Item label="Select User Category" value="Select User Category" />
                                        <Picker.Item label="Margii" value="margii" />
                                        <Picker.Item label="Non-Margii" value="non-margii" />
                                        <Picker.Item label="Acarya" value="acarya" />
                                    </Picker>
                                </View>
                                <TouchableOpacity
                                    style={styles.loginButton}
                                    onPress={() => handleSignUp()}
                                >
                                    <Text style={styles.loginButtonText}>SIGN UP</Text>
                                </TouchableOpacity>

                                {/* <Button
                                    buttonStyle={{ marginTop: 50 }}
                                    backgroundColor="#03A9F4"
                                    title="SIGN UP"
                                    onPress={() => handleSignUp()}
                                    /> */}
                                {/* <Text style={{ marginLeft: 80 }} onPress={() => goTosignIn()}>
                                    Already Signed Up? Sign In
                                </Text> */}
                            </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#162525',
        justifyContent:'center',
        alignItems:'center'
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
        // width: '100%',
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.4)',
        alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: 12,
        paddingBottom: 24,
        // borderTopStartRadius: 36,
        // borderTopEndRadius: 36,
        borderRadius: 36,
        marginHorizontal: 12
    },
    InputandIcon:{
        backgroundColor:'rgba(128,128,128,0.1)',
        width:wp2dp('84%'),
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:25,
        marginTop:hp2dp('1%')
    },
    textInput:{
        // backgroundColor:'rgba(128,128,128,0.1)',
        // width:wp2dp('80%'),
        // paddingLeft:wp2dp('2%'),
        backgroundColor:'#fff',
        width:wp2dp('84%'),
        borderRadius:25,
        paddingLeft:wp2dp('12%'),
        marginTop:hp2dp('1%'),
        zIndex: 5,
        elevation: 4
    },
    inputIcon:{       
        position: 'absolute',
        top:hp2dp('3%'),
        left:wp2dp('5%'),
        zIndex: 9,
        elevation: 5
        },
    eyeIcon: {
        position: 'absolute',
        left:wp2dp('70%'),
        bottom:hp2dp('2%')
    },
    genderPicker:{
        width:wp2dp('72%'),
        borderTopLeftRadius: 30,
        // marginLeft:wp2dp('8%'),
    },
    genderPView:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:hp2dp('1%'),
        width:wp2dp('84%'),
        borderRadius:30,
        // backgroundColor:'rgba(128,128,128,0.1)',
        backgroundColor:'#fff',
    },
    loginButton: {
        // marginTop:hp2dp('1%'),
        // borderRadius:25,
        // backgroundColor:AppColors.primary,
        // width:wp2dp('80%'),
        // height:hp2dp('7%'),
        // alignItems:'center',
        // justifyContent:'center',
        // elevation:4
        marginTop: 12,
        borderRadius: 25,
        backgroundColor: AppColors.secondary,
        width: wp2dp('84%'),
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
        color:'orange'
    },
    registerContainer:{
        alignItems:'center',
        marginTop:hp2dp('2%'),
        flexDirection:'row',
        marginLeft:wp2dp('15%')
    }
});