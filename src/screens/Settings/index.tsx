import React from 'react'
import { DeleteLabel, Title, Upload, NameLabel, Description } from './styles'
import { Platform, KeyboardAvoidingView, TouchableOpacity, View, Alert, Text, FlatList } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../../theme'
import 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { ButtonBack } from '../../components/ButtonBack';
import { Photo } from '../../components/Photo';
import { Button as PickImageButton } from '../../components/Button'
import { AntDesign, Feather } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack';
import WebView from 'react-native-webview';

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
        <TouchableOpacity style={{ width: '100%',paddingHorizontal: 20, borderBottomColor: '#ccc', borderBottomWidth: 0.5, height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}} onPress={() => navigation.navigate('')}>
            <Feather name="battery" size={25} color="black" />
            <Text style={{
                paddingLeft: 10
            }}>Bateria</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '100%',paddingHorizontal: 20, borderBottomColor: '#ccc', borderBottomWidth: 0.5, height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}} onPress={() => navigation.navigate('')}>
            <Feather name="monitor" size={25} color="black" />
            <Text style={{
                paddingLeft: 10
            }}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '100%',paddingHorizontal: 20, borderBottomColor: '#ccc', borderBottomWidth: 0.5, height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}} onPress={() => navigation.navigate('')}>
            <Feather name="alert-circle" size={25} color="black" />
            <Text style={{
                paddingLeft: 10
            }}>Avisos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '100%',paddingHorizontal: 20, borderBottomColor: '#ccc', borderBottomWidth: 0.5, height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}} onPress={() => navigation.navigate('')}>
            <Feather name="bluetooth" size={25} color="black" />
            <Text style={{
                paddingLeft: 10
            }}>Bluetooth</Text>
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
        <TouchableOpacity style={{position: 'absolute', bottom: 10, right: 10, zIndex: 5, width: 60, height: 60, backgroundColor: '#d53f8c', borderRadius: 30, display: 'flex', justifyContent: 'center', alignItems: 'center'}} onPress={() => Alert.alert('Erro', 'Este serviço não está disponível no momento.')}>
            <AntDesign name="star" size={25} color="white" />
        </TouchableOpacity>
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
        </KeyboardAvoidingView>
    )
}

export function Avaliar(){
    return(
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
        <WebView source={{ uri: `https://safe-woman.vercel.app/avaliar/` }}/>
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