// @ts-nocheck
/* eslint-disable */
import React,{ Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
ImageBackground, Image, Alert,TouchableOpacity,FlatList,SafeAreaView } from 'react-native' 
import HomeToolbar from './../components/homecomponents/toolbar/ToolBarHome';
import { CommonActions } from '@react-navigation/native';
import {VideoComponent} from '../components/VideoComponent'
import {
    widthPercentageToDP as wp2dp,
    heightPercentageToDP as hp2dp,
  } from 'react-native-responsive-screen';   
  import firestore from '@react-native-firebase/firestore';

  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

export class VideoDetails extends Component{
    constructor(props){
        super(props)
        this.state={
          views:this.props.route.params.item.total_views,
          id:this.props.route.params.item.id
        }
    }

    componentDidMount(){
      this.incrementViewCount()
    }

    incrementViewCount= async ()=>{
      const batch = firestore().batch();
      var vRef = firestore().collection('publish_video').doc(this.state.id)
      batch.update(vRef, {total_views: this.state.views+1});
      await batch.commit().then((res)=>{
        console.log('View count in incremented',res)
        this.setState({views:this.state.views+1})
      })
      .catch(e=>console.log(e));
    }
    formatDate=(date)=>{
      // const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
      // const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(date ) 
      // return(`${day}-${month}-${year}`)
      // console.log(typeof date)
      console.log(date.toLocaleString())
      console.log(date.toLocaleDateString('en-US', options))

    }
   render(){
   return(
       <SafeAreaView style={styles.container}>
           <HomeToolbar 
            navigation={this.props.navigation}
            title={this.props.route.params.item.title}
            showDrawer={false}
            onIconPress={()=>{this.props.navigation.dispatch(CommonActions.goBack());
            }}
           />
           {/* <Text>
           {this.props.route.params.item.title}
           </Text> */}
           <VideoComponent
             items = {this.props.route.params.item}
           />
           <View style={styles.detailsContainer}>
                <View style={styles.headingContainer}>
                    <Text style={styles.titleText}>
                      {this.props.route.params.item.title}
                    </Text>
                </View>
                <View>
                    <Text>
                    {/* {this.props.route.params.item.total_views} Views */}
                    {this.state.views} Views
                    </Text>
                </View>
                

                <View style={styles.contentContianer}> 
                <View>
                  <Text>
                    Published on {this.props.route.params.item.publishing_date.toDate().toLocaleDateString('en-US', options)}
                    {/* Published on {this.props.route.params.item.publishing_date.toDate().toLocaleString('en-US')} */}
                    {/* Published on {this.formatDate(this.props.route.params.item.publishing_date.toDate())} */}

                    {/* Published on {this.props.route.params.item.publishing_date.toDate().toDateString()} */}

                  </Text>
                </View>

                <View>
                <Text style={styles.content}>
                    {this.props.route.params.item.description}
                    </Text>
                </View>
                    
                </View>
           </View>
           </SafeAreaView>
   )}
}
const styles = StyleSheet.create({
      container:{
          flex:1
      },
      detailsContainer:{
        paddingTop:hp2dp('2%'),
        paddingLeft:wp2dp('4%')
      },
      headingContainer:{

      },
      titleText:{
        fontSize: 20,
      },
      content:{
        fontSize: 16,
      },
      contentContianer:{
        marginTop:hp2dp('2%')
      }


})

export default VideoDetails