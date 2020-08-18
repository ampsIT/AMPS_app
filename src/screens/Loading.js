// @ts-nocheck
/* eslint-disable */
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
    ImageBackground, Image, Alert,TouchableOpacity  } from 'react-native';

import AppColors from './../lib/AppColors';
import auth, { firebase } from "@react-native-firebase/auth";

export class Loading extends Component {
    constructor(props){
        super(props)

        this.state = {initializing:true,
                        user:[]
                    }
        this.navigate = this.props.navigation.navigate;
    }
   onAuthStateChanged=(user)=> {
        this.setState({user:user})
        if(this.state.initializing){
            this.setState({initializing:false})
        }
      }
    componentDidMount(){
        let self = this;
        const subscriber = auth().onAuthStateChanged(self.onAuthStateChanged);
        // unsubscribe on unmount
        console.log(this.state.user)
        // if(this.state.user===[]){
        //         self.navigate('Login')
        //     }else{
        //         self.navigate('Drawer')
        //     }
        setTimeout(() => {
            self.navigate('Drawer')
        }, 3000);
        
        return subscriber; 
    }

    render() {
        return (
                <View style={styles.container}>
                    <Text style={styles.txtContainer}>
                        This is Loading Page...
                    </Text>
                    <ActivityIndicator 
                        style={{position: 'absolute', bottom: 84}} 
                        size="large" color={AppColors.accent} />
                </View>
            );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtContainer: {
        color: AppColors.white,
        fontSize: 20,
        alignSelf: "center",
        justifyContent: "center"
    }
});

export default Loading;