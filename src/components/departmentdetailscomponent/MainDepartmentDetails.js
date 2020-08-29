// @ts-nocheck
/* eslint-disable */
import React,{ Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
ImageBackground, Image, Alert,TouchableOpacity,FlatList,SafeAreaView } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { SliderBox } from "react-native-image-slider-box";

import { CommonActions } from '@react-navigation/native';

import AppColors from './../../lib/AppColors';
import backend from './../../backend/Backend';

export class DepartmentDetails extends Component{
    constructor(props){
       super(props)
        this.state = {
            allImgUrl: [],
            // images: [
            //     "https://source.unsplash.com/1024x768/?nature",
            //     "https://source.unsplash.com/1024x768/?water",
            //     "https://source.unsplash.com/1024x768/?girl",
            //     "https://source.unsplash.com/1024x768/?tree", // Network image
            //     // require('./assets/images/girl.jpg'),          // Local image
            //   ]
        }

        this.navigate = this.props.navigation.navigate;
        this.item = this.props.item;
    }

    componentDidMount(){
        this._loadItemDetails()
    }

    _loadItemDetails(){
        let self = this;
        let deptId = this.item.id;
        firestore().collection('departmentsName').doc(deptId).collection("details_department").doc("details_info")
        .get().then(docsnap => {
            if(docsnap.exists){
                let img_url = docsnap.data().image_url_all;
                if(img_url){
                    self.setState({
                        allImgUrl: img_url
                    })
                }
            }
        })
    }

    _showImage(){
        if(this.state.allImgUrl.length > 0){
            return(
                <SliderBox 
                    images={this.state.allImgUrl}
                    sliderBoxHeight={200}
                />
            )
        }
    }
   
    render(){
        return(
            <View style={styles.container}>
                {this._showImage()}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1
    }
})
export default DepartmentDetails 