// @ts-nocheck
/* eslint-disable */
import React,{ Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
ImageBackground, Image, Alert,TouchableOpacity,FlatList,SafeAreaView, ScrollView} from 'react-native' 
import {
    widthPercentageToDP as wp2dp,
    heightPercentageToDP as hp2dp,
  } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
      src:'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1588152105',
      yop:'2010'
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
      src:'https://images.penguinrandomhouse.com/cover/9781524744922',
      yop:'2000'
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
      src:'https://m.media-amazon.com/images/I/41qMDxyi00L.SX316.SY316.jpg',
      yop:'2012'
    },
    {
        id: "58694a12f-3da1-471f-bd96-145571e29d72",
        title: "Fouth Item",
        src:'https://images.squarespace-cdn.com/content/v1/5202d1b3e4b099a0812c51a3/1483134080936-K240V6OPPWM2J7NY8SE8/ke17ZwdGBToddI8pDm48kFjiq_0Ek1NItql1dLmsgNNZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVGQiKALUW-YxfFfP4p0PvHcTla7NnOOvQwSGt9YLKLGBhEym7bB5Y8EAaW-uC2HxJQ/Blood-Stained.jpg',
        yop:'2014'
      },
  ];

  const Item = ({ item, onPress}) => (
    //   <Text style={styles.title}>{item.title}</Text>

    <TouchableOpacity onPress={onPress}>
        <View style={styles.cardContainer}>
         <View style={styles.card}>
            {/* <Text>
                Hello
            </Text> */}
            <Image
            resizeMode='cover'
            style={styles.cardImage}
            source={{uri: item.src}}
            // source={{uri: 'https://www.w3schools.com/w3css/img_lights.jpg'}}
            />
        </View>

        <View style={styles.titleView}>
            <Text style={styles.titleText} numberOfLines={1}>
                {/* Book Title */}
                {item.title}
            </Text>
            <Text style={styles.subtitleText}>
                {/* category */}
                {item.yop}
            </Text>

        </View>
    </View>
    </TouchableOpacity>
    
  );

export default class Tabsection4 extends Component{
    constructor(props){
        super(props)
        this.state={
            category:[
                {title: 'yoga', data: []}, 
                {title:'motivational', data: []}, 
                {title:'meditation', data: []}],
            
        }
    }

    componentDidMount(){
        this.loadAllBooks();
    }

    loadAllBooks(){
        let self = this;
        let yogaArray = [];
        let meditationArray =[];
        let motivationalArray =[];

        firestore().collection('all_publication_books').where('isyoga', '==', true).get()
        .then(querysnapshot => {
            if(querysnapshot.empty){
                console.log('No matching documents.');
                return;
            }
            else{
                querysnapshot.forEach(doc => {
                    yogaArray.push({
                        id: doc.id,
                        title: doc.data().book_name,
                        src: doc.data().thumbnails_url,
                        writer: doc.data().writer_name,
                        yop: doc.data().publish_year,
                    })
                })
            }

            let categorycopy = self.state.category;
            categorycopy[0].data = yogaArray;

            self.setState({
                category: categorycopy
            })

            // console.log("yoga: ", self.state.category);
        })

        firestore().collection('all_publication_books').where('ismotivational', '==', true).get()
        .then(querysnapshotm => {
            if(querysnapshotm.empty){
                console.log('No matching documents.');
                return;
            }
            else{
                querysnapshotm.forEach(doc => {
                    motivationalArray.push({
                        id: doc.id,
                        title: doc.data().book_name,
                        src: doc.data().thumbnails_url,
                        writer: doc.data().writer_name,
                        yop: doc.data().publish_year,
                    })
                })
            }

            let categorycopy = self.state.category;
            categorycopy[1].data = motivationalArray;

            self.setState({
                category: categorycopy
            })

            // console.log("motivationalArray: ", self.state.category);
        })

        firestore().collection('all_publication_books').where('ismeditation', '==', true).get()
        .then(querysnapshotme => {
            if(querysnapshotme.empty){
                console.log('No matching documents.');
                return;
            }
            else{
                querysnapshotme.forEach(doc => {
                    meditationArray.push({
                        id: doc.id,
                        title: doc.data().book_name,
                        src: doc.data().thumbnails_url,
                        writer: doc.data().writer_name,
                        yop: doc.data().publish_year,
                    })
                })
            }

            let categorycopy = self.state.category;
            categorycopy[2].data = meditationArray;

            self.setState({
                category: categorycopy
            })

            // console.log("meditationArray: ", self.state.category);
        })
    }

    onPressCategory = (category)=>{
        console.log(category)
    }
    onItemPress = (item)=>{
        // console.log(item);
        this.navigate('PublicationScreen',{item:item})
    }
   render(){
    const renderItem = ({ item }) => {    
        return (
          <Item
            item={item}
            onPress ={()=>{this.onItemPress(item)}}
          />
        );
      };
   return(
       <SafeAreaView style={styles.container}>
           <ScrollView 
           showsVerticalScrollIndicator={false}  
           >

           {this.state.category.map((item,index)=>(
               <View style={styles.listContainer} key={index}>
               <TouchableOpacity onPress={()=>{this.onPressCategory(item)}} >
                   <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
                   <View style={styles.HView}>
                        <Text style={styles.heading}>
                            {item.title}
                        </Text>
                        </View>
                        <View style={{justifyContent:'center',marginRight:wp2dp('2%')}}>
                            <Icon
                                name={'arrow-right'}
                                size={20}
                                // style={styles.arrow}
                                />
                        </View>
                   </View>
               </TouchableOpacity>
               
               <View style={styles.listView}>
                   <FlatList
                       horizontal
                       data={item.data}
                       renderItem={renderItem}
                       showsHorizontalScrollIndicator={false}
                   />
               </View>
          </View>
           ))
           }
           

           </ScrollView>
           </SafeAreaView>
   )}
}
const styles = StyleSheet.create({
      container:{
          flex:1
},
cardContainer:{
    alignItems:"flex-start",
    // backgroundColor:"yellow",
    // marginHorizontal:wp2dp('%'),
    marginRight:wp2dp('2%'),
    marginLeft:wp2dp('1%')

},

card:{
    // backgroundColor: 'blue',
    height:hp2dp('25%'),
    width:wp2dp('40%'),
    borderRadius:12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation:2,
},
heading:{
    fontSize:30,
    fontWeight: 'bold'
},
HView:{
    paddingLeft:wp2dp('3%'),
    paddingTop:hp2dp('2%'),
    paddingBottom:hp2dp('1%'),
    flexDirection:'row',
    // backgroundColor:'blue',
    alignItems:'center'
},
listView:{
    paddingLeft:wp2dp('2%'),

},
titleView:{
marginTop:hp2dp('0.5%')
},
titleText:{
    fontSize:14,
    width: wp2dp('40%')
},
cardImage:{
 height:hp2dp('25%'),
 width:wp2dp('40%'),
 borderRadius:12,
},
subtitleText:{
    fontSize:14,
    color:'rgba(0,0,0,0.8)'
},
arrow:{
    // marginLeft:wp2dp('50%')
    position: 'absolute', 
    left: wp2dp('90%'),
    top:hp2dp('3.5%')
}
})