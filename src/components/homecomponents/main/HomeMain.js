// @ts-nocheck
/* eslint-disable */
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
    ImageBackground, Image, Alert,TouchableOpacity,FlatList,SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import AppColors from './../../../lib/AppColors';
import Tabsection1 from './Tabsection1'
import Tabsection2 from './Tabsection2'
import Tabsection3 from './Tabsection3'
import firestore from '@react-native-firebase/firestore';
import {
    widthPercentageToDP as wp2dp,
    heightPercentageToDP as hp2dp,
  } from 'react-native-responsive-screen';

const HItem = ({name,icon}) => (
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
        
      );
export class HomeMain extends Component {
    constructor(props){
        super(props)

        this.state = {Hlist:[]}
        
    }
    componentDidMount(){
        this.getHlist()
      }
      getHlist=()=>{
        firestore()
        .collection('departmentsName')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            this.setState({Hlist:[...this.state.Hlist,documentSnapshot.data()]})
          });
        });

      }

    render() {
        const Tab = createBottomTabNavigator();

        const hrenderItem = ({item}) => (
             
            <HItem 
            name={item.name}
            icon={item.icon} 
            />
          
        )
        return (
                <SafeAreaView style={styles.container}>
                    {/* <Text style={styles.txtContainer}>
                        This is Home Page...
                    </Text> */}
                    <View
                    style={styles.Hlist}
                    >
                    <FlatList
                    horizontal
                    data={this.state.Hlist}
                    renderItem={hrenderItem}
                    keyExtractor={item => item.postId}
                    showsHorizontalScrollIndicator={false}
                    // stickyHeaderIndices={[1]}

                    />
                    </View>
                 

                    {/* <View
                    style={styles.bottomtab}
                    > */}
                    <Tab.Navigator
                    initialRouteName="Section1"
                    style={styles.bottomtab}
                    >
                    <Tab.Screen
                        name="Section1"
                        component={Tabsection1}
                        options={{
                        tabBarLabel: 'Section1',
                        tabBarIcon: () => (
                            <Icon name="home" color={'grey'} size={30} />
                        ),
                        }}
                    />
                    <Tab.Screen
                        name="Section2"
                        component={Tabsection2}
                        options={{
                        tabBarLabel: 'Section2',
                        tabBarIcon: () => (
                            <Icon name="address-book" color={'grey'} size={30} />
                        ),
                        }}
                    />
                    <Tab.Screen
                        name="Section3"
                        component={Tabsection3}
                        options={{
                        tabBarLabel: 'Section3',
                        tabBarIcon: () => (
                            <Icon name="comments" color={'grey'} size={30} />
                        ),
                        }}
                    />
                        
                    </Tab.Navigator>
                    {/* </View> */}
                    
                    
                </SafeAreaView>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        // height:hp2dp('50%'),
        flex:1,
        backgroundColor: "white",
        // height:hp2dp('15%')
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    txtContainer: {
        color: AppColors.primary,
        fontSize: 20,
        alignSelf: "center",
        justifyContent: "center"
    },
    bottomtab:{
        justifyContent:'flex-end',
        backgroundColor:'red'

    },
    Hitem:{
        // backgroundColor: 'white',
        // padding: wp2dp('3%'),
        paddingTop:hp2dp('1%'),
        // paddingHorizontal: wp2dp('2%'),
        // marginLeft:wp2dp('-20%'),

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
      IView:{
        alignItems: 'center'
      },
      TView:{
        alignItems: 'center'

      },
      Himage:{
        width:wp2dp('10%'),
        height:hp2dp('6%'),
        // marginHorizontal:hp2dp('1%')
        // alignItems: 'center',

      },
      Htext:{
        fontSize:14,
        textAlign: 'center'
      },
      Hlist:{
        // backgroundColor: 'white',
      }
});

export default HomeMain;