// @ts-nocheck
/* eslint-disable */
import React, { Component } from 'react';

import {
  View, Text, Button, TouchableOpacity, Switch, StyleSheet, Dimensions, 
  Image, AppState, Animated, Easing, Alert
} from 'react-native';

import AppColors from './../../../lib/AppColors';

import backend from "./../../../backend/Backend";

import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';   

import Svg,{
  Circle,
  Ellipse,
  G,
  Text as SvgText,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image as SvgImage,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';

import { Badge as BadgeElement }  from 'react-native-elements';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const icon_my_profile = (<Icon name="user" size={18} color={AppColors.white} regular />)
const icon_notifications = (<Icon name="bell" size={24} color={AppColors.white} regular />)
const icon_settings = (<Icon name="cog" size={22} color={AppColors.white} regular />)

// const icon_my_profile = (<Icon name="thermometer" size={18} color={AppColors.white} />)
// const icon_notifications = (<Icon name="bookmark" size={18} color={AppColors.white} />)
// const icon_settings = (<Icon name="tag" size={18} color={AppColors.white} />)


export class HomeToolbar extends Component{
    constructor(props) {
      super(props);

      this.state = {
        
      }
    }

  componentDidMount(){
  
    let self = this;
   
  }

   
  render(){
  const {title,onIconPress,showDrawer} = this.props
    return(
      <View style={styles.toolbarcontainer}>
        <View style={styles.logocontainer}>	

          <View style={styles.iconView}>
              <TouchableOpacity onPress={onIconPress}>
              <Icon
              name={showDrawer ? "menu":"arrow-back"}
              size={30}
              color={'white'}
              />
              </TouchableOpacity>
          </View>
          
          <View style={styles.textView}>
          <Text style={styles.toolbarheadertext}>
              {title}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    toolbarcontainer: {
          // width,
          height: 60,
          backgroundColor: AppColors.primary,
          // borderRadius: 12,
          // marginHorizontal: 6,
          // marginTop: 6,
          paddingStart: 12,
          paddingEnd: 5,
          paddingBottom: 2,
          paddingTop: 2,
          flexDirection: 'row',
          alignItems: 'center',
          // justifyContent: 'space-between',
          // elevation: 5
    },
    logocontainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: "row",
        height: "100%",
        width: "100%",
        // marginLeft: 12
      },
      toolbarheadertext: {
        color: AppColors.white,
        fontSize: 24,
        fontFamily: "Montserrat-Bold",
        alignSelf: 'center',
        justifyContent: "flex-start"
        // fontWeight: 'bold',
        // marginStart: 1
      },
      textView:{
        marginLeft:wp2dp('1%')
      }
  });
  
  export default HomeToolbar;