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
              <Image
              resizeMode='cover'
              style={styles.CardImage}
              source={{uri: image}}
              />
              <Text style={styles.title}>
                {postTitle}
              </Text>
              <Text style={styles.timestamp}>
                {timestamp}
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
      