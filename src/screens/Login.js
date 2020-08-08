// @ts-nocheck
/* eslint-disable */
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
    ImageBackground, Image, Alert,TouchableOpacity,Button,SafeAreaView  } from 'react-native';
import auth, { firebase } from "@react-native-firebase/auth";

import AppColors from '../lib/AppColors';
import {
    widthPercentageToDP as wp2dp,
    heightPercentageToDP as hp2dp,
  } from 'react-native-responsive-screen'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from 'react-native-google-signin';
export class Login extends Component {
    constructor(props){
        super(props)

        this.state = {
            passVisible:true,
            press:false,
            email:'',
            password:'',
            loggedIn:false,
            user:[]
        }
        this.navigate = this.props.navigation.navigate;
    }
    componentDidMount(){
        GoogleSignin.configure({
            scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
            webClientId:
              '739140978292-u2e6j50amn52928htk3l3394l12l21u0.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
          });
          const subscriber = auth().onAuthStateChanged(this.onAuthStateChanged);
          return subscriber; // unsubscribe on unmount
    }
    onAuthStateChanged=(user)=>{
        // setUser(user);
        this.setState({user:user})
        // console.log(user);
        if (user) {this.setState({loggedIn:true})};
      }

    setVisible = () =>{
        if(this.state.press==false){
        this.setState({passVisible:false,press:true})
        }
        else{
            this.setState({passVisible:true,press:false})
        }
    }
    
    loginFunction =()=>{
        console.log(this.state.email,this.state.password)
        this.SignIn(this.state.email,this.state.password)
    }

    SignIn=async (email,password)=>{
        try {
            let response = await auth().signInWithEmailAndPassword(email, password);
            if (response && response.user) {
              Alert.alert("Success ✅", "Logged successfully");
              this.navigate('Home')
            }
          } catch (e) {
            console.error(e.message);
          }
    }
    
    googleLogin = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const {accessToken, idToken} = await GoogleSignin.signIn();
          this.setState({loggedIn: true});

          const credential = auth.GoogleAuthProvider.credential(
            idToken,
            accessToken,
          );
         const res =await auth().signInWithCredential(credential);
         if (res.user){
            this.navigate('Home')
         }
          
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            alert('Cancel');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            alert('Signin in progress');
            // operation (f.e. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            alert('PLAY_SERVICES_NOT_AVAILABLE');
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
      };

    signOut = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          auth()
            .signOut()
            .then(() => alert('Your are signed out!'));
        //   setloggedIn(false);
        this.setState({ loggedIn: false,user:[]})
          // setuserInfo([]);
        } catch (error) {
          console.error(error);
        }
      };


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
                    onPress={this.loginFunction}
                    >
                        <Text style={styles.buttonText}>
                            Login
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.orText}>
                        Or
                    </Text>
                    <View>
                    <TouchableOpacity style={styles.googleButton}
                    onPress={this.googleLogin}
                    >
                        {/* <Icon name="google" color={'red'}size={23}
                        style={styles.gicon}
                        /> */}
                        <View style={styles.imgcontainer}>
                        <Image
                            source={require('../lib/gicon.png')}
                            style={styles.gimage}
                            />
                        </View>
                        <View style={styles.txtContainer} >
                        <Text style={styles.buttonText}>
                                Login with Google
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.registerContainer}>
                        <Text style={styles.AccountText}>
                            Don't Have an Account?
                        </Text>
                    
                        
                        <TouchableOpacity style={styles.registeropacity}
                        onPress={()=>{this.navigate('Register')}}
                        >
                        <Text style={styles.registerText} >
                        Register
                        </Text>
                        </TouchableOpacity>
                    </View>
                    

                    </View>
                </SafeAreaView>
            );
    }
}

export default Login;

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
    inputIcon: {
        position: 'absolute',
        top:hp2dp('3%'),
        left:wp2dp('3%')
    },
    PasswordinputIcon:{
        position: 'absolute',
        top:hp2dp('11%'),
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
        color:AppColors.primary
    },
    registerContainer:{
        alignItems:'center',
        marginTop:hp2dp('2%'),
        flexDirection:'row',
        marginLeft:wp2dp('15%')
    }
}) 