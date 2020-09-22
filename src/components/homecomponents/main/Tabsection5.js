// @ts-nocheck
/* eslint-disable */
import React,{ Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput, Dimensions,
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
import FastImage from 'react-native-fast-image';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

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
                    place: doc.data().place,
                    link_url: doc.data().link_url
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

    // renderItem(item){
    //     console.log("item: ", item)
    //     return(
    //         <TouchableOpacity style={styles.cardevent}
    //         onPress={() => this.pressEventcard(item)}>
    //             <FastImageBackground
    //             source={{uri: item.imgurl}}
    //             imageStyle={{borderRadius: 5}}
    //             resizeMode= 'cover'
    //             style={styles.backgroundImage}>
    //              <View style={styles.containerlayerCategory} opacity={0.16}/>
    //              <View  style={styles.bottomlayerCategory} opacity={0.6}/>
    //              <View style={styles.bottomlayertextCategory} opacity={1}>
    //                     <Text style={styles.eventtitlee}>
    //                         {item.title}
    //                     </Text>
    //                     <Text style={styles.eventdate}>
    //                         On {item.date}
    //                     </Text>
    //                 </View>

    //             </FastImageBackground>
    //         </TouchableOpacity>
    //     )
    // }

    renderItem(item){
        return(
            // <View style={styles.cardeventnew}>
            //     <TouchableOpacity style={{ flex: 1}}
                <TouchableOpacity style={styles.cardeventnew}
                onPress={() => this.pressEventcard(item)}>
                    <Text style={styles.titletxt}>
                        {item.title}
                    </Text>
                    <FastImage 
                        style={styles.imageevent}
                        source={{
                            uri: item.imgurl
                        }}
                        resizeMode= 'cover'
                    />
                    <View style={styles.dateplaceview}>
                        <Text style={styles.dateplacetxt}>
                            On {item.date}
                        </Text>
                        <Text style={styles.dateplacetxt}>
                            At {item.place}
                        </Text>
                    </View>
                    <Text style={styles.linktxt}>
                        {item.link_url}
                    </Text>
                </TouchableOpacity>
            // </View>
        )
    }
   
    render(){
    return(
        <View style={styles.container}>
            <FlatList
                style={{flex: 1}}
                data={this.state.eventData}
                renderItem={(item) => {
                    return(
                        this.renderItem(item.item)
                    )
                }}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )}
}
const styles = StyleSheet.create({
      container:{
          flex: 1,
          backgroundColor: AppColors.lightWhite
    },
    cardevent: {
        // backgroundColor:'white',
        // padding: wp2dp('4%'),
        // marginVertical: hp2dp('1%'),
        marginTop: 8,
        marginBottom: 8,
        // marginHorizontal: wp2dp('2%'),
        width: width*0.98,
        // height: 300,
        elevation:7,
        alignSelf: "center",
        // alignItems: 'center'
        // borderBottomWidth:0.8
        // borderWidth:0.8
        borderRadius:12
    },
    cardeventnew: {
        width: wp2dp('98%'),
        alignSelf: "center",
        justifyContent: "center",
        elevation: 0.5,
        zIndex: 0.5,
        borderRadius: 2,
        marginVertical: 8,
    },
    titletxt: {
        fontSize: 20,
        color: AppColors.black,
        paddingVertical: 4,
        marginTop: 16,
        marginBottom: 4,
        marginLeft: 8,
        fontFamily: "bold"
    },
    imageevent: {
        width: wp2dp('98%'),
        height: 200,
        marginTop: 4,
        marginBottom: 4,
    },
    dateplaceview: {
        flexDirection: 'row',
        marginHorizontal: 8,
        marginVertical: 4,
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
    dateplacetxt: {
        color: AppColors.black,
        fontSize: 14
    },
    linktxt: {
        color: AppColors.deepblue,
        fontSize: 16,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: AppColors.deepblue,
        marginTop: 4,
        marginHorizontal: 8,
        marginBottom: 10,
        paddingVertical: 4
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
        height: 60,
        position: "absolute",
        bottom: 0
    },
    bottomlayertextCategory: {
        width: "100%",
        height: 60,
        position: "absolute",
        bottom: 0
    },
    eventtitlee: {
        color: AppColors.white,
        fontSize: 18,
        fontWeight: 'bold',
        // paddingStart: 6,
        alignSelf: "center",
        paddingTop: 3,
        paddingBottom: 3
    },
    eventdate: {
        color: AppColors.white,
        fontSize: 16,
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
        borderTopRightRadius:5,
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