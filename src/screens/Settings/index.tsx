import React, { useState, useEffect } from 'react'
import { DeleteLabel, Title, Upload, NameLabel, Description } from './styles'
import { Platform, TextInput, KeyboardAvoidingView, TouchableOpacity, View, Alert, Text, FlatList, ScrollView, StyleSheet, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../../theme'
import 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { ButtonBack } from '../../components/ButtonBack';
import { Photo } from '../../components/Photo';
import { Button as PickImageButton } from '../../components/Button'
import { AntDesign, Feather, MaterialIcons, Ionicons } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack';
import WebView from 'react-native-webview';
import { useTheme } from 'styled-components/native';

// import { Platform, KeyboardAvoidingView, TouchableOpacity, FlatList, ScrollView, StyleSheet, Image, View, Text, TextInput, Alert, Animated } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import 'react-native-gesture-handler';
import api from '../../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../../services/socket';
import { Input } from '../../components/Input';


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


const { Navigator, Screen } = createStackNavigator();

const TIP = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      message: '1. Procure andar com bolsas, carteiras e demais pertences ao alcance das mãos e da visão: na parte da frente do corpo ou nos bolsos frontais. Isso evitará que alguém possa saqueá-lo furtivamente sem que você se dê conta.',
      title: 'Aline'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      message: '2. Evite os fones de ouvido. Mesmo que o percurso seja longo e que uma boa música ajude a passar o tempo, esse é um risco que pode ser eliminado. Meliantes escolhem suas vítimas pela fragilidade e vulnerabilidade, além de analisarem o que elas trazem de valor e que podem ser levados.',
      title: 'Paulo'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      message: '3. Tente manter-se acordado durante a viagem, pois enquanto dormimos deixamos nossos pertences mais acessíveis. Em veículos excessivamente vagos, procure ficar o mais próximo possível ao motorista ou ao cobrador.',
      title: 'Geovana'
    },
    {
      id: 'gd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      message: '4. Cuidado ao entregar seus pertences para desconhecidos que estejam sentados e que se ofereçam para ajudar. Apesar de a atitude ser nobre, é melhor entregar apenas os objetos que não possuem riscos de serem furtados ou mesmo agradecer o favor, mas não aceitar. Bolsas são alvos fáceis para os ladrões mais ágeis, que podem tirar algo sem que você perceba.',
      title: 'Caillany'
    },
    {
      id: '8ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      message: '5. Mantenha-se sempre atento. E, se estiver com uma criança de colo, mesmo que ninguém ceda o lugar, nunca a entregue aos cuidados de pessoas desconhecidas. Mantenha as crianças, independente da idade, próximas ou sobre sua visão.',
      title: 'Erica'
    },
    {
      id: '18694a0f-3da1-471f-bd96-145571e29d72',
      message: '6. Além do risco de acidentes, essa atitude pode dar chance a roubos através da janela. Relógios, pulseiras, óculos escuros ou outros adornos podem ser arrancados bruscamente.',
      title: 'Daniel'
    },
    {
      id: 'qd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      message: '7. Se notar algo estranho no transporte, procure, cautelosamente, avisar ao motorista ou ao cobrador. Eles são orientados e saberão como proceder.',
      title: 'Rayssa'
    },
    {
      id: '98694a0f-3da1-471f-bd96-145571e29d72',
      message: '8. Nunca saia com muito dinheiro na carteira ou bolsa. O ideal é andar apenas com o dinheiro suficiente para as necessidades mais básicas. Na hora de pagar a passagem, dê preferência a vales-transporte ou cartões magnéticos. Jamais conte dinheiro em vias públicas ou dentro do ônibus, mesmo que quem esteja ao seu lado seja alguém conhecido. Essa medida evitará que você chame a atenção dos oportunistas.',
      title: 'Safe Woman'
    },
  ];

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
        <TouchableOpacity style={{ width: '100%',paddingHorizontal: 20, borderBottomColor: '#ccc', borderBottomWidth: 0.5, height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}} onPress={() => navigation.navigate('Search')}>
            <Feather name="search" size={25} color="black" />
            <Text style={{
                paddingLeft: 10
            }}>Buscar usuárias</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '100%',paddingHorizontal: 20, borderBottomColor: '#ccc', borderBottomWidth: 0.5, height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}} onPress={() => navigation.navigate('Manual')}>
            <Feather name="list" size={25} color="black" />
            <Text style={{
                paddingLeft: 10
            }}>Manual</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '100%',paddingHorizontal: 20, borderBottomColor: '#ccc', borderBottomWidth: 0.5, height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}} onPress={() => navigation.navigate('Informações')}>
            <Feather name="info" size={25} color="black" />
            <Text style={{
                paddingLeft: 10
            }}>Informações</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '100%',paddingHorizontal: 20, borderBottomColor: '#ccc', borderBottomWidth: 0.5, height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}} onPress={() => navigation.navigate('Avaliar')}>
            <Feather name="star" size={25} color="black" />
            <Text style={{
                paddingLeft: 10
            }}>Avaliar</Text>
        </TouchableOpacity>
        </View>
            </View>
        </KeyboardAvoidingView>
    )
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
              {/* <TouchableOpacity style={{position: 'absolute', bottom: 10, right: 10, zIndex: 5, width: 60, height: 60, backgroundColor: '#d53f8c', borderRadius: 30, display: 'flex', justifyContent: 'center', alignItems: 'center'}} onPress={() => navigation.navigate('Chat')}>
                    <Ionicons name="chatbubbles" size={24} color="#fff" />
                </TouchableOpacity> */}
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


export function Info(){
    return(
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
        <Upload>
        <Photo uri="https://trello.com/1/cards/629a99a52a684d06bb95777e/attachments/62a9bf0d5caccd08b376817f/download/grupo.jpg"/>
        <View style={{display: 'flex'}}>
        <NameLabel style={{
            marginRight: 16,
            fontWeight: 'bold'
        }}>Safe Woman</NameLabel>
        <Description style={{
            color: '#888'
        }}>Desde 2022</Description>
        </View>
        </Upload>
        <Description style={{
            marginTop: -20,
            textAlign: 'justify',
            paddingHorizontal: 20
        }}>A Safe Woman é uma startup de segurança brasileira focada em entregar o melhor valor a seus clientes. Nós começamos a operar em Abril de 2022 com os melhores profissionais do país. Nossa especialidade é no desenvolvimento e aprimoração da segurança feminina utilizando as melhores tecnologias.

        A Safe Woman segue uma filosofia simples de Oss: dedicar seu talento e tecnologia à criação de produtos e serviços superiores que contribuam para uma sociedade global melhor.</Description>
        <View style={{
          marginLeft: 20,
          marginTop: 10,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          // justifyContent: 'space-between'
        }}>
          <Feather name="instagram" size={25} color="#d53f8c"/>
          <Text style={{
            marginLeft: 5,
            color: "#d53f8c"
          }}>@safewoman22</Text>
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
        // horizontal
        // showsHorizontalScrollIndicator={false}
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