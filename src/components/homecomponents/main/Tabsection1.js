// @ts-nocheck
/* eslint-disable */
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,Dimensions,
    ImageBackground, Alert,TouchableOpacity,SafeAreaView, StatusBar, FlatList,Image} from 'react-native';

    // import firebase from 'firebase';
    // import firebase from '../../../../firebaseconfig'n
    import firestore from '@react-native-firebase/firestore';
    import {
      widthPercentageToDP as wp2dp,
      heightPercentageToDP as hp2dp,
    } from 'react-native-responsive-screen';   

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          postTitle: 'Heading 1',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          postTitle: 'Heading 2',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          postTitle: 'Heading 3',
        },
      ];    

    const Item = ({postTitle,content,image,timestamp}) => (
            <View style={styles.item}>
              <Image
              resizeMode='cover'
              style={styles.CardImage}
              source={{uri: 'https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg',}}
              />
              <Text style={styles.title}>
                {postTitle}
              </Text>
              <Text style={styles.timestamp}>
                {timestamp.toDate().toDateString()}
                {/* 12:00 pm 2 Aug, 2020 */}
              </Text>
              <Text style={styles.paragraph}>
              {content}
              </Text>
            </View>
          );


    export default class TabSection1 extends Component {
        constructor(props){
            super(props)
            this.state = {Newlist:[]}
        }
        componentDidMount(){
          firestore()
          .collection('news')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              // console.log(documentSnapshot.data());
              this.setState({Newlist:[...this.state.Newlist,documentSnapshot.data()]})
              console.log(this.state)
            });
          });
        }

        render() {
            const renderItem = ({ item }) => (
                <Item 
                postTitle={item.postTitle} 
                content={item.content}
                image={item.images}
                timestamp={item.timestamp}
                />
              );
            return (
                <SafeAreaView style={styles.container}>
                  {/* (!this.state.Newlist)?: */}
                <FlatList
                  data={this.state.Newlist}
                  // data={DATA}
                  renderItem={renderItem}
                  keyExtractor={item => item.postId}
                />
               
              </SafeAreaView>
            )
        }    
    }    

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          marginTop: StatusBar.currentHeight || 0,
        },
        item: {
          backgroundColor: 'white',
          padding: wp2dp('5%'),
          marginVertical: hp2dp('1%'),
          marginHorizontal: wp2dp('5%'),
          width:wp2dp('90%')
        },
        title: {
          fontSize: 32,
        },
        CardImage: {
          width: wp2dp('80%'),
          height:hp2dp('40%'),
          marginBottom:hp2dp('1%')
        },
        paragraph: {
          fontSize: 14
        },
        timestamp:{
          fontSize:11,
          marginBottom:hp2dp('2%')

        }
      });
      