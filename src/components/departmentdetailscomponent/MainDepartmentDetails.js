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
import Collapsible from 'react-native-collapsible';

export class DepartmentDetails extends Component{
    constructor(props){
       super(props)
        this.state = {
            allImgUrl: [],
            background: "",
            about_us: "",
            vision_mision: "",
            principles: "",
            service_sol: "",
            articles: "",
            oldProjects: [],
            liveProjects: [],

            collapseAboutUs: true,
            collapseVisionMision: true,
            collapsePrinciples: true,
            collapseBackground: true,
            collapseServiceSol: true,
            collapseArticlesreserch: true,
            collapseOldProjects: true,
            collapseLiveProjects: true
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
                let background = docsnap.data().background;
                let about_us = docsnap.data().aboutus;
                let vision_mision = docsnap.data().vission_mission;
                let principles = docsnap.data().principles;
                let service_sol = docsnap.data().services;
                let articles = docsnap.data().articles;
                let oldProjects = docsnap.data().old_projects_all;
                let newProjects = docsnap.data().live_projects_all;
                // console.log("old_p: ", oldProjects)
                // console.log("live_p: ", newProjects)
                if(img_url){
                    self.setState({
                        allImgUrl: img_url,
                        background: background,
                        about_us: about_us,
                        vision_mision: vision_mision,
                        principles: principles,
                        service_sol: service_sol,
                        articles: articles,
                        oldProjects: oldProjects,
                        liveProjects: newProjects
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

    pressAboutUs(){
        let val = this.state.collapseAboutUs;
        this.setState({
            collapseAboutUs: !val
        })
    }

    pressVisionMision(){
        let val = this.state.collapseVisionMision;
        this.setState({
            collapseVisionMision: !val
        })
    }

    pressPrinciples(){
        let val = this.state.collapsePrinciples;
        this.setState({
            collapsePrinciples: !val
        })
    }

    pressBackground(){
        let val = this.state.collapseBackground;
        this.setState({
            collapseBackground: !val
        })
    }

    pressServiceSol(){
        let val = this.state.collapseServiceSol;
        this.setState({
            collapseServiceSol: !val
        })
    }

    pressArticlesReserch(){
        let val = this.state.collapseArticlesreserch;
        this.setState({
            collapseArticlesreserch: !val
        })
    }

    pressOldProjects(){
        let val = this.state.collapseOldProjects;
        this.setState({
            collapseOldProjects: !val
        })
    }

    pressLiveProjects(){
        let val = this.state.collapseLiveProjects;
        this.setState({
            collapseLiveProjects: !val
        })
    }

    _showAboutUs(){
        return(
           <View>
                <TouchableOpacity style={styles.headerCardView1}
                onPress={() => this.pressAboutUs()}>
                    <Text style={styles.heading}>
                        About Us:
                    </Text>
                    <View>
                        {
                        (!this.state.collapseAboutUs)?
                        <Icon name="arrow-up" color={AppColors.grey} size={20} />
                        :
                        <Icon name="arrow-down" color={AppColors.grey} size={20} />

                        // <Image source={require('./../../lib/up.png')}/>:
                        // <Image source={require('./../../lib/down.png')}/>
                        }
                    </View>
                </TouchableOpacity>
                <Collapsible collapsed={this.state.collapseAboutUs}>
                    <View style={styles.infoView}>
                        {/* <View style={styles.infoCardinnermain}> */}
                            <Text style={styles.cardtxt}>
                                {this.state.about_us}
                            </Text>
                        {/* </View> */}
                    </View>
                </Collapsible>
           </View>
        )
    }

    _showVisionMision(){
        return(
            <View>
                 <TouchableOpacity style={styles.headerCardView1}
                 onPress={() => this.pressVisionMision()}>
                     <Text style={styles.heading}>
                     Vision & Mission:
                     </Text>
                     <View>
                         {
                         (!this.state.collapseVisionMision)?
                        <Icon name="arrow-up" color={AppColors.grey} size={20} />
                        :
                        <Icon name="arrow-down" color={AppColors.grey} size={20} />

                        // <Image source={require('./../../lib/up.png')}/>:
                        // <Image source={require('./../../lib/down.png')}/>
                         }
                     </View>
                 </TouchableOpacity>
                 <Collapsible collapsed={this.state.collapseVisionMision}>
                     <View style={styles.infoView}>
                         {/* <View style={styles.infoCardinnermain}> */}
                             <Text style={styles.cardtxt}>
                                {this.state.vision_mision}
                             </Text>
                         {/* </View> */}
                     </View>
                 </Collapsible>
            </View>
         )
    }

    _showPrinciples(){
        return(
            <View>
                 <TouchableOpacity style={styles.headerCardView1}
                 onPress={() => this.pressPrinciples()}>
                     <Text style={styles.heading}>
                     Principles:
                     </Text>
                     <View>
                         {
                         (!this.state.collapsePrinciples)?
                        <Icon name="arrow-up" color={AppColors.grey} size={20} />
                        :
                        <Icon name="arrow-down" color={AppColors.grey} size={20} />

                        // <Image source={require('./../../lib/up.png')}/>:
                        // <Image source={require('./../../lib/down.png')}/>
                         }
                     </View>
                 </TouchableOpacity>
                 <Collapsible collapsed={this.state.collapsePrinciples}>
                     <View style={styles.infoView}>
                         {/* <View style={styles.infoCardinnermain}> */}
                             <Text style={styles.cardtxt}>
                               {this.state.principles}
                             </Text>
                         {/* </View> */}
                     </View>
                 </Collapsible>
            </View>
         )
    }

    _showBackground(){
        return(
            <View>
                 <TouchableOpacity style={styles.headerCardView1}
                 onPress={() => this.pressBackground()}>
                     <Text style={styles.heading}>
                     Background:
                     </Text>
                     <View>
                         {
                         (!this.state.collapseBackground)?
                        <Icon name="arrow-up" color={AppColors.grey} size={20} />
                        :
                        <Icon name="arrow-down" color={AppColors.grey} size={20} />

                        // <Image source={require('./../../lib/up.png')}/>:
                        // <Image source={require('./../../lib/down.png')}/>
                         }
                     </View>
                 </TouchableOpacity>
                 <Collapsible collapsed={this.state.collapseBackground}>
                     <View style={styles.infoView}>
                         {/* <View style={styles.infoCardinnermain}> */}
                             <Text style={styles.cardtxt}>
                               {this.state.background}
                             </Text>
                         {/* </View> */}
                     </View>
                 </Collapsible>
            </View>
         )
    }

    _showServiceAndSolution(){
        return(
            <View>
                 <TouchableOpacity style={styles.headerCardView1}
                 onPress={() => this.pressServiceSol()}>
                     <Text style={styles.heading}>
                     Services and Solutions:
                     </Text>
                     <View>
                         {
                         (!this.state.collapseServiceSol)?
                        <Icon name="arrow-up" color={AppColors.grey} size={20} />
                        :
                        <Icon name="arrow-down" color={AppColors.grey} size={20} />

                        // <Image source={require('./../../lib/up.png')}/>:
                        // <Image source={require('./../../lib/down.png')}/>
                         }
                     </View>
                 </TouchableOpacity>
                 <Collapsible collapsed={this.state.collapseServiceSol}>
                     <View style={styles.infoView}>
                         {/* <View style={styles.infoCardinnermain}> */}
                             <Text style={styles.cardtxt}>
                               {this.state.service_sol}
                             </Text>
                         {/* </View> */}
                     </View>
                 </Collapsible>
            </View>
         )
    }

    _showArticlesReserch(){
        return(
            <View>
                 <TouchableOpacity style={styles.headerCardView1}
                 onPress={() => this.pressArticlesReserch()}>
                     <Text style={styles.heading}>
                     Articles and Research:
                     </Text>
                     <View>
                         {
                         (!this.state.collapseArticlesreserch)?
                        <Icon name="arrow-up" color={AppColors.grey} size={20} />
                        :
                        <Icon name="arrow-down" color={AppColors.grey} size={20} />

                        // <Image source={require('./../../lib/up.png')}/>:
                        // <Image source={require('./../../lib/down.png')}/>
                         }
                     </View>
                 </TouchableOpacity>
                 <Collapsible collapsed={this.state.collapseArticlesreserch}>
                     <View style={styles.infoView}>
                         {/* <View style={styles.infoCardinnermain}> */}
                             <Text style={styles.cardtxt}>
                               {this.state.articles}
                             </Text>
                         {/* </View> */}
                     </View>
                 </Collapsible>
            </View>
         )
    }

    renderOldProjectItem(item){
        // console.log("itemval: ", item.old_project_title)
        return(
            <View style={styles.infoCardinnermain2}>
                <Image
                    resizeMode='cover'
                    style={styles.cardImage}
                    source={{uri: item.old_project_image}}
                    // source={{uri: 'https://www.w3schools.com/w3css/img_lights.jpg'}}
                    />

                <Text style={styles.cardTitle}>
                    {item.old_project_title}
                </Text>
            </View>
        )
    }

    _showOldProjects(){
        return(
            <View>
                 <TouchableOpacity style={styles.headerCardView1}
                 onPress={() => this.pressOldProjects()}>
                     <Text style={styles.heading}>
                     Old Projects:
                     </Text>
                     <View>
                         {
                         (!this.state.collapseOldProjects)?
                        <Icon name="arrow-up" color={AppColors.grey} size={20} />
                        :
                        <Icon name="arrow-down" color={AppColors.grey} size={20} />

                        // <Image source={require('./../../lib/up.png')}/>:
                        // <Image source={require('./../../lib/down.png')}/>
                         }
                     </View>
                 </TouchableOpacity>
                 <Collapsible collapsed={this.state.collapseOldProjects}>
                    <View style={styles.infoView1}>
                         <FlatList 
                            style={{flex: 1}}
                            data={this.state.oldProjects}
                            horizontal={true}
                            renderItem={(item) => {
                                return(
                                    this.renderOldProjectItem(item.item)
                                )
                            }}
                            keyExtractor={item => item.old_project_title}
                            showsHorizontalScrollIndicator={false}
                         />
                    </View>
                 </Collapsible>
            </View>
         )
    }

    renderLiveProjectItem(item){
        return(
            <View style={styles.infoCardinnermain2}>
                <Image
                    resizeMode='cover'
                    style={styles.cardImage}
                    source={{uri: item.new_project_image}}
                    // source={{uri: 'https://www.w3schools.com/w3css/img_lights.jpg'}}
                    />

                <Text style={styles.cardTitle}>
                    {item.new_project_title}
                </Text>
            </View>
        )
    }

    _showLiveProjects(){
        return(
            <View>
                 <TouchableOpacity style={styles.headerCardView1}
                 onPress={() => this.pressLiveProjects()}>
                     <Text style={styles.heading}>
                     Live projects Details:
                     </Text>
                     <View>
                         {
                         (!this.state.collapseLiveProjects)?
                        <Icon name="arrow-up" color={AppColors.grey} size={20} />
                        :
                        <Icon name="arrow-down" color={AppColors.grey} size={20} />

                        // <Image source={require('./../../lib/up.png')}/>:
                        // <Image source={require('./../../lib/down.png')}/>
                         }
                     </View>
                 </TouchableOpacity>
                 <Collapsible collapsed={this.state.collapseLiveProjects}>
                    <View style={styles.infoView1}>
                         <FlatList 
                            style={{flex: 1}}
                            data={this.state.liveProjects}
                            horizontal={true}
                            renderItem={(item) => {
                                return(
                                    this.renderLiveProjectItem(item.item)
                                )
                            }}
                            keyExtractor={item => item.new_project_title}
                            showsHorizontalScrollIndicator={false}
                         />
                    </View>
                 </Collapsible>
            </View>
         )
    }
   
    render(){
        return(
            <View style={styles.container}>
                <ScrollView style={{ flex:1, }}>
                    <View style={{ flex:1, paddingBottom: 16 }}>
                        {this._showImage()}
                        {this._showAboutUs()}
                        {this._showVisionMision()}
                        {this._showPrinciples()}
                        {this._showBackground()}
                        {this._showServiceAndSolution()}
                        {this._showArticlesReserch()}
                        {this._showOldProjects()}
                        {this._showLiveProjects()}
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
        // paddingBottom: 16
    },
    headerCardView: {
        paddingLeft: 10,
        paddingTop: 6,
        paddingRight: 16,
        paddingBottom: 6,
        flexDirection:'row',
        // backgroundColor:'blue',
        alignItems:'center',
        justifyContent: 'space-between',
        marginVertical: 4,
        backgroundColor: AppColors.white
    },
    headerCardView1: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between',
        marginTop: 20,
        marginHorizontal: 12,
        backgroundColor: AppColors.white,
        borderRadius: 4,
        elevation: 1
    },
    heading: {
        fontSize: 16,
        // fontWeight: 'bold',
        color: AppColors.greymid
    },
    infoCardView: {
        width: wp2dp('96%'),
        alignSelf: "center",
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 24,
        // marginVertical: 3,
        backgroundColor: AppColors.white,
        borderRadius: 5,
        elevation: 5,
        zIndex: 5
    },
    infoView: {
        paddingHorizontal: 22,
        paddingVertical: 2,
        // height: 120
    },
    infoView1: {
        // paddingHorizontal: 24,
        paddingVertical: 4,
        height: 120
    },
    infoCardinnermain: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    infoCardinnermain2: {
        // flex: 1,
        // flexDirection: "row",
        alignItems: "center",
        marginVertical: 2,
        marginHorizontal: 8,
        height: 110,
        width: 190,
        backgroundColor: AppColors.white,
        elevation: 9,
        zIndex: 9,
        borderRadius: 7
    },
    cardImage: {
        width: 55,
        height: 55,
        marginBottom: 5,
        marginTop: 10,
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
        fontSize: 16,
        color: AppColors.greymid
    }
})
export default DepartmentDetails 