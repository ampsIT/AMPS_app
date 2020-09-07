// @ts-nocheck
/* eslint-disable */
import React,{ Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
ImageBackground, Image, Alert,TouchableOpacity,FlatList,SafeAreaView } from 'react-native' 

import { CommonActions } from '@react-navigation/native';

import {
    widthPercentageToDP as wp2dp,
    heightPercentageToDP as hp2dp,
  } from 'react-native-responsive-screen';   

  import AppColors from './../../lib/AppColors';
  import backend from './../../backend/Backend';

import { SliderBox } from "react-native-image-slider-box";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import Collapsible from 'react-native-collapsible';


export class PublicationMain extends Component{
    constructor(props){
        super(props)
        this.state = {
            aboutWriter: "",
            aboutBook: "",
            imgurl: [],

            collapseAboutBook: true,
            collapseAboutWriter: true
        }

        this.item = this.props.item;
    }

    componentDidMount(){
        this.loadPublicationDetails();
    }

    loadPublicationDetails(){
        let self = this;
        let id = this.item.id;
        if(id){
            firestore().collection('all_publication_books').doc(id).collection("details_book").doc("all_details").get()
            .then(documentSnapshot => {
                if(documentSnapshot.exists){
                    self.setState({
                        aboutWriter: documentSnapshot.data().about_writer,
                        aboutBook: documentSnapshot.data().about_book,
                        imgurl: documentSnapshot.data().img_url
                    })
                }
            })
        }
    }

    loadImages(){
        if(this.state.imgurl.length > 0){
            return(
                <View style={styles.imgplayer}>
                     <SliderBox 
                        images={this.state.imgurl}
                        sliderBoxHeight={200}
                    />
                </View>
            );
        }
    }

    pressAboutBook(){
        let val = this.state.collapseAboutBook;
        this.setState({
            collapseAboutBook: !val
        })
    }

    pressAboutWriter(){
        let val = this.state.collapseAboutWriter;
        this.setState({
            collapseAboutWriter: !val
        })
    }

    _showAboutBook(){
        return(
            <View>
                 <TouchableOpacity style={styles.headerCardView1}
                 onPress={() => this.pressAboutBook()}>
                     <Text style={styles.heading}>
                         About Book:
                     </Text>
                     <View>
                         {
                         (!this.state.collapseAboutBook)?
                         <Image source={require('./../../lib/up.png')}/>:
                         <Image source={require('./../../lib/down.png')}/>
                         }
                     </View>
                 </TouchableOpacity>
                 <Collapsible collapsed={this.state.collapseAboutBook}>
                     <View style={styles.infoView}>
                         {/* <View style={styles.infoCardinnermain}> */}
                             <Text style={styles.cardtxt}>
                                {(this.state.aboutBook === "") ? "No Info": (this.state.aboutBook)}
                             </Text>
                         {/* </View> */}
                     </View>
                 </Collapsible>
            </View>
         )
    }

    _showAboutWriter(){
        return(
            <View>
                 <TouchableOpacity style={styles.headerCardView1}
                 onPress={() => this.pressAboutWriter()}>
                     <Text style={styles.heading}>
                         About Author:
                     </Text>
                     <View>
                         {
                         (!this.state.collapseAboutWriter)?
                         <Image source={require('./../../lib/up.png')}/>:
                         <Image source={require('./../../lib/down.png')}/>
                         }
                     </View>
                 </TouchableOpacity>
                 <Collapsible collapsed={this.state.collapseAboutWriter}>
                     <View style={styles.infoView}>
                         {/* <View style={styles.infoCardinnermain}> */}
                             <Text style={styles.cardtxt}>
                                {(this.state.aboutWriter === "") ? "No Info": (this.state.aboutWriter)}
                             </Text>
                         {/* </View> */}
                     </View>
                 </Collapsible>
            </View>
         )
    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                {this.loadImages()}
                <ScrollView style={{flex: 1}}>
                    <View style={styles.scrollmain}>
                        {this._showAboutBook()}
                        {this._showAboutWriter()}
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    imgplayer: {
        height: 200,
        width: "100%"
    },
    scrollmain: {
        flex: 1,
        paddingBottom: 10,
    },
    headerCardView1: {
        paddingLeft: 10,
        paddingTop: 6,
        paddingBottom: 6,
        paddingRight: 16,
        flexDirection:'row',
        // backgroundColor:'blue',
        alignItems:'center',
        justifyContent: 'space-between',
        marginTop: 12,
        marginBottom: 4,
        backgroundColor: AppColors.white
    },
    heading: {
        fontSize:20,
        fontWeight: 'bold',
        color: AppColors.deepblue
    },
    infoView: {
        paddingLeft: 6,
        paddingTop: 5,
        paddingBottom: 5,
    },
    cardtxt: {
        fontSize:18,
    }
})

export default PublicationMain