// @ts-nocheck
/* eslint-disable */
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
    ImageBackground, Image, Alert,TouchableOpacity,SafeAreaView  } from 'react-native';
import {Picker} from '@react-native-community/picker';

import auth, { firebase } from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import backend from '../backend/Backend'
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
                      user:{
                        name:'',
                        email:'',
                        password:'',
                        contactno:null,
                        gender:'Select Gender',
                        category:'Select User Category'
                      },
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
    SignUpFunction = async () =>{
        let response = await backend.SignUp(this.state.name,this.state.email,this.state.password)
        // console.log(response)
        console.log(this.state)
        // if(response){
        //     Alert.alert(response);
        //     // this.navigate('Drawer')
        // }
        

    }

    // SignUp = (name,email,password) =>{

    //     try{
    //         auth().createUserWithEmailAndPassword(email,password)
    //         .then((data)=>{
    //             console.log('user',data.user)
    //             if(data.user.uid){
    //                 const user = {
    //                     uid:data.user.uid,
    //                     email:email,
    //                     name:name
    //                 }
    //                 firestore()
    //                 .collection('user')
    //                 .doc(data.user.uid)
    //                 .set(user)
    //                 .then(() => {
    //                     console.log('User added!');
    //                 });
    //             }
    //         })
            
    //         }
    //     catch(error){
    //         if (error.code === 'auth/email-already-in-use') {
    //             console.log('That email address is already in use!');
    //             }
    
    //             if (error.code === 'auth/invalid-email') {
    //             console.log('That email address is invalid!');
    //             }
    
    //             console.error(error);

    //     }
    // }
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

            <View style={styles.InputandIcon}>
                <Icon name="user" color={'grey'} size={20}
                style={styles.inputIcon}
                />
                    <TextInput
                    placeholder={'Name'}
                    style={styles.textInput}
                    onChangeText={(text)=>{this.setState({name:text})}}
                    />
            </View>

            <View style={styles.InputandIcon}>
                    <Icon name="envelope" color={'grey'} size={20}
                    style={styles.inputIcon}
                    />
            
                <TextInput
                placeholder={'Email address'}
                style={styles.textInput}
                onChangeText={(text)=>{this.setState({email:text})}}
                />
            </View>

            <View style={styles.InputandIcon}>
                <Icon name="lock" color={'grey'} size={23}
                style={styles.inputIcon}
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
                
                <View style={styles.InputandIcon}>
                    <Icon name="phone" color={'grey'} size={23}
                    style={styles.inputIcon}
                    />
                    <TextInput
                        placeholder={'Contact No.'}
                        style={styles.textInput}
                        onChangeText={(text)=>{this.setState({contactno:text})}}
                        keyboardType={'number-pad'}
                    />
                
                </View>
            
                <View style={styles.genderPView}>
                <Icon name='users' color={'grey'} size={20}
                style={styles.genderIcon}
                />
                <Picker
                    selectedValue={this.state.gender}
                    style={styles.genderPicker}
                    mode={'dropdown'}
                    onValueChange={(itemValue, itemIndex) =>{
                        if(itemValue!='Select Gender'){
                            this.setState({gender: itemValue})
                            // console.log(this.state.gender)
                        }
                    }
                    }>
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
                    selectedValue={this.state.category}
                    style={styles.genderPicker}
                    mode={'dropdown'}
                    onValueChange={(itemValue, itemIndex) =>{
                        if(itemValue!='Select User Category'){
                            this.setState({category: itemValue})
                            // console.log(this.state.category)
                        }
                    }
                    }>
                    <Picker.Item label="Select User Category" value="Select User Category" />
                    <Picker.Item label="Margii" value="margii" />
                    <Picker.Item label="Non-Margii" value="non-margii" />
                    <Picker.Item label="Acarya" value="acarya" />
                </Picker>
                </View>
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
    InputandIcon:{
        backgroundColor:'rgba(128,128,128,0.1)',
        width:wp2dp('80%'),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:25,
        marginTop:hp2dp('1%')
    },
    textInput:{
        // backgroundColor:'rgba(128,128,128,0.1)',
        width:wp2dp('80%'),
        paddingLeft:wp2dp('2%'),
    },
    inputIcon:{       
         marginLeft:wp2dp('12%')
        },
    eyeIcon: {
        position: 'absolute',
        left:wp2dp('70%'),
        bottom:hp2dp('2%')
    },
    genderPicker:{
        width:wp2dp('70%'),
        borderTopLeftRadius: 30,
        // marginLeft:wp2dp('8%')
    },
    genderPView:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:hp2dp('1%'),
        width:wp2dp('80%'),
        borderRadius:30,
        backgroundColor:'rgba(128,128,128,0.1)',
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