// @ts-nocheck
/* eslint-disable */
import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

/**
 * This provider is created
 * to access user in whole app
 */

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try { 
            console.log('success sign: ', email + "_" + password);
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password, name, gender, category, contactno) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
            // console.log("user_id", auth().currentUser.uid);
            firestore()
            .collection('user')
            .doc(auth().currentUser.uid)
            .set({
              uid:auth().currentUser.uid,
              email:email,
              name:name,
              contactno:contactno,
              gender:gender,
              category:category
            });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};