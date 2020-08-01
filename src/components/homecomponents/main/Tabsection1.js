// @ts-nocheck
/* eslint-disable */
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal, Platform, Linking, TextInput,
    ImageBackground, Image, Alert,TouchableOpacity,SafeAreaView, StatusBar, FlatList } from 'react-native';

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'List Item 1',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'List Item 2',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'List Item 3',
        },
      ];    

const Item = ({ title }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
      );
    
    export default class TabSection1 extends Component {
        constructor(props){
            super(props)
    
            this.state = {}
            
        }
    
        render() {
            const renderItem = ({ item }) => (
                <Item title={item.title} />
              );
            return (
                <SafeAreaView style={styles.container}>
                <FlatList
                  data={DATA}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                />
              </SafeAreaView>
            )
        }    
    }    

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          marginTop: StatusBar.currentHeight || 0,
        },
        item: {
          backgroundColor: 'white',
          padding: 20,
          marginVertical: 8,
          marginHorizontal: 16,
        },
        title: {
          fontSize: 32,
        },
      });
      