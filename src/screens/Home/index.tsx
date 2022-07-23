import React, { useState, useEffect } from 'react'
import { DeleteLabel, Title, Upload } from './styles'
import { Modal, Pressable, ActivityIndicator, Platform, KeyboardAvoidingView, TouchableOpacity, FlatList, ScrollView, StyleSheet, Image, View, Text, TextInput, Alert, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../../theme'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { Photo } from '../../components/Photo';
import { Button as PickImageButton } from '../../components/Button'
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native'
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Slick from 'react-native-slick';

import api from '../../services/api';
import API from '../../services/apiNews';
import { connect, disconnect, subscribeToNewDevs } from '../../services/socket';
import WebView from 'react-native-webview';
import { Input } from '../../components/Input';
import apiWatch from '../../services/connectWatch';
import axios from 'axios'

interface NewsProps {
  _id: string;
  introducao: string;
  titulo: string;
  link: string;
  data_publicacao: string;
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

export function Home({navigation}: any){
  const [modalVisible, setModalVisible] = useState(false);
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  }}>
          <View style={{
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }}>
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    }}>
    <ActivityIndicator size="small" color="#d53f8c"/>
            <Text style={{
              marginLeft: 5,
              textAlign: 'center',
  }}>
  Procurando...
  </Text>
    </View>
            <Pressable
              style={[{
                borderRadius: 8,
                padding: 10,
                elevation: 2,
              }, {
                backgroundColor: '#d33',
              }]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Slick
      showsButtons={false}
      // autoplay
      // autoplayTimeout={5}
      loop={false}
      showsPagination={false}
      >
        <>
        <TouchableOpacity 
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
                alignItems: 'center'
            }}
            onPress={
              () => setModalVisible(true)
            }>
            <Feather name="watch" size={25} color="white" />
            </TouchableOpacity>
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
              // position: 'absolute',
              // top: 250,
              // width: 'auto',
              marginTop: 10,
              // marginHorizontal: 20,
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
                // setTimeout(() => loading, 2000)
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
            <Slick showsButtons={false}
      autoplay
      autoplayTimeout={5}
      // loop={false}
      showsPagination={false}>
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
        </Slick>
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
      </Slick>
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
