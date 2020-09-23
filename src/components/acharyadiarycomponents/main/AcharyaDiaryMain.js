// @ts-nocheck
/* eslint-disable */
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput, Dimensions, FlatList,
    ImageBackground, Image, Alert,TouchableOpacity  } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import AppColors from './../../../lib/AppColors';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const icon_edit = (<Icon name="user-edit" size={20} color={AppColors.white} />)
const icon_add = (<Icon name="plus-circle" size={20} color={AppColors.white} />)

export class AcharyaDiaryMain extends Component {
    constructor(props){
        super(props)

        this.state = {
            acharyaDiaryData: null,
            isAcharyaProfilePresent: false,

            isDiaryItem: false,
            place: "",
            date: "",
            title: "",
            details: "",

            allItemDiary: []
        }
        this.navigate = this.props.navigation.navigate;

    }

    componentDidMount(){
        this.loadAcharyaPersonal();
        this.loadDiaryItemsData();
    }

    loadAcharyaPersonal(){
        let self = this;
        let user_id = auth().currentUser.uid;
        database().ref("acharya_diary_info").child(user_id)
        .on("value", function(snapshot){
            let dataval = [];
            if(snapshot.exists()){
                self.setState({
                    acharyaDiaryData: snapshot,
                    isAcharyaProfilePresent: true
                })

                console.log("acharyaDiaryData: ", self.state.acharyaDiaryData)
            }
        })
    }

    loadDiaryItemsData(){
        let self = this;
        let user_id = auth().currentUser.uid;
        console.log("itemd: ")
        database().ref("acharya_diary_details").child(user_id)
        .on("value", function(snap){
            let data = []
            console.log("itemd: ", snap)
            if(snap.exists()){
                snap.forEach(child => {
                    data.push({
                        id: child.key,
                        title: child.val().title,
                        date: child.val().date,
                        place: child.val().place,
                        details: child.val().details
                    })
                })
            }

            console.log("itemd: ", data)
            self.setState({
                allItemDiary: data
            })
        })
    }

    _addOrEditProfile(){
        this.navigate("AddAcharyaPersonalScreen", {item: this.state.acharyaDiaryData});
    }

    _addNewDiaryItem(){
        if(!this.state.isAcharyaProfilePresent){
            Alert.alert(
                'Your Profile Not Set',
                'Want to add your profile?',
                [
                    {
                      text: 'Ask me later',
                      onPress: () => console.log('Ask me later pressed'),
                      style: 'cancel'
                    },
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel'
                    },
                    { text: 'OK', onPress: () => this._addOrEditProfile()}
                  ],
                  { cancelable: false }
                );
        }
        else{
            this.setState({
                isDiaryItem: true
            })
        }
    }

    closeModalItem(){
        this.setState({
            isDiaryItem: false,
            date: "",
            place: "",
            title: "",
            details: ""
        })
    }

    

    _setPlace(val){
        this.setState({
            place: val
        })
    }

    _setDate(val){
        this.setState({
            date: val
        })
    }

    _setTitle(val){
        this.setState({
            title: val
        }) 
    }

    _setDetails(val){
        this.setState({
            details: val
        }) 
    }

    loadDiarymain(){
        return(
            <View style={{ flex: 1}}>
                <ScrollView style={{ flex: 1}}>
                    <Text style={styles.headingtxt}>
                        Maintain your diary here..
                    </Text>
                    {/* <View style={styles.dateplacepanel}>

                    </View> */}
                    <TextInput
                        value={this.state.place}
                        onChangeText={(val) => this._setPlace(val)}
                        style={styles.input}
                        placeholder="Add your place name"
                        maxLength={50}
                    />
                    <TextInput
                        value={this.state.date}
                        onChangeText={(val) => this._setDate(val)}
                        style={styles.input}
                        placeholder="Add date"
                        maxLength={50}
                    />
                    <TextInput
                        value={this.state.title}
                        onChangeText={(val) => this._setTitle(val)}
                        style={styles.input}
                        placeholder="Add Title"
                        maxLength={50}
                    />
                     <TextInput
                        value={this.state.details}
                        onChangeText={(val) => this._setDetails(val)}
                        style={styles.input2}
                        multiline={true}
                        placeholder="Add Details"
                        // maxLength={50}
                    />
                    <TouchableOpacity style={styles.submitBtn}
                        onPress={() => this._SubmitDiaryItem()}>
                        <Text style={styles.submittext}>
                            SUBMIT
                        </Text> 
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelBtn}
                        onPress={() => this.closeModalItem()}>
                        <Text style={styles.submittext}>
                            CANCEL
                        </Text> 
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }

    _SubmitDiaryItem(){
        if(this.state.date === ""){
            Alert.alert("Please enter date...")
        }
        else if(this.state.place === ""){
            Alert.alert("Please enter place...")
        }
        else if(this.state.title === ""){
            Alert.alert("Please enter title...")
        }
        else if(this.state.details === ""){
            Alert.alert("Please enter details...")
        }
        else{
            this.updateDiaryitemToDataBase()
        }
    }

    updateDiaryitemToDataBase(){
        let self = this;
        database().ref("acharya_diary_details").child(auth().currentUser.uid)
        .push({
            title: this.state.title,
            date: this.state.date,
            place: this.state.place,
            details: this.state.details
        },
        function(error) {
            if(error) {
                // self.closeModalItem()
             }else{
                Alert.alert("Add diary item successfully")
                self.closeModalItem();
             }
        })
    }

    renderDiaryItem(item){
        return(
            <View style={styles.cardDiary}>
                <Text style={styles.titlecard}>
                    {item.title}
                </Text>
                <View style={styles.dateplaceview}>
                    <Text style={styles.dateplacetxt}>
                        On {item.date}
                    </Text>
                    <Text style={styles.dateplacetxt}>
                        At {item.place}
                    </Text>
                </View>
            </View>
        )
    }

    loadDiaryItems(){
        return(
            <FlatList
                style={{flex: 1}}
                data={this.state.allItemDiary}
                renderItem={(item) => {
                    return(
                        this.renderDiaryItem(item.item)
                    )
                }}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        )
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
                        <TouchableOpacity style={styles.addnewdiary}
                        onPress={() => this._addNewDiaryItem()}>
                            <Text style={styles.addPersonalinfotxt}>
                                New Item
                            </Text>
                            <View style={styles.iconedit}>
                                {icon_add}
                            </View>
                        </TouchableOpacity>
                    </View>
                    {this.loadDiaryItems()}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.isDiaryItem}
                        onRequestClose={() => {
                        // Alert.alert('Modal has been closed.');
                        this.closeModalItem()
                        }}
                        >
                        <View style={ styles.modaladditemdiary }>
                            <View style={ styles.modalmain }>
                                {this.loadDiarymain()}
                            </View>
                        </View>
                    </Modal>
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
    },
    modaladditemdiary: {
       flex: 1,
       backgroundColor: AppColors.lowersemiTransparentDark
    },
    modalmain: {
        position: "absolute",
        bottom: 2,
        left: 0,
        right: 0,
        backgroundColor: AppColors.white,
        minHeight: 400,
        maxHeight: height*0.85,
        borderTopEndRadius: 16,
        borderTopStartRadius: 16
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
        width: width - 12,
        // marginHorizontal: 10,
        height: 200,
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
    cancelBtn: {
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
          backgroundColor: AppColors.primary,
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
    },
    cardDiary: {
        width: width*0.94,
        marginHorizontal: width*0.03,
        elevation: 1,
        borderRadius: 2,
        zIndex: 1,
        backgroundColor: AppColors.ligthblue,
        marginVertical: 5
    },
    titlecard: {
        marginHorizontal: 6,
        marginVertical: 8,
        paddingTop: 8,
        color: AppColors.white,
        fontSize: 18
    },
    dateplaceview: {
        flexDirection: 'row',
        marginHorizontal: 8,
        marginTop: 4,
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: 10
    },
    dateplacetxt: {
        color: AppColors.white,
        fontSize: 14
    },
});

export default AcharyaDiaryMain;