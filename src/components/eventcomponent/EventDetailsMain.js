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
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome';

const icon_location = (<Icon name="street-view" size={22} color={AppColors.deepblue} />)


export class EventMain extends Component{
    constructor(props){
        super(props)
        this.state = {
            eventOrganiser: "",
            eventPostedBy: "",
            eventStarttime: "",
            eventEndtime: "",
            eventVenue: "",
            eventVideo: "",
            eventFullDesc: "",
            eventShortDesc: "",
            eventOrganisericon: "",

            collapseDescription: true,
            collapseAboutWriter: true,

            currentTime: 0,
            duration: 0,
            isFullScreen: false,
            isLoading: true,
            paused: false,
            playerState: PLAYER_STATES.PLAYING,
            screenType: 'contain',
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
            firestore().collection('event_broadcast').doc(id).collection("details_events").doc("all_info").get()
            .then(documentSnapshot => {
                if(documentSnapshot.exists){
                    self.setState({
                        eventOrganiser: documentSnapshot.data().event_organizer,
                        eventPostedBy: documentSnapshot.data().event_posted_by,
                        eventStarttime: documentSnapshot.data().event_start_datetime.toDate().toLocaleDateString("en-US"),
                        eventEndtime: documentSnapshot.data().event_end_datetime.toDate().toLocaleDateString("en-US"),
                        eventVenue: documentSnapshot.data().event_venue,
                        eventVideo: documentSnapshot.data().event_video,
                        eventFullDesc: documentSnapshot.data().event_long_desc,
                        eventShortDesc: documentSnapshot.data().event_short_desc,
                        eventOrganisericon: documentSnapshot.data().event_organiser_icon,
                    })
                }
            })
        }
    }

    onSeek = seek => {
        //Handler for change in seekbar
        this.videoPlayer.seek(seek);
    };

    onPaused = playerState => {
        //Handler for Video Pause
            this.setState({
                paused: !this.state.paused,
                playerState,
            });
    };
    
    onReplay = () => {
        //Handler for Replay
        this.setState({ playerState: PLAYER_STATES.PLAYING });
        this.videoPlayer.seek(0);
    };
    
    onProgress = data => {
        const { isLoading, playerState } = this.state;
        // Video Player will continue progress even if the video already ended
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
            this.setState({ currentTime: data.currentTime });
        }
    };

    onLoad = data => this.setState({ duration: data.duration, isLoading: false });
      
    onLoadStart = data => this.setState({ isLoading: true });
    
    onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });
    
    onError = () => alert('Oh! ', error);
    
    exitFullScreen = () => {
      alert('Exit full screen');
    };
    
    enterFullScreen = () => {};
    
    onFullScreen = () => {
      if (this.state.screenType == 'content')
        this.setState({ screenType: 'cover' });
      else this.setState({ screenType: 'content' });
    };

    renderToolbar = () => (
        <View>
          <Text> toolbar </Text>
        </View>
      );

    onSeeking = currentTime => this.setState({ currentTime });

    loadVideo(){
        if(this.state.eventVideo !== ""){
            return(
                <View style={styles.videoplayer}>
                    <Video
                        onEnd={this.onEnd}
                        onLoad={this.onLoad}
                        onLoadStart={this.onLoadStart}
                        onProgress={this.onProgress}
                        paused={this.state.paused}
                        ref={videoPlayer => (this.videoPlayer = videoPlayer)}
                        resizeMode={this.state.screenType}
                        onFullScreen={this.state.isFullScreen}
                        source={{ uri: this.state.eventVideo}}
                        style={styles.mediaPlayer}
                        volume={10}
                        />
                    <MediaControls
                        duration={this.state.duration}
                        isLoading={this.state.isLoading}
                        mainColor="#333"
                        onFullScreen={this.onFullScreen}
                        onPaused={this.onPaused}
                        onReplay={this.onReplay}
                        onSeek={this.onSeek}
                        onSeeking={this.onSeeking}
                        playerState={this.state.playerState}
                        progress={this.state.currentTime}
                        toolbar={this.renderToolbar()}
                    />
                </View>
            );
        }
    }

    // pressDescription(){
    //     let val = this.state.collapseDescription;
    //     this.setState({
    //         collapseDescription: !val
    //     })
    // }

    // pressAboutWriter(){
    //     let val = this.state.collapseAboutWriter;
    //     this.setState({
    //         collapseAboutWriter: !val
    //     })
    // }

    _showDescription(){
        return(
            <View>
                 {/* <TouchableOpacity style={styles.headerCardView1}
                 onPress={() => this.pressDescription()}>
                     <Text style={styles.heading}>
                         About event:
                     </Text>
                     <View>
                         {
                         (!this.state.collapseDescription)?
                         <Image source={require('./../../lib/up.png')}/>:
                         <Image source={require('./../../lib/down.png')}/>
                         }
                     </View>
                 </TouchableOpacity> */}
                 {/* <Collapsible collapsed={this.state.pressDescription}> */}
                     <View style={styles.infoView}>
                         {/* <View style={styles.infoCardinnermain}> */}
                             <Text style={styles.cardtxt}>
                                {(this.state.eventFullDesc === "") ? "No Info": (this.state.eventFullDesc)}
                             </Text>
                         {/* </View> */}
                     </View>
                 {/* </Collapsible> */}
            </View>
         )
    }

    // _showAboutWriter(){
    //     return(
    //         <View>
    //              <TouchableOpacity style={styles.headerCardView1}
    //              onPress={() => this.pressAboutWriter()}>
    //                  <Text style={styles.heading}>
    //                      About Author:
    //                  </Text>
    //                  <View>
    //                      {
    //                      (!this.state.collapseAboutWriter)?
    //                      <Image source={require('./../../lib/up.png')}/>:
    //                      <Image source={require('./../../lib/down.png')}/>
    //                      }
    //                  </View>
    //              </TouchableOpacity>
    //              <Collapsible collapsed={this.state.collapseAboutWriter}>
    //                  <View style={styles.infoView}>
    //                      {/* <View style={styles.infoCardinnermain}> */}
    //                          <Text style={styles.cardtxt}>
    //                             {(this.state.aboutWriter === "") ? "No Info": (this.state.aboutWriter)}
    //                          </Text>
    //                      {/* </View> */}
    //                  </View>
    //              </Collapsible>
    //         </View>
    //      )
    // }

    _showVenue(){
        return(
            <View style={styles.locationview}>
                <View style={styles.icon}>
                    {icon_location}
                </View>
                <Text style={styles.locationtxt}>
                    {this.state.eventVenue}
                </Text>
            </View>
        )
    }

    _showOrganiser(){
        if(this.state.eventOrganisericon !== ""){
            return(
                <View style={styles.organiserView}>
                    <Text style={styles.locationtxt}>
                        Organised By ~
                    </Text>
                    <Image
                    resizeMode='cover'
                    style={styles.deptimage}
                    source={{uri: this.state.eventOrganisericon}}
                    // source={{uri: 'https://www.w3schools.com/w3css/img_lights.jpg'}}
                    />
                    <Text style={styles.locationtxt}>
                        {this.state.eventOrganiser}
                    </Text>
                </View>
            )
        }
    }

    _showDaterange(){
        return(
            <View style={styles.dateRangeview}>
                 <Text style={styles.locationtxt}>
                    Duration ~ {this.state.eventStarttime} --- {this.state.eventEndtime}
                </Text>
            </View>
        )
    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                {this.loadVideo()}
                <ScrollView style={{flex: 1}}>
                    <View style={styles.scrollmain}>
                        {this._showVenue()}
                        {this._showDaterange()}
                        {this._showOrganiser()}
                        {this._showDescription()}
                        {/* {this._showAboutWriter()} */}
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
    videoplayer: {
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
        paddingTop: 10,
        paddingBottom: 5,
        marginTop: 16,
    },
    cardtxt: {
        fontSize:16,
    },
    mediaPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'white',
      },
      locationview: {
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          paddingVertical: 4,
          marginBottom: 2,
      },
     icon: {
        marginLeft: 16,
        marginRight: 5,
      },
      locationtxt: {
          fontSize: 20,
          color: AppColors.deepblue,
          fontWeight: "bold"
      },
      dateRangeview: {
        marginTop: 2,
        // flexDirection: "row",
        justifyContent: "flex-start",
        // alignItems: "flex-start",
        paddingVertical: 4,
        marginBottom: 6,
        marginLeft: 16,
      },
      deptimage: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: AppColors.lightgrey,
        marginRight: 8,
        marginLeft: 8
      },
      organiserView: {
        marginTop: 2,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingVertical: 4,
        marginBottom: 6,
        marginLeft: 16,
      }
})

export default EventMain