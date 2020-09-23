// @ts-nocheck
/* eslint-disable */
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
    ImageBackground, Image, Alert,TouchableOpacity  } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import AppColors from './../../../lib/AppColors';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';


const icon_edit = (<Icon name="user-edit" size={20} color={AppColors.white} />)
const icon_add = (<Icon name="plus-circle" size={20} color={AppColors.white} />)

export class AcharyaDiaryMain extends Component {
    constructor(props){
        super(props)

        this.state = {
            acharyaDiaryData: {}
        }
        this.navigate = this.props.navigation.navigate;

    }

    componentDidMount(){
        this.loadAcharyaPersonal();
    }

    loadAcharyaPersonal(){
        let self = this;
        let user_id = auth().currentUser.uid;
        database().ref("acharya_diary_info").child(user_id)
        .once("value", function(snapshot){
            let dataval = [];
            if(snapshot.exists()){
                self.setState({
                    acharyaDiaryData: snapshot
                })

                console.log("acharyaDiaryData: ", self.state.acharyaDiaryData)
            }
        })
    }

    _addOrEditProfile(){
        this.navigate("AddAcharyaPersonalScreen");
    }

    render() {
        return (
                <View style={styles.container}>
                    <View style={styles.toppanel}>
                        <TouchableOpacity style={styles.addPersonalinfo}
                        onPress={() => this._addOrEditProfile()}>
                            <Text style={styles.addPersonalinfotxt}>
                                Edit/Add Profile
                            </Text>
                            <View style={styles.iconedit}>
                                {icon_edit}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addnewdiary}>
                            <Text style={styles.addPersonalinfotxt}>
                                New Item
                            </Text>
                            <View style={styles.iconedit}>
                                {icon_add}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: AppColors.deepblue
    },
    toppanel: {
        // width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginHorizontal: 6,
        marginVertical: 8,
    },
    addPersonalinfo: {
        borderRadius: 5,
        backgroundColor: AppColors.ligthblue,
        flexDirection: 'row',
        paddingVertical: 7
    },
    addnewdiary: {
        borderRadius: 5,
        backgroundColor: AppColors.greenligth,
        flexDirection: 'row',
        paddingVertical: 7
    },
    addPersonalinfotxt: {
        color: AppColors.white,
        fontSize: 16,
        paddingLeft: 12,
        paddingRight: 4,
    },
    iconedit: {
        marginLeft: 4,
        marginEnd: 12
    }
});

export default AcharyaDiaryMain;