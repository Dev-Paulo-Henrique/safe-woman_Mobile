import React, { useState, useEffect } from 'react'
import { DeleteLabel, Title, Upload } from './styles'
import { Pressable, ActivityIndicator, Platform, KeyboardAvoidingView, TouchableOpacity, FlatList, ScrollView, StyleSheet, Image, View, Text, TextInput, Alert, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../../theme'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { Photo } from '../../components/Photo';
import { Mode } from '../../components/Modal';
import { SliderContainer, SliderContent } from '../../components/Slider';
import { Button as PickImageButton } from '../../components/Button'
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native'
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Slick from 'react-native-slick';

import { api, API, apiWatch } from '../../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../../services/socket';
import WebView from 'react-native-webview';
import { Input } from '../../components/Input';
import { DATA } from '../../services/data';
import axios from 'axios'

interface NewsProps {
  _id: string;
  introducao: string;
  titulo: string;
  link: string;
  data_publicacao: string;
}

const { Navigator, Screen } = createStackNavigator();

export function Home({navigation}: any){
  const [posts, setPosts] = useState<NewsProps[]>([]);
  const [id, setId] = useState(0);
  const [client, setClient] = useState('');
  const [active, setActive] = useState(0);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [device, setDevice] = useState('');
  const [place, setPlace] = useState('');
  const places = axios.create({
      baseURL: 'https://nominatim.openstreetmap.org/'
  })

  places.get(`/reverse.php?lat=${lat}&lon=${lon}&format=jsonv2`).then((response) => {
      setPlace(response.data.name)
  })
  
  const loading = useEffect(() => {
      apiWatch.get('/').then((response) => {
          setId(response.data.with[0].content.Id);
          setClient(response.data.with[0].content.Client);
          setActive(response.data.with[0].content.Active);
          setLat(response.data.with[0].content.Latitude);
          setLon(response.data.with[0].content.Longitude);
          setDevice(response.data.with[0].content.Device);
          //Sem internet
          // setId(0);
          // setClient(0);
          // setActive(0);
      })
    }, []);

  useEffect(() => {
    API.get('/').then((response) => {
      setPosts(response.data.items);
    });
    // console.log(posts)
  }, []);

  return(
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
      <Mode/>
      <SliderContainer>
        <>
            <View style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                // paddingTop: 10,
                flex: 1
            }}>
            {active === 1 ? 
            <View style={{
                // marginLeft: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'absolute',
                top: 10,
                left: 10,
                right: 10,
            }}>
            <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Photo uri={
              client === "Aline" ? DATA[0].photo : 
              client === "Geovana" ? DATA[2].photo :  
              client === "Caillany" ? DATA[3].photo :
              client === "Erica" ? DATA[4].photo :
              client === "Rayssa" ? DATA[6].photo :
              client === "Daniel" ? DATA[5].photo :
              client === "Eduarda" ? DATA[7].photo :
              client === "Paulo" ? DATA[1].photo :
              'https://www.gov.br/cdn/sso-status-bar/src/image/user.png'}/>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 18,
              marginTop: 5
            }}>{client}</Text>
            </View>
            <View style={{
              
            }}>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 16
            }}>Geral:</Text>
            <Text>Cliente: {client}</Text>
            <Text>Id: {id}</Text>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 16
            }}>Local:</Text>
            <Text>Local: {place}</Text>
            <Text>Latitude: {lat}</Text>
            <Text>Longitude: {lon}</Text>
            {/* <Text>Ativo: {active === 1 ? 'Sim' : 'Não'}</Text> */}
            <Text style={{
              fontWeight: 'bold',
              fontSize: 16
            }}>Dispositivo:</Text>
            <Text>Id: {device}</Text>
            <Pressable style={{
              borderRadius: 8,
              padding: 10,
              marginTop: 10,
              elevation: 2,
              backgroundColor: '#d53f8c',
            }} onPress={() => 
              axios.post('https://dweet.io/dweet/for/safewoman?Active=0')
              .then(function (response) {
                console.log(response);
                setInterval(() => apiWatch.get('/').then((response) => {
                  setId(response.data.with[0].content.Id);
                  setClient(response.data.with[0].content.Client);
                  setActive(response.data.with[0].content.Active);
                  setLat(response.data.with[0].content.Latitude);
                  setLon(response.data.with[0].content.Longitude);
                  setDevice(response.data.with[0].content.Device);
              }), 1000)
              })
              .catch(function (error) {
                console.log(error);
              })
              }>
              <Text style={{
              textAlign: 'center',
              fontWeight: 'bold',
                color: '#fff',
                fontSize: 18
              }}>Visualizar</Text>
            </Pressable>
            </View>
            </View> 
            : 
            <View style={{alignItems: 'center', width: '100%', justifyContent: 'center', flex: 1}}>
                <ActivityIndicator size="large" color="#d53f8c"/>
            </View>
            }
            </View>
            <SliderContent>
        {posts.map(post => (
        <View style={{
          display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginTop: 10,
            // borderColor: "#ccc",
            // borderBottomWidth: 0.5,
          // flex: 1,
          justifyContent: 'center',
        }}>
          <View style={{
            // height: 70,
            paddingTop: 10,
            paddingBottom: 20,
            display: 'flex',
            justifyContent: "space-between"
          }}>
          <Text
          numberOfLines={4}
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: "#000",
            }}
          >
            {post.titulo}
          </Text>
          <Text
          // numberOfLines={6}
            style={{
              fontSize: 14,
              color: "#888",
              // width: 200,
              marginBottom: 5,
              marginTop: 5
            }}
          >
            {post.introducao}
          </Text>
              <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                // width: '100%'
              }}>
          <Text
            style={{
              fontSize: 14,
              color: "#555",
            }}
          >
            {post.data_publicacao.split(' ')[0]}
          </Text>
          </View>
          </View>
        </View>
        ))}
        </SliderContent>
            </>
        <FlatList
        data={DATA}
        keyExtractor={(DATA) => DATA.id}
        renderItem={({ item }) => (
          <RectButton onPress={() => {
          // setUser(item.title),
          navigation.navigate('user'),
          console.log(item.title)
          }}>
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
          </RectButton>
        )}
        style={{
          backgroundColor: "#fff",
          width: "100%",
          height: "auto",
        }}
      />
      </SliderContainer>
        </KeyboardAvoidingView>
  )
}

export function User(){
  return(
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
        <View style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{
          color: '#aaa'
        }}>Nenhuma mensagem</Text>
        </View>
      <TextInput 
      placeholder='Mensagem...'
      style={{
        paddingHorizontal: 10,
        height: 56,
        backgroundColor: '#fff',
        borderRadius: 12,
        fontSize: 14,
        paddingVertical: 7,
        paddingLeft: 20,
        fontFamily: 'DMSans_400Regular',
        borderWidth: 1,
        borderColor: '#DCDCDC',
        position: 'absolute', 
        bottom: 10, 
        left: 10, 
        right: 80, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
      }}/>
      <RectButton 
      style={{
        position: 'absolute', 
        bottom: 10, 
        right: 10, 
        zIndex: 5, 
        width: 60, 
        height: 60, 
        backgroundColor: '#d53f8c', 
        borderRadius: 30, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
      }}
      >
        <Feather name="arrow-right-circle" size={24} color="white" />
        </RectButton>
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
          headerTitle: 'Safe Woman'
        }}
      />
      <Screen
        name='user'
        component={User}
        options={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#181b23' },
          headerShown: false,
        }}
      />
    </Navigator>
  );
}
