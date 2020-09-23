// @ts-nocheck
/* eslint-disable */
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput, Dimensions, ScrollView,
    ImageBackground, Image, Alert,TouchableOpacity  } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import AppColors from './../../../lib/AppColors';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const icon_edit = (<Icon name="user-edit" size={20} color={AppColors.white} />)
const icon_add = (<Icon name="plus-circle" size={20} color={AppColors.white} />)

export class AddAcharyaPersonal extends Component {
    constructor(props){
        super(props)

        this.state = {
            initiated_person_name: "",
            date_of_initiation: "",
            fathers_name: "",
            age: "",
            dob: "",
            village: "",
            post_office: "",
            police_station: "",
            district: "",
            state: "",
            postal_code: "",
            qualification: "",
            occupation: "",
            ph_no: "",
            email_address: "",

            submitStatus: "submit"
        }
        // this.navigate = this.props.navigation.navigate;

    }

    _setInitiatedPersonName(val){
        this.setState({
            initiated_person_name: val
        })
    }

    _setDateOfInitiation(val){
        this.setState({
            date_of_initiation: val
        })
    }

    _setFathersName(val){
        this.setState({
            fathers_name: val
        })
    }

    _setAge(val){
        this.setState({
            age: val
        })
    }

    _setDOB(val){
        this.setState({
            dob: val
        })
    }

    _setVillage(val){
        this.setState({
            village: val
        })
    }

    _setPostOffice(val){
        this.setState({
            post_office: val
        })
    }

    _setPoliceStation(val){
        this.setState({
            police_station: val
        })
    }

    _setDistrict(val){
        this.setState({
            district: val
        })
    }

    _setState(val){
        this.setState({
            state: val
        })
    }

    _setPostalCode(val){
        this.setState({
            postal_code: val
        })
    }

    _setQualification(val){
        this.setState({
            qualification: val
        })
    }

    _setOccupation(val){
        this.setState({
            occupation: val
        })
    }

    _setPhoneNumber(val){
        this.setState({
            ph_no: val
        })
    }

    _setEmailAddress(val){
        this.setState({
            email_address: val
        })
    }

    _SubmitAcharyaInfo(){
        if((this.state.initiated_person_name == null || this.state.initiated_person_name == "")){
            // alert("Oops!!! Email or Password is blank...");
            Alert.alert("Please enter Initiated Person Name..");
        }
        else if((this.state.date_of_initiation == null || this.state.date_of_initiation == "")){
            // alert("Oops!!! Email or Password is blank...");
            Alert.alert("Please enter Date Of Initiation..");
        }
        else if((this.state.fathers_name == null || this.state.fathers_name == "")){
            // alert("Oops!!! Email or Password is blank...");
            Alert.alert("Please enter Fathers Name..");
        }
        else if((this.state.age == null || this.state.age == "")){
            // alert("Oops!!! Email or Password is blank...");
            Alert.alert("Please enter Age..");
        }
        else if((this.state.dob == null || this.state.dob == "")){
            // alert("Oops!!! Email or Password is blank...");
            Alert.alert("Please enter DOB..");
        }
        else if((this.state.village == null || this.state.village == "")){
            // alert("Oops!!! Email or Password is blank...");
            Alert.alert("Please enter Village Name..");
        }
        else if((this.state.post_office == null || this.state.post_office == "")){
            // alert("Oops!!! Email or Password is blank...");
            Alert.alert("Please enter Post Office Name..");
        }
        else if((this.state.police_station == null || this.state.police_station == "")){
            // alert("Oops!!! Email or Password is blank...");
            Alert.alert("Please enter Police Station Name..");
        }
        else if((this.state.district == null || this.state.district == "")){
            // alert("Oops!!! Email or Password is blank...");
            Alert.alert("Please enter District Name..");
        }
        else if((this.state.state == null || this.state.state == "")){
            // alert("Oops!!! Email or Password is blank...");
            Alert.alert("Please enter State Name..");
        }
        else if((this.state.postal_code == null || this.state.postal_code == "")){
            // alert("Oops!!! Email or Password is blank...");
            Alert.alert("Please enter Postal Code..");
        }
        else if((this.state.qualification == null || this.state.qualification == "")){
            // alert("Oops!!! Email or Password is blank...");
            Alert.alert("Please enter Your Qualification..");
        }
        else if((this.state.occupation == null || this.state.occupation == "")){
            // alert("Oops!!! Email or Password is blank...");
            Alert.alert("Please enter Your Occupation..");
        }
        else if((this.state.ph_no == null || this.state.ph_no == "")){
            // alert("Oops!!! Email or Password is blank...");
            Alert.alert("Please enter Your Phone No..");
        }
        else if((this.state.email_address == null || this.state.email_address == "")){
            // alert("Oops!!! Email or Password is blank...");
            Alert.alert("Please enter Your Email Address..");
        }
        else{
            this.updatedataToDataBase()
        }
    }

    updatedataToDataBase(){
        let user_id = auth().currentUser.uid;
        var firebaseref = database().ref("acharya_diary_info").child(user_id);
        firebaseref.set({
            initiated_person_name: this.state.initiated_person_name,
            date_of_initiation: this.state.date_of_initiation,
            fathers_name: this.state.fathers_name,
            age: this.state.age,
            dob: this.state.dob,
            village: this.state.village,
            post_office: this.state.post_office,
            police_station: this.state.police_station,
            district: this.state.district,
            state: this.state.state,
            postal_code: this.state.postal_code,
            qualification: this.state.qualification,
            occupation: this.state.occupation,
            ph_no: this.state.ph_no,
            email_address: this.state.email_address
        })
    }
   
    render() {
        return (
                <View style={styles.container}>
                    <ScrollView style={{flex: 1}}>
                        <Text style={styles.headingtxt}>
                            Please add your personal info to maintain Acharya Diary
                        </Text>
                        <TextInput
                            value={this.state.initiated_person_name}
                            onChangeText={(val) => this._setInitiatedPersonName(val)}
                            style={styles.input}
                            placeholder="Name of initiated person"
                            maxLength={50}
                        />
                        <TextInput
                            value={this.state.date_of_initiation}
                            onChangeText={(val) => this._setDateOfInitiation(val)}
                            style={styles.input}
                            placeholder="Date of initiation(dd/mm/yy)"
                            maxLength={50}
                        />
                        <TextInput
                            value={this.state.fathers_name}
                            onChangeText={(val) => this._setFathersName(val)}
                            style={styles.input}
                            placeholder="Father's Name"
                            maxLength={50}
                        />
                        <TextInput
                            value={this.state.age}
                            onChangeText={(val) => this._setAge(val)}
                            style={styles.input}
                            placeholder="Age"
                            maxLength={50}
                        />
                        <TextInput
                            value={this.state.dob}
                            onChangeText={(val) => this._setDOB(val)}
                            style={styles.input}
                            placeholder="Date of Birth(dd/mm/yy)"
                            maxLength={50}
                        />
                        <Text style={styles.addresstxt}>
                            Permanent Address:
                        </Text>
                        <TextInput
                            value={this.state.village}
                            onChangeText={(val) => this._setVillage(val)}
                            style={styles.input2}
                            placeholder="Village"
                            maxLength={50}
                        />
                        <TextInput
                            value={this.state.post_office}
                            onChangeText={(val) => this._setPostOffice(val)}
                            style={styles.input2}
                            placeholder="Post office"
                            maxLength={50}
                        />
                        <TextInput
                            value={this.state.police_station}
                            onChangeText={(val) => this._setPoliceStation(val)}
                            style={styles.input2}
                            placeholder="Police station"
                            maxLength={50}
                        />
                        <TextInput
                            value={this.state.district}
                            onChangeText={(val) => this._setDistrict(val)}
                            style={styles.input2}
                            placeholder="District"
                            maxLength={50}
                        />
                        <TextInput
                            value={this.state.state}
                            onChangeText={(val) => this._setState(val)}
                            style={styles.input2}
                            placeholder="State"
                            maxLength={50}
                        />
                        <TextInput
                            value={this.state.postal_code}
                            onChangeText={(val) => this._setPostalCode(val)}
                            style={styles.input2}
                            placeholder="Postal code"
                            maxLength={50}
                        />
                        <Text style={styles.addresstxt}>
                            Permanent Info:
                        </Text>
                        <TextInput
                            value={this.state.qualification}
                            onChangeText={(val) => this._setQualification(val)}
                            style={styles.input2}
                            placeholder="Qualification"
                            maxLength={50}
                        />
                         <TextInput
                            value={this.state.occupation}
                            onChangeText={(val) => this._setOccupation(val)}
                            style={styles.input2}
                            placeholder="Occupation"
                            maxLength={50}
                        />
                         <TextInput
                            value={this.state.ph_no}
                            onChangeText={(val) => this._setPhoneNumber(val)}
                            style={styles.input2}
                            placeholder="Phone Number"
                            maxLength={50}
                        />
                        <TextInput
                            value={this.state.email_address}
                            onChangeText={(val) => this._setEmailAddress(val)}
                            style={styles.input2}
                            placeholder="email address"
                            maxLength={50}
                        />
                         <TouchableOpacity style={styles.submitBtn}
                            onPress={() => this._SubmitAcharyaInfo()}>
                            <Text style={styles.submittext}>
                                SUBMIT
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
        // backgroundColor: AppColors.deepblue
    },
    headingtxt: {
        fontSize: 16,
        color: AppColors.black,
        marginVertical: 4,
        marginHorizontal: 4
    },
    input: {
        // width: '96%',
        width: width - 12,
        // marginHorizontal: 10,
        height: 44,
        paddingVertical: 4,
        paddingHorizontal: 16,
        // marginBottom: 4,
        marginVertical: 6,
        marginHorizontal: 6,
        borderWidth: 1,
        borderColor: AppColors.black,
        borderRadius: 6,
        color: AppColors.black
    },
    input2: {
        // width: '96%',
        width: width - 24,
        // marginHorizontal: 10,
        height: 44,
        paddingVertical: 4,
        paddingHorizontal: 16,
        // marginBottom: 4,
        marginVertical: 6,
        marginHorizontal: 12,
        borderWidth: 1,
        borderColor: AppColors.black,
        borderRadius: 6,
        color: AppColors.black
    },
    addresstxt: {
        color: AppColors.deepblue,
        fontSize: 16,
        marginHorizontal: 6,
        marginVertical: 5
    },
    submitBtn: {
        // margin: 4,
        borderWidth: 0,
        // paddingLeft: 18,
        // paddingRight: 18,
        width: width - 16,
        marginHorizontal: 8,
        marginVertical: 6,
        height: 42,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: AppColors.ligthblue,
        borderRadius: 6,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
        alignItems: "center"
    },
    submittext: {
        fontSize: 16,
        color: AppColors.white,
        fontWeight: 'bold',
    }
});

export default AddAcharyaPersonal;