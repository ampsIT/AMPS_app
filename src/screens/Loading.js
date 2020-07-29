// @ts-nocheck
/* eslint-disable */
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
    ImageBackground, Image, Alert,TouchableOpacity  } from 'react-native';

import AppColors from './../lib/AppColors';

export class Loading extends Component {
    constructor(props){
        super(props)

        this.state = {}
        this.navigate = this.props.navigation.navigate;
    }

    componentDidMount(){
        let self = this;
        setTimeout(() => {
            self.navigate('Home')
        }, 3000);
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