// @ts-nocheck
/* eslint-disable */
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
    ImageBackground, Image, Alert,TouchableOpacity  } from 'react-native';

import AppColors from '../lib/AppColors';

import HomeToolbar from './../components/homecomponents/toolbar/ToolBarHome';
import HomeMain from './../components/homecomponents/main/HomeMain';

export class Home extends Component {
    constructor(props){
        super(props)

        this.state = {}
        this.navigate = this.props.navigation.navigate;
    }

    render() {
        return (
                <View style={styles.container}>
                   <HomeToolbar 
                    navigation={this.props.navigation}
                    />
                    <HomeMain style={styles.mainContainer}
                    navigation={this.props.navigation}
                    />

                </View>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Home;