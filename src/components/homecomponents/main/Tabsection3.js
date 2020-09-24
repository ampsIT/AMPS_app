// @ts-nocheck
/* eslint-disable */
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput, Picker,
    ImageBackground, Image, Alert,TouchableOpacity, FlatList,SafeAreaView  } from 'react-native';
    import {
        widthPercentageToDP as wp2dp,
        heightPercentageToDP as hp2dp,
      } from 'react-native-responsive-screen';   
import Icon from 'react-native-vector-icons/Entypo';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import AppColors from '../../../lib/AppColors';

      const DATA = [
        {
          id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
          title: "First Video",
          src:'https://media.npr.org/assets/img/2014/01/07/mindfulness_wide-b20c3525971d5796eba9ad993463fffe8faf2bcb-s800-c85.jpg',
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
              <TouchableOpacity 
              onPress ={onPress}
              >
                <Image
                // resizeMode='cover'
                style={styles.CardImage}
                source={{uri: item.src}}
                // source={{uri: 'https://www.w3schools.com/w3css/img_lights.jpg'}}
                />
                <View style={styles.overlay} />
                <Icon
                name={'controller-play'}
                size={80}
                color={"white"}
                style={styles.playIcon}
                />
              </TouchableOpacity>
              
            </View>
            
          <View style={styles.contentContianer}>

          <View
          style={styles.HView}
          >
            <View style={{ width:wp2dp('80%')}}>
              <Text style={styles.title}>
                {/* {postTitle} */}
                {/* THIS IS THE LONG HEADING */}
                {item.title}
              </Text>
            </View>

            <View style={{justifyContent:'center'}}>
              <TouchableOpacity 
                style={{paddingHorizontal: 6}}
                onPress={()=>{console.log('video Menu')}}>
                  <Icon
                  name={'dots-three-vertical'}
                  size={16}
                  />
              </TouchableOpacity>
            </View>
            </View>

            <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
              <View
              style={styles.UploaderView}
              >
                <Text style={styles.timestamp}>
                  {/* {timestamp} */}
                  {item.total_views} Views
                </Text>
              </View> 
              <View
              style={styles.TView}
              >
                <Text style={styles.timestamp}>
                  {/* {timestamp} */}
                  {item.publishing_date.toDate().toLocaleString('en-US')}
                </Text>
              </View> 
            </View>
          </View>

        </View>
      );

    export default class TabSection3 extends Component {
        constructor(props){
            super(props)
    
            this.state = {
              videoData: [],
              allPrimeType: [],
              selectedFilter: "all"
            }
            this.navigate = this.props.navigation.navigate
            // this.options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        }

        componentDidMount(){
          this._loadInitialData();
          this._loadPrimeType();
        }

        _loadPrimeType(){
          let self = this;
          firestore().collection('prime_type').get()
          .then(querysnapshot => {
            let data = [];
            querysnapshot.forEach(doc => {
              data.push({
                id: doc.id,
                name: doc.data().name
              })
            })

            if(data.length > 0){
              data = [{id: "all", name: "Show All"}, ...data];
              // console.log("primedata: ", data)
              self.setState({
                allPrimeType: data
              })
            }
          });
        }

        _loadInitialData(){
          let self = this;
          firestore().collection('publish_video').onSnapshot(querysnapshot => {
            let data = [];
            querysnapshot.forEach(doc => {
              data.push({
                id: doc.id,
                title: doc.data().title,
                src: doc.data().src_thumbnails,
                yop: doc.data().yop,
                publishing_date: doc.data().publishing_date,
                published_by: doc.data().published_by,
                total_views: doc.data().total_views,
                description:doc.data().description
              })
            })

            self.setState({
              videoData: data,
              selectedFilter: "all"
            })
          })
          // .then()
        }

        _changeFilterVideo(itemValue){
          // console.log("pickeritem: ", itemValue)
          let selectedFilterprev = this.state.selectedFilter;
          if(selectedFilterprev === itemValue){
            // console.log("pickeritem: ", "itemValue")
            return;
          }

          // console.log("pickeritem: ", itemValue)
          this.setState({
            selectedFilter: itemValue
          });
          if(itemValue === "all"){
            this. _loadInitialData();
          }
          else{
            this._loadVideoDataWithPrimeType(itemValue);
          }
        }

        _loadVideoDataWithPrimeType(itemValue){
          let self = this;
          // let primetype = "/prime_type/" + itemValue;
          if(itemValue === "all"){
            this. _loadInitialData();
          }
          else{
            let primetype = firestore().collection("prime_type").doc(itemValue);
            // console.log("ref: ", primetype);
            firestore().collection('publish_video').where('primeType', '==', primetype).get()
            .then(querysnapshot => {
              let data = [];
              
              querysnapshot.forEach(doc => {
                // console.log("get filter data: ", doc.id)
                data.push({
                  id: doc.id,
                  title: doc.data().title,
                  src: doc.data().src_thumbnails,
                  yop: doc.data().yop,
                  publishing_date: doc.data().publishing_date,
                  published_by: doc.data().published_by,
                  total_views: doc.data().total_views
                })
              })

              self.setState({
                videoData: data,
                selectedFilter: itemValue
              })
            })
          }
        }

        showPrimeTypePicker(){
          if(this.state.allPrimeType.length > 0){
            return(
              <View style={styles.topPanel}>
                <Text style={styles.selectpickertxt}>
                    Filter Your Video
                </Text>
                <Picker
                  selectedValue={this.state.selectedFilter}
                  style={{ height: 50, width: 150, color: AppColors.primary }}
                  onValueChange={(itemValue, itemIndex) => this._changeFilterVideo(itemValue)}
                >
                {this.state.allPrimeType !== "" ? (
                      this.state.allPrimeType.map(allPrimeType => {
                          return <Picker.Item label={allPrimeType.name} value={allPrimeType.id} />;
                      })
                  ) : (
                      <Picker.Item label="Loading..." value="0" />
                  )}
                </Picker>
              </View>
            )
          }
        }

        renderPrimeTypeItem(item){
          if(item.id === this.state.selectedFilter){
            return(
              <View style={styles.selectedprimetypechip}>
                <Text style={styles.selectedprimetypechiptxt}>
                  {item.name}
                </Text>
              </View>
            )
          }
          else{
            return(
              <TouchableOpacity style={styles.primetypechip}
              onPress={() => this._loadVideoDataWithPrimeType(item.id)}>
                <Text style={styles.primetypechiptxt}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )
          }
        }

        showPrimeTypeChip(){
          return(
            <View style={{ paddingVertical: 3, marginVertical: 3}}>
               <FlatList
                  data={this.state.allPrimeType}
                  horizontal
                  renderItem={(item) => {
                        return(
                            this.renderPrimeTypeItem(item.item)
                        )
                  }}
                  keyExtractor={(item) => item.id}
                  showsHorizontalScrollIndicator={false}
                />
            </View>
          )
        }
    
        render() {
            const renderItem = ({ item }) => {    
                return (
                  <Item
                    item={item}
                    onPress ={()=>{this.navigate('VideoScreen',{item:item})}}
                  />
                );
              };

            return (
                    <SafeAreaView style={styles.container}>
                      {/* {this.showPrimeTypePicker()} */}
                      {this.showPrimeTypeChip()}
                      <FlatList
                        style={{ flex: 1}}
                        data={this.state.videoData}
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
            flex:1,
          // alignItems: 'center',
          // backgroundColor:'yellow'
        },
        item: {
            backgroundColor:'white',
            // padding: wp2dp('4%'),
            marginVertical: 16,
            marginBottom:hp2dp('0.5%'),
            marginHorizontal: 12,
            // width:wp2dp('95%'),
            elevation: 5,
            // borderBottomWidth:0.8
            // borderWidth:0.8
            borderRadius:8,
            paddingBottom:hp2dp('1%')
          },
          title: {
            fontSize: 16,
            // fontWeight:'700',
            color: AppColors.darkgrey
          },
          CardImage: {
            // width: wp2dp('95%'),
            height:hp2dp('35%'),
            // marginBottom:hp2dp('1%'),
            // marginTop:hp2dp('-2.3%'),
            // borderRadius:10,
            // backgroundColor:'black',
            borderTopRightRadius:8,
            borderTopLeftRadius:8
          },
          overlay: {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'black',
            opacity: 0.5,
            // borderRadius:10,
            borderTopRightRadius:8,
            borderTopLeftRadius:8
          },
          paragraph: {
            fontSize: 16
            
          },
          timestamp:{
            fontSize: 12,
            // marginVertical:hp2dp('1%'),
            marginTop: 12,
            color: AppColors.grey
          },
          IView:{
            // alignItems: 'center',
            // borderBottomWidth:1,
            // backgroundColor:"rgba(0,0,0,0.8)",

            // width:wp2dp('90%'),
            // borderBottomWidth:1,
            // borderColor:'rgba(128,128,128,0.2)'
          },
          HView:{
            // marginTop:hp2dp('-0.5%'),
            // backgroundColor:'green',
            justifyContent:'space-between',
            flexDirection: 'row'
          },
          TView: {
            // backgroundColor:'red',
            marginLeft:wp2dp('3%'),
            justifyContent:'flex-start'
          },
          CView:{
            // backgroundColor:'red',
            
          },
          contentContianer: {
            paddingHorizontal:wp2dp('4%'),
            paddingVertical:hp2dp('1%'),
            // position: 'absolute',
            // bottom:hp2dp('0.5%'),
            // width:wp2dp('95%'),
            // backgroundColor:'yellow'
          },
          UploaderView: {

          },
          playIcon:{
            position: 'absolute',
            bottom:hp2dp('12%'),
            left:wp2dp('40%'),
            // alignItems:'center'
          },
          topPanel: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: 'center',
            margin: 6,
          },
          selectpickertxt: {
            fontSize: 16,
            paddingHorizontal: 6,
          },
          primetypechip: {
            borderRadius: 20,
            // borderWidth: 1,
            // borderColor: AppColors.black,
            backgroundColor: AppColors.grey,
            marginHorizontal: 4,
            // height: 20
          },
          selectedprimetypechip: {
            borderRadius: 20,
            borderWidth: 1,
            borderColor: AppColors.white,
            backgroundColor: AppColors.secondary,
            marginHorizontal: 4,
            // height: 20
          },
          selectedprimetypechiptxt: {
            color: AppColors.white,
            fontSize: 14,
            fontWeight: "bold",
            paddingVertical: 6,
            paddingHorizontal: 16
          },
          primetypechiptxt: {
            color: AppColors.secondary,
            fontSize: 14,
            // fontWeight: "bold",
            paddingVertical: 6,
            paddingHorizontal: 16
          }


    })