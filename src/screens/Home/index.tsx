import React, { useState, useEffect } from 'react'
import { DeleteLabel, Title, Upload } from './styles'
import { Platform, KeyboardAvoidingView, TouchableOpacity, FlatList, ScrollView, StyleSheet, Image, View, Text, TextInput, Alert, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../../theme'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { ButtonBack } from '../../components/ButtonBack';
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
  const [posts, setPosts] = useState<NewsProps[]>([]);

  useEffect(() => {
    API.get('/').then((response) => {
      setPosts(response.data.items);
    });
    console.log(posts)
  }, []);

  return(
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
              {/* <TouchableOpacity style={{position: 'absolute', bottom: 10, right: 10, zIndex: 5, width: 60, height: 60, backgroundColor: '#d53f8c', borderRadius: 30, display: 'flex', justifyContent: 'center', alignItems: 'center'}} onPress={() => navigation.navigate('Chat')}>
                    <Ionicons name="chatbubbles" size={24} color="#fff" />
                </TouchableOpacity> */}
      <Slick
      showsButtons={false}
      // autoplay
      // autoplayTimeout={5}
      loop={false}
      showsPagination={false}
      >
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
            borderColor: "#ccc",
            borderBottomWidth: 0.5,
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
          numberOfLines={2}
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: "#000",
            }}
          >
            {post.titulo}
          </Text>
          <Text
          numberOfLines={5}
            style={{
              fontSize: 14,
              color: "#999",
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
        <FlatList
        data={DATA}
        keyExtractor={(DATA) => DATA.id}
        renderItem={({ item }) => (
          <RectButton onPress={() => {
          // setUser(item.title),
          // navigation.navigate('user'),
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
