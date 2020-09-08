// @ts-nocheck
/* eslint-disable */
import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AuthStack from './Authstack';
import HomeStack from './Homestack';
import { AuthContext } from './AuthProvider';
import Loading from './../screens/Loading';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import { Platform } from 'react-native';
import database from '@react-native-firebase/database';

async function saveTokenToDatabase(token) {
  // Assume user is already signed in
  const userId = auth().currentUser.uid;

  // Add the token to the users datastore
  await firestore()
    .collection('user')
    .doc(userId)
    .update({
      tokens: firestore.FieldValue.arrayUnion(token),
    })
    .then(()=>{
      console.log("token added")
    }).catch(e=>{console.log(e)})
    ;

    database()
  .ref(`/users/${userId}`)
  .set({
    token: token,
  })
  .then(() => console.log('Data set.'))
  .catch(e=>{console.log(e)})
  ;

    // await firebase
    // .database()
    // .ref("/users/" + Math.floor(Math.random() * Math.floor(1000)))
    // .set({
    //   email: "instaman@gmail.com",
    //   notification_token: token,
    //   created_at: Date.now(),
    // })
    // .then(res => {
    //   console.log(res);
    // });  
}
export default function Routes() {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
 
  // Handle user state changes
  function onAuthStateChanged(user){
    setUser(user);
    // if(!user){
    //   getToken()
    // }
    if (initializing) setInitializing(false);
    setLoading(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then(token => {
        return saveTokenToDatabase(token);
      });
      
    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      saveTokenToDatabase(token);
    });
  }, []);
  
  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}