import React, { useState, useEffect } from 'react'
import { Container, Content } from './styles'
import { Pressable, ActivityIndicator, Platform, KeyboardAvoidingView, FlatList, Image, View, Text } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Photo } from '../../components/Photo';
import { Mode } from '../../components/Modal';
import { SliderContainer } from '../../components/Slider';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Slick from 'react-native-slick';
import { User } from '../Chat'

import { api, API, apiWatch, places } from '../../services/api';
import { DATA } from '../../services/data';

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

  places.get(`/reverse.php?lat=${lat}&lon=${lon}&format=jsonv2`).then((response) => {
      setPlace(response.data.name)
  })
  
  useEffect(() => {
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
  }, []);

  return(
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
      <Mode/>
      <SliderContainer>
        <>
            <Container>
            {active === 1 ? 
            <Content>
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
            </View>
            </Content> 
            : 
            <View style={{alignItems: 'center', width: '100%', justifyContent: 'center', flex: 1}}>
                <ActivityIndicator size="large" color="#d53f8c"/>
            </View>
            }
            </Container>
            {/* <SliderContent>
        {posts.map(post => (
        <View style={{
          display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginTop: 10,
          justifyContent: 'center',
        }}>
          <View style={{
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
        </SliderContent> */}
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
