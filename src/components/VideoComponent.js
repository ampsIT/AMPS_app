// @ts-nocheck
/* eslint-disable */
import React,{ Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
ImageBackground, Image, Alert,TouchableOpacity,FlatList,SafeAreaView } from 'react-native' 
import {
    widthPercentageToDP as wp2dp,
    heightPercentageToDP as hp2dp,
  } from 'react-native-responsive-screen';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';


export class VideoComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
          currentTime: 0,
          duration: 0,
          isFullScreen: false,
          isLoading: true,
          paused: false,
          playerState: PLAYER_STATES.PLAYING,
          screenType: 'contain',
          video_url: "" 
        };
        this.items = this.props.items
      }

      componentDidMount(){
        // Alert.alert("video: ", this.items.title)
        this.loadVideoData();
      }

      loadVideoData(){
        let self = this;
        let id = this.items.id;
        if(id){
          firestore().collection('publish_video').doc(id).collection("video_details").doc("all_info").get()
          .then(documentSnapshot => {
            if(documentSnapshot.exists){
              let urlVideo = documentSnapshot.data().url_video;
              if(urlVideo){
                self.setState({
                  video_url: urlVideo
                })
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

  _loadVideoDetails(){
    if(this.state.video_url !== ""){
      console.log("url: ", this.state.video_url)
      return(
        <View style={{ flex: 1}}>
            <Video
              onEnd={this.onEnd}
              onLoad={this.onLoad}
              onLoadStart={this.onLoadStart}
              onProgress={this.onProgress}
              paused={this.state.paused}
              ref={videoPlayer => (this.videoPlayer = videoPlayer)}
              resizeMode={this.state.screenType}
              onFullScreen={this.state.isFullScreen}
              source={{ uri: this.state.video_url}}
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
       <View style={styles.container}>
       {this._loadVideoDetails()}
           {/* <Video
          onEnd={this.onEnd}
          onLoad={this.onLoad}
          onLoadStart={this.onLoadStart}
          onProgress={this.onProgress}
          paused={this.state.paused}
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          resizeMode={this.state.screenType}
          onFullScreen={this.state.isFullScreen}
          source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' }}
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
        /> */}
           </View>
   )}
}
const styles = StyleSheet.create({
      container:{ 
        //   flex:1
        height:wp2dp('60%')
          
        },
        toolbar: {
            marginTop: 30,
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 5,
          },
          mediaPlayer: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: 'white',
          },
})  

export default VideoComponent