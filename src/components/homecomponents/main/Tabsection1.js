// @ts-nocheck
/* eslint-disable */
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,Dimensions,
    ImageBackground, Alert,TouchableOpacity,SafeAreaView, StatusBar, FlatList,Image} from 'react-native';

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
                source={{uri: image}}
                // source={{uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg'}}
                />
                </View>

              <View
              style={styles.TView}
              >
                <Text style={styles.timestamp}>
                  {timestamp}
                </Text>
              </View>

              <View
              style={styles.HView}
              >
                <Text style={styles.title}>
                  {postTitle}
                  {/* THIS IS THE LONG HEADING */}
                </Text>
              </View>

              <View
              style={styles.CView}
              >
                <Text style={styles.paragraph}>
                  {/* {content} */}
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
                </Text>
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
          marginTop:hp2dp('0.5%')
          // alignItems: 'center'
        },
        item: {
          backgroundColor: 'white',
          padding: wp2dp('4%'),
          marginVertical: hp2dp('2%'),
          marginHorizontal: wp2dp('3%'),
          width:wp2dp('95%'),
          elevation:3,
          borderRadius:8
        },
        title: {
          fontSize: 30,
        },
        CardImage: {
          width: wp2dp('95%'),
          height:hp2dp('40%'),
          // marginBottom:hp2dp('1%'),
          marginTop:hp2dp('-2.3%'),
          // backgroundColor:'black',
          borderTopRightRadius:8,
          borderTopLeftRadius:8
        },
        paragraph: {
          fontSize: 16
        },
        timestamp:{
          fontSize:14,
          marginVertical:hp2dp('1%'),
          color:'grey'
        },
        IView:{
          alignItems: 'center',
        },
        HView:{
          // marginTop:hp2dp('1%'),
          // backgroundColor:'red',
          alignItems:'flex-start'
        },
        TView: {
          // backgroundColor:'red',


        },
        CView:{
          // backgroundColor:'red',

        }
        
      });
      