import React, { useState, useEffect } from 'react'
import { DeleteLabel, Title, Upload } from './styles'
import { Platform, KeyboardAvoidingView, TouchableOpacity, FlatList, ScrollView, StyleSheet, Image, View, Text, TextInput, Alert, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../../theme'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { ButtonBack } from '../../components/ButtonBack';
import { Photo } from '../../components/Photo';
import { Button as PickImageButton } from '../../components/Button'
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native'
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import api from '../../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../../services/socket';
import WebView from 'react-native-webview';

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

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    message: 'Gostei muito do trabalho!',
    photo: 'https://trello.com/1/cards/629a99a52a684d06bb95777e/attachments/629a99c5bbe8bd019c30ce54/download/Aline.jpeg',
    title: 'Aline',
    time: '21:40'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    message: 'APP top!!!',
    photo: 'https://trello.com/1/cards/629a99a52a684d06bb95777e/attachments/629a99c1b3cae167b7430287/download/Paulo.jpg',
    title: 'Paulo',
    time: '21:35'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    message: 'Precisa melhorar o desempenho da página inicial',
    photo: 'https://trello.com/1/cards/629a99a52a684d06bb95777e/attachments/629a99beb914e288c5a6d97f/download/Geovana.jpeg',
    title: 'Geovana',
    time: '19:43'
  },
  {
    id: 'gd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    message: 'O usuário precisa de reparos no back-end',
    photo: 'https://trello.com/1/cards/629a99a52a684d06bb95777e/attachments/629a99c34265ae6247687fb9/download/Caillany.jpeg',
    title: 'Caillany',
    time: '15:29'
  },
  {
    id: '8ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    message: 'Contrato com o governo em pendência',
    photo: 'https://trello.com/1/cards/629a99a52a684d06bb95777e/attachments/629a99bb367e7b76cf442ce1/download/Erica.jpeg',
    title: 'Erica',
    time: '13:24'
  },
  {
    id: '18694a0f-3da1-471f-bd96-145571e29d72',
    message: 'Produção em andamento',
    photo: 'https://trello.com/1/cards/629a99a52a684d06bb95777e/attachments/629a99c0028fa042d6ea7aa0/download/Daniel.jpeg',
    title: 'Daniel',
    time: '11:49'
  },
  {
    id: 'qd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    message: 'Modelo finalizado com sucesso!',
    photo: 'https://trello.com/1/cards/629a99a52a684d06bb95777e/attachments/629a99bf1bbe03889a69f10f/download/Rayssa.jpeg',
    title: 'Rayssa',
    time: '07:01'
  },
  {
    id: '2ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    message: 'Reunião Quarta-feira às 110h',
    photo: 'https://trello.com/1/cards/629a99a52a684d06bb95777e/attachments/629a99c63d885c76db91d799/download/Eduarda.jpeg',
    title: 'Eduarda',
    time: '06:37'
  },
  {
    id: '98694a0f-3da1-471f-bd96-145571e29d72',
    message: 'Melhor empresa',
    photo: 'https://trello.com/1/cards/629a99a52a684d06bb95777e/attachments/62a9bf0d5caccd08b376817f/download/grupo.jpg',
    title: 'Safe Woman',
    time: '05:00'
  },
];

const { Navigator, Screen } = createStackNavigator();

export function Home({ navigation }: any){

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
              <TouchableOpacity style={{position: 'absolute', bottom: 10, right: 10, zIndex: 5, width: 60, height: 60, backgroundColor: '#181b23', borderRadius: 30, display: 'flex', justifyContent: 'center', alignItems: 'center'}} onPress={() => navigation.navigate('Chat')}>
                    <Ionicons name="chatbubbles" size={24} color="#D53F8C" />
                </TouchableOpacity>
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
        <FlatList
        data={DATA}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(DATA) => DATA.id}
        renderItem={({ item }) => (
          <View style={{
            display: 'flex',
            width: 'auto',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            borderColor: "#ccc",
            borderBottomWidth: 0.5,
          }}>
          <Image 
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 10,
          }} 
          source={{uri : item.photo}}/>
          <View style={{
            height: 70,
            paddingTop: 10,
            paddingBottom: 20,
            display: 'flex',
            justifyContent: "space-between"
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: "#000",
            }}
          >
            {item.title}
          </Text>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            // width: 280
          }}>
          {/* <Text
          numberOfLines={1}
            style={{
              fontSize: 14,
              color: "#ccc",
              maxWidth: 250,
            }}
          >
            {item.message}
          </Text> */}
          <Text
            style={{
              fontSize: 14,
              color: "#ccc",
            }}
          >
            {item.time}
          </Text>
          </View>
          </View>
          </View>
        )}
        style={{
          backgroundColor: "#fff",
          width: "100%",
          height: "auto",
        }}
      />
        <ScrollView showsVerticalScrollIndicator>
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

export function Chat(){
  return(
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
        <FlatList
        data={DATA}
        keyExtractor={(DATA) => DATA.id}
        renderItem={({ item }) => (
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            borderColor: "#ccc",
            borderBottomWidth: 0.5,
          }}>
          <Image 
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 10,
          }} 
          source={{uri : item.photo}}/>
          <View style={{
            height: 70,
            paddingTop: 10,
            paddingBottom: 20,
            display: 'flex',
            justifyContent: "space-between"
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: "#000",
            }}
          >
            {item.title}
          </Text>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 280
          }}>
          <Text
          numberOfLines={1}
            style={{
              fontSize: 14,
              color: "#ccc",
              maxWidth: 250,
            }}
          >
            {item.message}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#ccc",
            }}
          >
            {item.time}
          </Text>
          </View>
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

export function MyStack() {
  return (
    <Navigator>
      <Screen
        name="Home"
        component={Home}
        options={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#181b23' },
        }}
      />
      <Screen
        name="Chat"
        component={Chat}
        options={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#181b23' },
        }}
      />
    </Navigator>
  );
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
      marginBottom: 20,
    //   paddingLeft: 20,
    //   backgroundColor: '#D53F8C',
      borderRadius: 25,
      justifyContent: 'center',
      // alignItems: 'center',
      position: 'absolute',
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
    //   position: 'absolute',
    // flex: 1,
    display: 'flex',
    justifyContent: 'center',
      top: 20, //40
    //   left: 20,
    //   right: 20,
    //   zIndex: 5,
    // maxHeight: '100%',
    paddingHorizontal: 20,
      flexDirection: 'row',
      width: '100%',
      // backgroundColor: '#181b23',
    //   paddingBottom: 500,
      // paddingTop: 40,
    //   paddingLeft: 20,
    //   paddingRight: 20,
  
    },
  
    searchInput: {
      flex: 1,
      height: 50,
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
      width: 50,
      height: 50,
      backgroundColor: '#D53F8C',
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 15,
    },
  })