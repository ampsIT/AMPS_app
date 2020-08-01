// @ts-nocheck
/* eslint-disable */
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
    ImageBackground, Image, Alert,TouchableOpacity  } from 'react-native';

import AppColors from './../../../lib/AppColors';

export class HomeMain extends Component {
    constructor(props){
        super(props)

        this.state = {}
        
    }

    render() {
        return (
                <View style={styles.container}>
                    <Text style={styles.txtContainer}>
                        This is Home Page...DSFDSF
                    </Text>
                </View>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtContainer: {
        color: AppColors.primary,
        fontSize: 20,
        alignSelf: "center",
        justifyContent: "center"
    }
});

export default HomeMain;