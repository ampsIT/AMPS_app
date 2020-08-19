// @ts-nocheck
/* eslint-disable */
import { Alert, Platform } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
class backend{
    uid = "";
   
    constructor(props){
       
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

        SignUp = async (user) =>{
            let message
        try{
            let data = await auth().createUserWithEmailAndPassword(user.email,user.password)
            if(data.user.uid){
                const newuser = {
                    uid:data.user.uid,
                    email:user.email,
                    name:user.name,
                    contactno:user.contactno,
                    gender:user.gender,
                    category:user.category
                }
                //how to display message from here
                             await firestore()
                            .collection('user')
                            .doc(data.user.uid)
                            .set(newuser)
                            .then(() =>{
                                console.log('sucessfully added user')
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
    signOut = async () => {
        try {
        //   await GoogleSignin.revokeAccess();
        //   await GoogleSignin.signOut();
          const res= await auth()
            .signOut()
            .then(() => alert('Your are signed out!'));
            //   setloggedIn(false);
            // this.setState({ loggedIn: false,user:[]})
            // setuserInfo([]);
            return res
            
        } catch (error) {
          console.error(error);
        }
      };

}

export default new backend();