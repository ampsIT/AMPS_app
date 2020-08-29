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


    const HItem = ({name,icon,onPress}) => (

      <TouchableOpacity onPress={onPress}>
            <View 
        style={styles.Hitem}
        >
            <View 
            style={styles.IView}
            >
              <Image
            //   source={require('../../../lib/order.png')}
              source={{uri:icon}}
              style={styles.Himage}
              />
            </View>
    
            <View
            style={styles.TView}
            >
            <Text
              style={styles.Htext}
              >
                {name}
              </Text>
            </View>
        </View>
      </TouchableOpacity>
        
            
          );
     
    export default class TabSection1 extends Component {
        constructor(props){
            super(props)
            this.state = {Newlist:[],
                          Hlist:[]
                          }

            this.navigate = this.props.navigation.navigate
        }
        componentDidMount(){

          this.getNews()
          
          this.getHlist()
          
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

        getHlist=()=>{
          let self = this;
          firestore()
          .collection('departmentsName')
          .get()
          .then(querySnapshot => {
            let data = []
            querySnapshot.forEach(documentSnapshot => {
              // this.setState({Hlist:[...this.state.Hlist,documentSnapshot.data()]})
              data.push({
                id: documentSnapshot.id,
                icon: documentSnapshot.data().icon,
                name: documentSnapshot.data().name
              })
            });

            self.setState({
              Hlist: data
            })
          });
  
        }

        onPressDept=(item)=>{
          // console.log(item)
          this.navigate('DeptScreen',{item:item})
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

              const hrenderItem = ({item}) => (
             
                <HItem 
                name={item.name}
                icon={item.icon}
                onPress={() => {this.onPressDept(item)}} 
                />
              
            )
            
            return (
                <SafeAreaView style={styles.container}>
                  <View
                    style={styles.Hlist}
                    >
                    <FlatList
                    horizontal
                    data={this.state.Hlist}
                    renderItem={hrenderItem}
                    showsHorizontalScrollIndicator={false}
                    // stickyHeaderIndices={[1]}
                    />
                  </View>
                
                  <FlatList
                  style={{flex: 1}}
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
        },
        Hlist:{
          backgroundColor: 'white',
          // elevation:2,
          // marginBottom:hp2dp('1%'),
          borderWidth:0.2,
          // height: hp2dp('10%')
  
          // borderWidth:1
        },
        Hitem:{
          // backgroundColor: 'white',
          // padding: wp2dp('3%'),
          paddingTop:hp2dp('1%'),
          // paddingHorizontal: wp2dp('2%'),
          // marginLeft:wp2dp('-20%'),
          // marginBottom:hp2dp('1%'),
          paddingBottom:hp2dp('1%'),
          marginHorizontal: wp2dp('2%'),
          width:wp2dp('20%'),
          // marginRight:wp2dp('2%'),
          // marginLeft:wp2dp('5%'),
  
          // marginBottom:hp2dp('1%'),
          // flex:1,
          // justifyContent: 'center',
          // alignItems: 'center',
          // justifyContent:''
        },
        Himage:{
          width: 50,
          height: 50,
          alignSelf: "center"
          // marginHorizontal:hp2dp('1%')
          // alignItems: 'center',
  
        },
        Htext:{
          fontSize:14,
          textAlign: 'center'
        },
        
      });
      