// @ts-nocheck
/* eslint-disable */
import { Alert, Platform } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
class backend{
    uid = "";
   
    constructor(){
       
    }
    SignIn= async (email,password)=>{
        try {
            let response = await auth().signInWithEmailAndPassword(email, password)
            return response
          } catch (e) {
            switch(e.code){
                case "auth/invalid-email":
                    return "Enter a valid Email Address"
                case "auth/user-disabled":
                    return "User has been disabled"
                case "auth/user-not-found":
                    return "User Does Not exists"
                case "auth/wrong-password":
                    return "Please Enter a vaild password"
            }
          }

    }

    SignUp = async (name,email,password) =>{

        try{
            let data = await auth().createUserWithEmailAndPassword(email,password)
            if(data.user.uid){
                const user = {
                    uid:data.user.uid,
                    email:email,
                    name:name
                }
                //how to display message from here
                 firestore()
                 .collection('user')
                 .doc(data.user.uid)
                 .set(user)
                 .then(()=>{
                    //  console.log('user added')
                     return "SignUp Successfully"
                 })
            }
            }
        catch(e){
            switch(e.code){
                case "auth/email-already-in-use":
                    return "Email is in use"
                case "auth/invalid-email":
                    return "Enter a valid email address"
                case "auth/operation-not-allowed":
                    return "Email is not enabled in firebase"
                case "auth/weak-password":
                    return "Password is Too Weak"
            }
        }
    }

}

export default new backend();