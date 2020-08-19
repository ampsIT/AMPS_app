// @ts-nocheck
/* eslint-disable */
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
    ImageBackground, Image, Alert,TouchableOpacity, FlatList,SafeAreaView  } from 'react-native';
    import {
        widthPercentageToDP as wp2dp,
        heightPercentageToDP as hp2dp,
      } from 'react-native-responsive-screen';   
import Icon from 'react-native-vector-icons/Entypo';

      const DATA = [
        {
          id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
          title: "First Video",
          src:'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1588152105',
          yop:'2010'
        },
        {
          id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
          title: "Second Video",
          src:'https://images.penguinrandomhouse.com/cover/9781524744922',
          yop:'2000'
        },
        {
          id: "58694a0f-3da1-471f-bd96-145571e29d72",
          title: "Third Video",
          src:'https://m.media-amazon.com/images/I/41qMDxyi00L.SX316.SY316.jpg',
          yop:'2012'
        },
        {
            id: "58694a12f-3da1-471f-bd96-145571e29d72",
            title: "Fouth Video",
            src:'https://images.squarespace-cdn.com/content/v1/5202d1b3e4b099a0812c51a3/1483134080936-K240V6OPPWM2J7NY8SE8/ke17ZwdGBToddI8pDm48kFjiq_0Ek1NItql1dLmsgNNZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVGQiKALUW-YxfFfP4p0PvHcTla7NnOOvQwSGt9YLKLGBhEym7bB5Y8EAaW-uC2HxJQ/Blood-Stained.jpg',
            yop:'2014'
          },
      ];

    const Item = ({item,onPress}) => (
        <View style={styles.item}>
          <View
           style={styles.IView}
          >
            <Image
            resizeMode='cover'
            style={styles.CardImage}
            source={{uri: item.src}}
            // source={{uri: 'https://www.w3schools.com/w3css/img_lights.jpg'}}
            />
            </View>

          <View style={styles.contentContianer}>

          <View
          style={styles.HView}
          >
            
            <View>
            <Text style={styles.title}>
              {/* {postTitle} */}
              {/* THIS IS THE LONG HEADING */}
              {item.title}
            </Text>
            </View>
            <View style={{justifyContent:'center'}}>
            <TouchableOpacity onPress={()=>{console.log('video Menu')}}>
                <Icon
                name={'dots-three-vertical'}
                size={20}
                />
            </TouchableOpacity>
            
            </View>
            </View>

            <View style={{justifyContent:'space-between',flexDirection: 'row'}}>
            <View
            style={styles.UploaderView}
            >
            <Text style={styles.timestamp}>
              {/* {timestamp} */}
              ADMIN
            </Text>
            </View>

            <View
            style={styles.TView}
            >
            <Text style={styles.timestamp}>
              {/* {timestamp} */}
              19 Aug 2020
            </Text>
            </View>

            
           
          </View>

          {/* <View
          style={styles.CView}
          >
            <Text style={styles.paragraph}>
              {content}
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
            </Text>
          </View> */}
          </View>
        </View>
      );

    export default class TabSection3 extends Component {
        constructor(props){
            super(props)
    
            this.state = {}
            
        }
    
        render() {
            const renderItem = ({ item }) => {    
                return (
                  <Item
                    item={item}
                    onPress ={()=>{this.onItemPress(item)}}
                  />
                );
              };

            return (
                    <SafeAreaView style={styles.container}>
                        <FlatList
                       data={DATA}
                       renderItem={renderItem}
                       keyExtractor={(item) => item.id}
                       showsVerticalScrollIndicator={false}
                        />
                    </SafeAreaView>
            )
        }    
    }    

    const styles = StyleSheet.create({
        container:{
            flex:1
        },
        item: {
            backgroundColor:'white',
            // padding: wp2dp('4%'),
            // marginVertical: hp2dp('1%'),
            marginBottom:hp2dp('0.5%'),
            // marginHorizontal: wp2dp('3%'),
            width:wp2dp('100%'),
            elevation:1,
            // borderBottomWidth:0.8
            // borderWidth:0.8
  
            // borderRadius:8
          },
          title: {
            fontSize: 28,
            fontWeight:'700'
          },
          CardImage: {
            width: wp2dp('100%'),
            height:hp2dp('35%'),
            // marginBottom:hp2dp('1%'),
            // marginTop:hp2dp('-2.3%'),
  
            // backgroundColor:'black',
            // borderTopRightRadius:8,
            // borderTopLeftRadius:8
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
            // borderBottomWidth:1,
            // backgroundColor:'black',
            width:wp2dp('100%'),
            borderBottomWidth:1,
            borderColor:'rgba(128,128,128,0.2)'
          },
          HView:{
            marginTop:hp2dp('-0.5%'),
            // backgroundColor:'green',
            justifyContent:'space-between',
            flexDirection: 'row'
          },
          TView: {
            // backgroundColor:'red',
            justifyContent:'flex-start'
          },
          CView:{
            // backgroundColor:'red',
            
          },
          contentContianer: {
            paddingHorizontal:wp2dp('4%'),
            paddingVertical:hp2dp('1%'),
            // backgroundColor:'yellow'
          },
          UploaderView: {

          }

    })