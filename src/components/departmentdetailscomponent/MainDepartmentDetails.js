// @ts-nocheck
/* eslint-disable */
import React,{ Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
ImageBackground, Image, Alert,TouchableOpacity,FlatList,SafeAreaView } from 'react-native';

import {
    widthPercentageToDP as wp2dp,
    heightPercentageToDP as hp2dp,
  } from 'react-native-responsive-screen';   

import firestore from '@react-native-firebase/firestore';
import { SliderBox } from "react-native-image-slider-box";
import Icon from 'react-native-vector-icons/FontAwesome5';

import { CommonActions } from '@react-navigation/native';

import AppColors from './../../lib/AppColors';
import backend from './../../backend/Backend';
import { ScrollView } from 'react-native-gesture-handler';

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
                <ScrollView style={{ flex:1, paddingBottom: 16, }}>
                    <View style={{ flex:1 }}>
                        {this._showImage()}
                        <View style={styles.headerCardView}>
                            <Text style={styles.heading}>
                                Name And Logo:
                            </Text>
                        </View>
                        <View style={styles.infoCardView}>
                            <View style={styles.infoCardinnermain}>
                                <Image
                                    resizeMode='cover'
                                    style={styles.cardImage}
                                    source={{uri: this.item.icon}}
                                    // source={{uri: 'https://www.w3schools.com/w3css/img_lights.jpg'}}
                                    />

                                <Text style={styles.cardTitle}>
                                    {this.item.name}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.headerCardView}>
                            <Text style={styles.heading}>
                                About Us:
                            </Text>
                        </View>
                        <View style={styles.infoCardView}>
                            {/* <View style={styles.infoCardinnermain}> */}
                                <Text style={styles.cardtxt}>
                                The philosophy of Ananda Marga is a synthetic outlook, recognizing a theistic singularity or 'Supreme Consciousness',[15] which is claimed to be both transcendental and manifested in all.
                                It covers both the spiritual and the social combining the two in a unique synthesis of universal vision.[note 13] To this end Ananda Marga suggests a practical, rational, and systematic way 
                                of life for the balanced development of all human potentialities: physical, psychic and spiritual. This system incorporate practices that range from hygiene and diet, yoga postures, to a scientific 
                                technique of meditation based on moral rules and directed to the inner fulfillment.
                                </Text>
                            {/* </View> */}
                        </View>
                        <View style={styles.headerCardView}>
                            <Text style={styles.heading}>
                                Vision & Mission:
                            </Text>
                        </View>
                        <View style={styles.infoCardView}>
                            {/* <View style={styles.infoCardinnermain}> */}
                                <Text style={styles.cardtxt}>
                                In the tantric tradition of Ananda Marga the spiritual aspirant 
                                (sadhaka) practices sadhana. Sadhana (a Sanskrit word) signifies the effort 
                                through which a person becomes completely realized. In Tantra the spiritual master, 
                                the guru,[note 2] plays a special role. The guru guides and leads students on the spiritual path. 
                                The aspirant learns meditation by a qualified acarya. An acarya is most commonly a monk or nun, 
                                but in the Ananda Marga tradition there are also "family acaryas". In the initiation the aspirant 
                                makes a commitment to practice meditation and to live in harmony with the universal balance, 
                                and is then taught the technique itself. The aspirant is then required to keep the individual 
                                lessons personal. In addition, he also taught Kapalika meditation to many sanyásins.
                                </Text>
                            {/* </View> */}
                        </View>
                        <View style={styles.headerCardView}>
                            <Text style={styles.heading}>
                                Principles:
                            </Text>
                        </View>
                        <View style={styles.infoCardView}>
                            {/* <View style={styles.infoCardinnermain}> */}
                                <Text style={styles.cardtxt}>
                                His system of yoga can be termed as Rájadhirája Yoga, Tantra Yoga, 
                                or simply Ánanda Márga Yoga. The basic Ánanda Márga meditation system is 
                                called Sahaja Yoga ('simple yoga'). The sahaja system consists of 6 meditation 
                                techniques or lessons taught one by one, on a personal basis
                                </Text>
                            {/* </View> */}
                        </View>
                        <View style={styles.headerCardView}>
                            <Text style={styles.heading}>
                                Background:
                            </Text>
                        </View>
                        <View style={styles.infoCardView}>
                            {/* <View style={styles.infoCardinnermain}> */}
                                <Text style={styles.cardtxt}>
                                During the 1960s, the organisation expanded rapidly in India, 
                                sending Acharyas as missionaries to other continents. Ananda Marga's 
                                popularity in India put it in direct confrontation with the Communist 
                                Party in West Bengal. In 1967, Ananda Marga headquarters came under 
                                attack by locals who were allegedly incited by Communist leaders.[3] 
                                Criticism of corruption in the Indian government by acharyas of Ananda 
                                Marga also put it in confrontation with Prime Minister Indira Gandhi. 
                                In 1971, Sarkar was imprisoned in India for the alleged murder of Ananda 
                                Marga members. In February 1973, Sarkar was poisoned in prison, allegedly 
                                by the jail doctor on orders from the higher echelons of government.
                                </Text>
                            {/* </View> */}
                        </View>
                        <View style={styles.headerCardView}>
                            <Text style={styles.heading}>
                                Services and Solutions:
                            </Text>
                        </View>
                        <View style={styles.infoCardView}>
                            {/* <View style={styles.infoCardinnermain}> */}
                                <Text style={styles.cardtxt}>
                                * Diet and fasting: Lacto-vegetarian diet of Ananda Marga avoids meat, fish, 
                                eggs and some substances which are 
                                claimed to have a negative effect on the mind, particularly if "mucus-producing."
                                {"\n"}{"\n"} * Yoga asanas, mudras and bandhas: comprises 42 asanas[note 6] which were chosen by Sarkar. 
                                There are mainly two types of asana: svasthyasanas and dhyanasanas.
                                {"\n"}{"\n"} * Yogic treatments: in 1957 Sarkar published in Bengali Yaogika Cikitsa 
                                o Dravyaguna, which was translated into English and published in 1983, with 
                                revisions under the title Yogic Treatments and Natural Remedies.
                                {"\n"}{"\n"} * Tandava or Tāṇḍava: is a vigorous dance.[note 10] The name tandava is derived 
                                from the Sanskrit word tandu, which means 'to jump'. This dance is only performed by male 
                                followers in Ananda Marga.
                                </Text>
                            {/* </View> */}
                        </View>
                        <View style={styles.headerCardView}>
                            <Text style={styles.heading}>
                            Articles and Research:
                            </Text>
                        </View>
                        <View style={styles.infoCardView}>
                            {/* <View style={styles.infoCardinnermain}> */}
                                <Text style={styles.cardtxt}>
                                The spiritual philosophy of Ananda Marga covers a vast range 
                                of topics and can be learned from P.R. Sarkar's publications. 
                                Ananda Marga philosophy recognizes that the universe is the creation 
                                of the mental thought waves of the 'Supreme consciousness'.  
                                </Text>
                            {/* </View> */}
                        </View>
                        <View style={styles.headerCardView}>
                            <Text style={styles.heading}>
                                Vision & Mission:
                            </Text>
                        </View>
                        <View style={styles.infoCardView}>
                            <View style={styles.infoCardinnermain2}>
                                <Image
                                    resizeMode='cover'
                                    style={styles.cardImage}
                                    source={{uri: 'https://crimsondawn.net/wp-content/uploads/2018/03/yogaclublogo.jpg'}}
                                    // source={{uri: 'https://www.w3schools.com/w3css/img_lights.jpg'}}
                                    />

                                <Text style={styles.cardTitle}>
                                    Old Project 1
                                </Text>
                            </View>
                            <View style={styles.infoCardinnermain2}>
                                <Image
                                    resizeMode='cover'
                                    style={styles.cardImage}
                                    source={{uri: 'https://sarkarverse.org/images/thumb/c/c7/Am_image.png/300px-Am_image.png'}}
                                    // source={{uri: 'https://www.w3schools.com/w3css/img_lights.jpg'}}
                                    />

                                <Text style={styles.cardTitle}>
                                    Old Project 2
                                </Text>
                            </View>
                            <View style={styles.infoCardinnermain2}>
                                <Image
                                    resizeMode='cover'
                                    style={styles.cardImage}
                                    source={{uri: 'https://www.edarabia.com/wp-content/uploads/2018/07/ananda-marga-river-school-queensland-australia.jpg'}}
                                    // source={{uri: 'https://www.w3schools.com/w3css/img_lights.jpg'}}
                                    />

                                <Text style={styles.cardTitle}>
                                    Old Project 3
                                </Text>
                            </View>
                        </View>
                        <View style={styles.headerCardView}>
                            <Text style={styles.heading}>
                            Live projects Details:
                            </Text>
                        </View>
                        <View style={styles.infoCardView}>
                            <View style={styles.infoCardinnermain2}>
                                <Image
                                    resizeMode='cover'
                                    style={styles.cardImage2}
                                    source={{uri: 'https://i.pinimg.com/236x/d9/89/12/d989120065475b965e940d83fee8eb7e.jpg'}}
                                    // source={{uri: 'https://www.w3schools.com/w3css/img_lights.jpg'}}
                                    />
                                 <Image
                                    resizeMode='cover'
                                    style={styles.cardImage2}
                                    source={{uri: 'https://c.yell.com/t_bigRect,f_auto/141c1b11-ba3d-4751-a2a0-e25026344c66_image_png.png'}}
                                    // source={{uri: 'https://www.w3schools.com/w3css/img_lights.jpg'}}
                                    />
                                 <Image
                                    resizeMode='cover'
                                    style={styles.cardImage2}
                                    source={{uri: 'https://i.pinimg.com/280x280_RS/be/24/26/be2426c896ab05a60f5bd6e5d0d3022b.jpg'}}
                                    // source={{uri: 'https://www.w3schools.com/w3css/img_lights.jpg'}}
                                    />
                            </View>
                            <Text style={styles.cardtxt}>
                            according to the Ananda Marga system "Education is for Liberation." 
                            Education means the simultaneous development in the physical, mental and spiritual 
                            realms of human existence. By this, dormant human potentialities will be awakened and 
                            put to proper use. Sarkar said that real education leads to a pervasive sense of love and 
                            compassion for all creation; in the Ananda Marga's education system, special emphasis is given 
                            to moral education and the inculcation of idealism together with a "psycho-pedagogical approach" 
                            and a blending of occidental extroversional science and oriental introversional philosophy.    
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: AppColors.lightWhite,
    },
    headerCardView: {
        paddingLeft: 8,
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection:'row',
        // backgroundColor:'blue',
        alignItems:'center'
    },
    heading: {
        fontSize:20,
        fontWeight: 'bold',
        color: AppColors.deepblue
    },
    infoCardView: {
        width: wp2dp('96%'),
        alignSelf: "center",
        justifyContent: 'center',
        padding: 8,
        marginVertical: 3,
        backgroundColor: AppColors.white,
        borderRadius: 5,
        elevation: 5,
        zIndex: 5
    },
    infoCardinnermain: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    infoCardinnermain2: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 2,
    },
    cardImage: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 5
    },
    cardImage2: {
        width: 60,
        height: 60,
        marginRight: 10,
        borderRadius: 5
    },
    cardTitle: {
        fontSize:20,
        // fontWeight: 'bold'
    },
    cardtxt: {
        fontSize:18,
    }
})
export default DepartmentDetails 