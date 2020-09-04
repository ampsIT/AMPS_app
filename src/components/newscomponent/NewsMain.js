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

import { material } from 'react-native-typography'

import AppColors from './../../lib/AppColors';
import backend from './../../backend/Backend';

import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import { SliderBox } from "react-native-image-slider-box";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';

export class NewsMain extends Component{
    constructor(props){
        super(props)
        this.state = {
            itemTitle: "",
            itemDesc: "",
            itemShowType: "",
            itemVudeoUrl: "",
            itemImgUrl: [],

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
        this.loadNewsDetails();
    }

    loadNewsDetails(){
        let self = this;
        let id = this.item.id;
        if(id){
          firestore().collection('broadcast_news').doc(id).collection("details_news").doc("all_info").get()
          .then(documentSnapshot => {
            if(documentSnapshot.exists){
             var showtype = documentSnapshot.data().showtype;
             var title = documentSnapshot.data().news_details_title;
             var desc = documentSnapshot.data().news_full_description;
             if(showtype){
                 if(showtype === "image"){
                     if(documentSnapshot.data().img_url_all){
                        self.setState({
                            itemTitle: title,
                            itemDesc: desc,
                            itemShowType: showtype,
                            itemImgUrl: documentSnapshot.data().img_url_all
                        })
                     }
                 }
                 else if(showtype === "video"){
                    if(documentSnapshot.data().video_url){
                        self.setState({
                            itemTitle: title,
                            itemDesc: desc,
                            itemShowType: showtype,
                            itemVudeoUrl: documentSnapshot.data().video_url
                        })
                     }
                 }
             }
            }
          });
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

    _loadMedia(){
        if(this.state.itemShowType === "image" && this.state.itemImgUrl.length > 0){
            return(
                <View style={styles.imgplayer}>
                     <SliderBox 
                        images={this.state.itemImgUrl}
                        sliderBoxHeight={200}
                    />
                </View>
            );
        }
        else if(this.state.itemShowType === "video" && this.state.itemVudeoUrl !== ""){
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
                        source={{ uri: this.state.itemVudeoUrl}}
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
            )
        }
    }
    
    render(){
        return(
            <SafeAreaView style={styles.container}>
                {this._loadMedia()}
                <ScrollView style={{flex: 1}}>
                    <View style={styles.scrollmain}>
                        <View style={styles.txtmainView}>
                            <Text 
                            // style={styles.title}
                            style={material.headline}
                            >
                               {this.state.itemTitle}
                            </Text>
                        </View>
                        <View
                            style={styles.timestampview}
                            >
                            <Text style={styles.timestamp}>
                                {this.item.timestamp.toDate().toLocaleString()}
                            </Text>
                        </View>
                        <View
                            style={styles.contentview}
                            >
                            <Text style={styles.content}>
                                {this.state.itemDesc}
                            </Text>
                        </View>
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
    mediaPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'white',
      },
    imgplayer: {
        height: 200,
        width: "100%"
    },
    scrollmain: {
        flex: 1,
        paddingBottom: 10,
    },
    txtmainView: {
        marginBottom: 3,
        marginEnd: 6,
        marginLeft: 6,
        marginTop: 12,
        // backgroundColor:'red',
        // alignItems: 'flex-end',
        alignItems:'flex-start'
    },
    timestampview: {
        marginBottom: 3,
        marginEnd: 6,
        marginLeft: 6,
        marginTop: 3,
    },
    timestamp: {
        fontSize: 12,
        color: AppColors.semiblack
    },
    contentview: {
        marginBottom: 3,
        marginEnd: 6,
        marginLeft: 6,
        marginTop: 6,
    },
    content: {
        fontSize: 16,
        color: AppColors.semiblack
    }
})

export default NewsMain