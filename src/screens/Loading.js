// @ts-nocheck
/* eslint-disable */
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
    ImageBackground, Image, Alert, TouchableOpacity, Animated } from 'react-native';

import AppColors from './../lib/AppColors';
import Logo from '../lib/logo_small.png';
import auth, { firebase } from "@react-native-firebase/auth";

export class Loading extends Component {
    constructor(props){
        super(props)

        // this.state = {initializing:true,
        //                 user:[]
        //             }
        // this.navigate = this.props.navigation.navigate;

        this.state = {
            LogoAnime: new Animated.Value(0),
            LogoText: new Animated.Value(0),
            loadingSpinner: false,
        };
    }

    componentDidMount() {
        const {LogoAnime, LogoText} = this.state;
        Animated.parallel([
          Animated.spring(LogoAnime, {
            toValue: 1,
            tension: 10,
            friction: 2,
            duration: 2000,
          }).start(),
          Animated.timing(LogoText, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }),
        ]).start(() => {
          this.setState({
            loadingSpinner: true,
          });
        //   setTimeout(switchToAuth, 1500);
        });
    }

    // onAuthStateChanged=(user)=> {
    //     this.setState({user:user})
    //     if (user) {
    //         this.navigate('Drawer');
    //         // console.log(this.state.user)
    //     } else {
    //         this.navigate('Login');
    //     }
    //     if(this.state.initializing){
    //         this.setState({initializing:false})
    //     }
    // }
    
    // render() {
    //     return (
    //             <View style={styles.container}>
    //                 <Text style={styles.txtContainer}>
    //                     This is Loading Page...
    //                 </Text>
    //                 <ActivityIndicator 
    //                     style={{position: 'absolute', bottom: 84}} 
    //                     size="large" color={AppColors.accent} />
    //             </View>
    //         );
    // }

    render() {
        return (
          <View style={styles.container}>
            <Animated.View
              style={{
                opacity: this.state.LogoText,
                // opacity: this.state.LogoAnime,
                // top: this.state.LogoAnime.interpolate({
                //   inputRange: [0, 1],
                //   outputRange: [80, 0],
                // }),
              }}>
              <Image source={Logo} style={styles.logoImage} resizeMode="contain" />
            </Animated.View>
            {/* <Animated.View style={{opacity: this.state.LogoText}}>
              <Text style={styles.logoText}> LogoText </Text>
            </Animated.View> */}
            {this.state.loadingSpinner ? (
            <ActivityIndicator
                style={{
                position: 'absolute',
                left: 0,
                right: 0,
                // top: 0,
                bottom: 120,
                // alignItems: 'flex-end',
                // justifyContent: 'center',
                }}
                size="large"
                color="#487a7b"
            />
            ) : null}
          </View>
        );
    }
    

}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: AppColors.primary,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // txtContainer: {
    //     color: AppColors.white,
    //     fontSize: 20,
    //     alignSelf: "center",
    //     justifyContent: "center"
    // }

    container: {
        flex: 1,
        backgroundColor: '#ffe4d9',
        justifyContent: 'center',
        alignItems: 'center',
      },
      logoText: {
        color: '#FFFFFF',
        fontFamily: 'GoogleSans-Bold',
        fontSize: 30,
        marginTop: 29.1,
        fontWeight: '300',
      },
      logoImage: {
          width: 240
      }
    
});

export default Loading;