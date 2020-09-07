// @ts-nocheck
/* eslint-disable */
import React,{ Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
ImageBackground, Image, Alert,TouchableOpacity,FlatList,SafeAreaView } from 'react-native';

import { material } from 'react-native-typography'

import firestore from '@react-native-firebase/firestore';
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';   
import AppColors from '../../../lib/AppColors';
import backend from './../../../backend/Backend';
import FastImageBackground from './../../../lib/FastimageBack';

export class Tabsection5 extends Component{
    constructor(props){
        super(props)
        this.state = {
            eventData: []
        }

        this.navigate = this.props.navigation.navigate
    }

    componentDidMount(){
        this.getAllEvents()
    }

    getAllEvents(){
        let self = this;
        firestore()
        .collection('event_broadcast')
        .get()
        .then(querySnapshot => {
            data = [];
            querySnapshot.forEach(doc => {
                data.push({
                    id: doc.id,
                    title: doc.data().title,
                    desc: doc.data().short_info,
                    imgurl: doc.data().img_url,
                    date: doc.data().date.toDate().toLocaleDateString("en-US"),
                    publishdate: doc.data().publish_time.toDate().toLocaleString(),
                })
            })

            self.setState({
                eventData: data
            })
        })
    }

    pressEventcard(item){
        this.navigate('EventScreen',{item:item})
    }

    renderItem = (item) => {
        return(
            <TouchableOpacity style={styles.cardevent}
            onPress={() => this.pressEventcard(item)}>
                <FastImageBackground
                source={{uri: item.imgurl}}
                imageStyle={{borderRadius: 5}}
                resizeMode= 'cover'
                style={styles.backgroundImage}>
                 <View style={styles.containerlayerCategory} opacity={0.16}/>
                 <View  style={styles.bottomlayerCategory} opacity={0.6}/>
                 <View style={styles.bottomlayertextCategory} opacity={1}>
                        <Text style={styles.eventtitlee}>
                            {item.title}
                        </Text>
                        <Text style={styles.eventdate}>
                            On {item.date}
                        </Text>
                    </View>

                </FastImageBackground>
            </TouchableOpacity>
        )
    }
   
    render(){
    return(
        <View style={styles.container}>
            <FlatList
                style={{flex: 1}}
                data={this.state.eventData}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )}
}
const styles = StyleSheet.create({
      container:{
          flex: 1
    },
    cardevent: {
        // backgroundColor:'white',
        // padding: wp2dp('4%'),
        // marginVertical: hp2dp('1%'),
        marginTop: 8,
        marginBottom: 8,
        // marginHorizontal: wp2dp('2%'),
        width:wp2dp('98%'),
        height: 180,
        elevation:7,
        alignSelf: "center",
        // alignItems: 'center'
        // borderBottomWidth:0.8
        // borderWidth:0.8
        borderRadius:5
    },
    containerlayerCategory: {
        flex: 1,
        backgroundColor: AppColors.black,  
        // opacity: 0.29
    },
    bottomlayerCategory: {
        backgroundColor: AppColors.black,  
        // opacity: 15.00,
        width: "100%",
        height: 50,
        position: "absolute",
        bottom: 0
    },
    bottomlayertextCategory: {
        width: "100%",
        height: 50,
        position: "absolute",
        bottom: 0
    },
    eventtitlee: {
        color: AppColors.white,
        fontSize: 14,
        fontWeight: 'bold',
        // paddingStart: 6,
        alignSelf: "center",
        paddingTop: 3,
        paddingBottom: 3
    },
    eventdate: {
        color: AppColors.white,
        fontSize: 12,
        fontWeight: 'bold',
        // paddingStart: 6,
        alignSelf: "center",
        paddingTop: 0,
        paddingBottom: 3
    },
    CardImage: {
        width: wp2dp('98%'),
        height:hp2dp('35%'),
        // marginBottom:hp2dp('1%'),
        // marginTop:hp2dp('-2.3%'),

        // backgroundColor:'black',
        borderBottomTopRightRadius:5,
        borderTopLeftRadius:5
    },
    HView:{
        marginBottom: 12,
        marginEnd: 10,
        marginLeft: 6,
        marginTop: 3,
        // backgroundColor:'red',
        // alignItems: 'flex-end',
        alignItems:'flex-start'
    },
    TView22: {
        marginBottom: 12,
        marginEnd: 10,
        marginLeft: 6,
    },
    timestamp:{
        fontSize:16,
        color: AppColors.deepblue
    },
    backgroundImage: {
        flex: 1,
        // width: '100%', 
        // height: '100%',
        borderRadius: 5
    },
})
export default Tabsection5 