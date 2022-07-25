import {api} from '../../services/api';
import React, { useState, useEffect } from 'react'
import { useTheme } from 'styled-components/native';
import { Platform, TextInput, KeyboardAvoidingView, TouchableOpacity, View, Alert, Text, FlatList, ScrollView, StyleSheet, Image } from 'react-native'
import { AntDesign, Feather, MaterialIcons, Ionicons } from '@expo/vector-icons'
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { connect, disconnect, subscribeToNewDevs } from '../../services/socket';

interface DevsProps {
  _id: string;
  avatar_url: string;
  name: string;
  bio: string;
  github_username: string;
  techs: [string]
}

interface Region {
  latitude: Number;
  longitude: Number;
  latitudeDelta: Number;
  longitudeDelta: Number;
}

export function Search({ navigation }: any){

    const { COLORS } = useTheme()
      const [devs, setDevs] = useState<DevsProps[]>([]);
      const [currentRegion, setCurrentRegion] = useState<Region>(null!);
      const [techs, setTechs] = useState('');
    //   const [open, setOpen] = useState(false);
    
      useEffect(() => {
        async function loadInitialPosition() {
          const { granted } = await requestForegroundPermissionsAsync();
    
          if (granted) {
            const { coords } = await getCurrentPositionAsync({
            //   enableHighAccuracy: true,
            });
    
            const { latitude, longitude } = coords;
    
            setCurrentRegion({
              latitude,
              longitude,
              latitudeDelta: 0.04,
              longitudeDelta: 0.04,
            })
          }
        }
    
        loadInitialPosition();
      }, []);
    
      useEffect(() => {
        subscribeToNewDevs((dev: DevsProps) => setDevs([...devs, dev]));
      }, [devs]);
    
      function setupWebsocket() {
        disconnect();
    
        const { latitude, longitude } = currentRegion;
    
        connect(
          latitude,
          longitude,
          techs,
        );
      }
    
      async function loadDevs() {
        const { latitude, longitude } = currentRegion;
    
        const response = await api.get('/search', {
          params: {
            latitude,
            longitude,
            techs
          }
        });
        
        
        setDevs(response.data.devs);
        setupWebsocket();
      }
    
      function handleRegionChanged(region: React.SetStateAction<Region>) {
        setCurrentRegion(region);
      }
    
      if (!currentRegion) {
        return null;
      }
      return(
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
          <View style={styles.searchForm}>
          <TextInput 
            style={styles.searchInput}
            placeholder="Buscar usuárias..."
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={techs}
            onChangeText={setTechs}
            selectionColor="#D53F8C"
          />
  
          <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
            <MaterialIcons name="search" size={25} color="#FFF" />
          </TouchableOpacity>
  
          
  
          <View style={styles.user}>
          <ScrollView showsVerticalScrollIndicator={false}>
          {devs?.map(dev => (
            
                <View style={styles.callout} key={dev._id}>
                  <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                  <Image 
                style={styles.avatar} 
                source={{ uri: dev.avatar_url }}
              />
                  <View>
                  <Text style={styles.devName}>{dev.name}</Text>
                  <Text style={styles.number}>+{dev.github_username}</Text>
                  </View>
                  </View>
                  <Text style={styles.devBio}>{dev.bio}</Text>
                  <View style={{display: "flex", flexDirection:'row', justifyContent: "space-between", alignItems: "center"}}>
                  <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                  </View>
                </View>
          ))}
          </ScrollView>
          </View>
        </View>
          </KeyboardAvoidingView>
      )
  }

  const styles = StyleSheet.create({
    map: {
      flex: 1
    },
  
    page: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
    },
    
    container: {
      height: 300,
      width: 300,
      backgroundColor: 'tomato'
    },
    
    avatar: {
      width: 54,
      height: 54,
      borderRadius: 25,
      marginRight: 20,
      borderColor: '#FFF'
    },

    number: {
        color: '#888888'
    },
    
    user:{
      // flex: 1,
      width: '100%',
      height: "auto",
      // overflowY: "auto",
      display: 'flex',
    //   flexDirection: 'row',
    //   marginRight: 10,
      marginBottom: 50,
    //   paddingLeft: 20,
    //   backgroundColor: '#D53F8C',
      borderRadius: 25,
      justifyContent: 'center',
      // alignItems: 'center',
      // position: 'relative',
      top: 70,
    },
  
    callout: {
      width: '100%',
      height: "auto",
      backgroundColor: "#fff",
      borderRadius: 4,
      marginBottom: 20,
      padding: 10
    },
    
    devName: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 5
    },
    
    devBio: {
      color: '#666',
      marginTop: 5,
    },
  
    devTechs: {
      marginTop: 5,
    },
    
    searchForm: {
      // position: 'absolute',
    // flex: 1,
    display: 'flex',
    justifyContent: 'center',
      // top: 20, //40
      // left: 20,
      // right: 20,
    //   zIndex: 5,
    // maxHeight: '100%',
    paddingHorizontal: 20,
      flexDirection: 'row',
      width: '100%',
      // backgroundColor: '#181b23',
      // paddingBottom: 500,
      paddingTop: 20,
      // paddingLeft: 20,
      // paddingRight: 20,
  
    },
  
    searchInput: {
      position: 'absolute',
      // flex: 1,
      height: 50,
      // width: 200,
      top: 20,
      left: 20,
      right: 80,
      // display: 'flex',
      // flexDirection: 'column',
      // justifyContent: 'center',
      // alignItems: 'center',
      backgroundColor: '#FFF',
      color: '#333',
      borderRadius: 25,
      paddingHorizontal: 20,
      fontSize: 16,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: {
        width: 4,
        height: 4,
      },
      elevation: 2,
    },
  
    loadButton: {
      position: 'absolute',
      right: 20,
      top: 20,
      width: 50,
      height: 50,
      backgroundColor: '#D53F8C',
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 15,
    },
  })