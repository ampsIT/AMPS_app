// @ts-nocheck
/* eslint-disable */
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,Dimensions,
    ImageBackground, Alert,TouchableOpacity,SafeAreaView, StatusBar, FlatList,Image, ScrollView} from 'react-native';
import { material } from 'react-native-typography'

    import firestore from '@react-native-firebase/firestore';
    import {
      widthPercentageToDP as wp2dp,
      heightPercentageToDP as hp2dp,
    } from 'react-native-responsive-screen';   

    const Item = ({postTitle,content,image,timestamp}) => (
            <View style={styles.item}>
              <View
               style={styles.IView}
              >
                <Image
                resizeMode='cover'
                style={styles.CardImage}
                // source={{uri: image}}
                source={{uri: 'https://www.w3schools.com/w3css/img_lights.jpg'}}
                />
                </View>
              <View style={styles.contentContianer}>
              <View
              style={styles.HView}
              >
                <Text 
                // style={styles.title}
                style={material.headline}
                >
                  {postTitle}
                  {/* THIS IS THE LONG HEADING */}
                </Text>
              </View>
              <View
              style={styles.TView}
              >
                <Text style={styles.timestamp}>
                  {timestamp}
                </Text>
              </View>

              

              <View
              style={styles.CView}
              >
                <Text style={styles.paragraph}>
                  {content}
                  {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  */}
                </Text>
              </View>
              </View>
              
            </View>
          );
     
    export default class TabSection1 extends Component {
        constructor(props){
            super(props)
            this.state = {Newlist:[],
                          // Hlist:[]
                          }
        }
        componentDidMount(){

          this.getNews()
          
          
          
        }
        getNews=()=>{
          firestore()
          .collection('news')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              this.setState({Newlist:[...this.state.Newlist,documentSnapshot.data()]})
            });
          });

        }
        

        render() {
            const renderItem = ({ item }) => (
                <Item 
                postTitle={item.postTitle} 
                content={item.content}
                image={item.images}
                timestamp={item.timestamp.toDate().toLocaleString()}
                />
              );
            
            return (
                <SafeAreaView style={styles.container}>
                
                <FlatList
                  data={this.state.Newlist}
                  renderItem={renderItem}
                  keyExtractor={item => item.postId}
                  showsVerticalScrollIndicator={false}
                />
                

              </SafeAreaView>
            )
        }    
    }    

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          // marginTop: StatusBar.currentHeight || 0,
          // marginTop: HW'',
          // marginTop:hp2dp('0.5%')
          // alignItems: 'center'
        },
        item: {
          backgroundColor:'white',
          // padding: wp2dp('4%'),
          // marginVertical: hp2dp('1%'),
          marginTop:hp2dp('1%'),
          marginBottom:hp2dp('0.5%'),
          marginHorizontal: wp2dp('1%'),
          width:wp2dp('98%'),
          elevation:1,
          // alignItems: 'center'
          // borderBottomWidth:0.8
          // borderWidth:0.8

          borderRadius:5
        },
        title: {
          fontSize: 24,
          fontWeight:'600'
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
        paragraph: {
          fontSize: 14,
          lineHeight: 20,
        },
        timestamp:{
          fontSize:12,
          color:'grey'
        },
        IView:{
          // alignItems: 'center',
          // borderBottomWidth:1,
          // backgroundColor:'black',
          // width:wp2dp('100%'),
          borderBottomWidth:1,
          borderColor:'rgba(128,128,128,0.2)'
        },
        HView:{
          marginTop:hp2dp('-0.5%'),
          // backgroundColor:'red',
          // alignItems: 'flex-end',
          alignItems:'flex-start'
        },
        TView: {
          // backgroundColor:'yellow',
          marginTop:hp2dp('0.5%'),
        },
        CView:{
          // backgroundColor:'blue',
          marginTop: hp2dp('2%'),
          // marginVertical: hp2dp('0.5%'),
        },
        contentContianer: {
          paddingHorizontal:wp2dp('4%'),
          paddingVertical:hp2dp('2%')
        }
        
      });
      