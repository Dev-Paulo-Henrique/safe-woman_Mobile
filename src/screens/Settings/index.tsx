import React, { useState, useEffect } from 'react'
import { Platform, TextInput, KeyboardAvoidingView, TouchableOpacity, View, Alert, Text, FlatList, ScrollView, StyleSheet, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Button as PickImageButton } from '../../components/Button'
import { AntDesign, Feather, MaterialIcons, Ionicons } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack';
import WebView from 'react-native-webview';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import 'react-native-gesture-handler';
import {TIP} from '../../services/data';
import { List } from '../../components/List';
import { Search } from '../Search';
import { Info } from '../Info';


const { Navigator, Screen } = createStackNavigator();

export function Settings({navigation}: any){
    return(
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
            <View
        style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
        }}
        > 
            <View 
            style={{
                justifyContent: 'space-between',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',
            }}>
        <List title="Buscar usuárias" onPress={() => navigation.navigate("Search")}>
        <Feather name="search" size={25} color="black" />
        </List>
        <List title="Manual" onPress={() => navigation.navigate("Manual")}>
        <Feather name="list" size={25} color="black" />
        </List>
        <List title="Informações" onPress={() => navigation.navigate("Informações")}>
        <Feather name="info" size={25} color="black" />
        </List>
        <List title="Avaliar" onPress={() => navigation.navigate("Avaliar")}>
        <Feather name="star" size={25} color="black" />
        </List>
        </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export function Avaliar(){
    return(
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
        <WebView source={{ uri: `https://safe-woman.vercel.app/avaliar/${TIP[0].id}`}}/>
        </KeyboardAvoidingView>
    )
}

export function Manual(){
    return(
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
        <FlatList
        data={TIP}
        keyExtractor={(TIP) => TIP.id}
        renderItem={({ item }) => (
          <View style={{
            display: 'flex',
            width: 'auto',
            height: 'auto',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            borderColor: "#ccc",
            borderBottomWidth: 0.5,
          }}>
          <View style={{
            height: 'auto',
            width: 300,
            paddingTop: 10,
            paddingBottom: 20,
            display: 'flex',
            // flexDirection: 'column',
            justifyContent: "space-between"
          }}>
          <Text
            style={{
              fontSize: 14,
              color: "#000",
            }}
          >
            {item.message}
          </Text>
          </View>
          </View>
        )}
        style={{
          backgroundColor: "#fff",
          width: "100%",
          height: "auto",
        }}
      />
        </KeyboardAvoidingView>
    )
}

export function MySettings() {
    return (
      <Navigator 
      initialRouteName="Configurações">
        <Screen
          name="Configurações"
          component={Settings}
          options={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#181b23' },
          }}
        />
        <Screen
          name="Informações"
          component={Info}
          options={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#181b23' },
          }}
        />
        
      <Screen
        name="Search"
        component={Search}
        options={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#181b23' },
          headerTitle: 'Buscar'
        }}
      />
        <Screen
          name="Manual"
          component={Manual}
          options={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#181b23' },
          }}
        />
        <Screen
          name="Avaliar"
          component={Avaliar}
          options={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#181b23' },
          }}
        />
      </Navigator>
    );
  }