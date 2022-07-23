import React, { useState, useEffect } from "react";
import {
  Pressable,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  View,
  Text,
  ScrollView,
  Clipboard,
  TouchableOpacity
} from "react-native";
import { getStatusBarHeight, getBottomSpace } from "react-native-iphone-x-helper";
import { Photo } from "../../components/Photo";
import "react-native-gesture-handler";
import { Feather } from '@expo/vector-icons'; 
import WebView from 'react-native-webview'

import apiWatch from "../../services/connectWatch";
import axios from "axios";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    message: "Gostei muito do trabalho!",
    photo:
      "https://trello.com/1/cards/629a99a52a684d06bb95777e/attachments/629a99c5bbe8bd019c30ce54/download/Aline.jpeg",
    title: "Aline",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    message: "APP top!!!",
    photo:
      "https://trello.com/1/cards/629a99a52a684d06bb95777e/attachments/629a99c1b3cae167b7430287/download/Paulo.jpg",
    title: "Paulo",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    message: "Precisa melhorar o desempenho da página inicial",
    photo:
      "https://trello.com/1/cards/629a99a52a684d06bb95777e/attachments/629a99beb914e288c5a6d97f/download/Geovana.jpeg",
    title: "Geovana",
  },
  {
    id: "gd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    message: "O usuário precisa de reparos no back-end",
    photo:
      "https://trello.com/1/cards/629a99a52a684d06bb95777e/attachments/629a99c34265ae6247687fb9/download/Caillany.jpeg",
    title: "Caillany",
  },
  {
    id: "8ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    message: "Contrato com o governo em pendência",
    photo:
      "https://trello.com/1/cards/629a99a52a684d06bb95777e/attachments/629a99bb367e7b76cf442ce1/download/Erica.jpeg",
    title: "Erica",
  },
  {
    id: "18694a0f-3da1-471f-bd96-145571e29d72",
    message: "Produção em andamento",
    photo:
      "https://trello.com/1/cards/629a99a52a684d06bb95777e/attachments/629a99c0028fa042d6ea7aa0/download/Daniel.jpeg",
    title: "Daniel",
  },
  {
    id: "qd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    message: "Modelo finalizado com sucesso!",
    photo:
      "https://trello.com/1/cards/629a99a52a684d06bb95777e/attachments/629a99bf1bbe03889a69f10f/download/Rayssa.jpeg",
    title: "Rayssa",
  },
  {
    id: "2ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    message: "Reunião Quarta-feira às 110h",
    photo:
      "https://trello.com/1/cards/629a99a52a684d06bb95777e/attachments/629a99c63d885c76db91d799/download/Eduarda.jpeg",
    title: "Eduarda",
  },
  {
    id: "98694a0f-3da1-471f-bd96-145571e29d72",
    message: "Melhor empresa",
    photo:
      "https://trello.com/1/cards/629a99a52a684d06bb95777e/attachments/62a9bf0d5caccd08b376817f/download/grupo.jpg",
    title: "Safe Woman",
  },
];

export function Police() {
  const [id, setId] = useState(0);
  const [client, setClient] = useState("");
  const [active, setActive] = useState(0);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [device, setDevice] = useState("");
  const [place, setPlace] = useState("");
  const [copiedText, setCopiedText] = useState('')

  const copyToClipboard = () => {
    Clipboard.setString(device)
  }

  const places = axios.create({
    baseURL: "https://nominatim.openstreetmap.org/",
  });

  places
    .get(`/reverse.php?lat=${lat}&lon=${lon}&format=jsonv2`)
    .then((response) => {
      setPlace(response.data.name);
    });

    useEffect(() => {
      apiWatch.get('/').then((response) => {
          setId(response.data.with[0].content.Id);
          setClient(response.data.with[0].content.Client);
          setActive(response.data.with[0].content.Active);
          setLat(response.data.with[0].content.Latitude);
          setLon(response.data.with[0].content.Longitude);
          setDevice(response.data.with[0].content.Device);
      })
    }, []);

  setInterval(
    () =>
      apiWatch.get("/").then((response) => {
        setId(response.data.with[0].content.Id);
        setClient(response.data.with[0].content.Client);
        setActive(response.data.with[0].content.Active);
        setLat(response.data.with[0].content.Latitude);
        setLon(response.data.with[0].content.Longitude);
        setDevice(response.data.with[0].content.Device);
      }),
    1000
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          // height: 'auto'
        }}
        >
        {active === 1 ? (
          <ScrollView
          style={{
            // display: "flex",
            // flexDirection: "column",
            // alignItems: "center",
            // justifyContent: "flex-start",
            backgroundColor: '#181b23',
            // flex: 1,
            marginBottom: -350
          }}
          >
            <View
              style={{
                display: "flex",
                // justifyContent: "center",
                alignItems: "center",
                // width: '100%',
                // height: 'auto',
                // paddingBottom: 20,
                paddingTop: getStatusBarHeight() + 20,
                // marginBottom: 80,
                // position: 'absolute',
                // marginTop: 0
              }}
            >
              <Photo 
                uri={
                  client === "Aline"
                    ? DATA[0].photo
                    : client === "Geovana"
                    ? DATA[2].photo
                    : client === "Caillany"
                    ? DATA[3].photo
                    : client === "Erica"
                    ? DATA[4].photo
                    : client === "Rayssa"
                    ? DATA[6].photo
                    : client === "Daniel"
                    ? DATA[5].photo
                    : client === "Eduarda"
                    ? DATA[7].photo
                    : client === "Paulo"
                    ? DATA[1].photo
                    : "https://www.gov.br/cdn/sso-status-bar/src/image/user.png"
                }
              />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 26,
                  marginTop: 10,
                  color: '#fff'
                }}
                >
                {client}
              </Text>
            </View>
            <View style={{
              marginBottom: '100%',
              width: '100%',
              // height: '100%',
              display: 'flex',
              padding: 20,
              // justifyContent: 'space-around',
              // alignItems: 'flex-start',
              // backgroundColor: '#d33'
              // backgroundColor: '#183823',
            }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: '#fff',
                  marginBottom: 10
                }}
              >
                Geral:
              </Text>
              <Text style={{
                  color: '#fff',
                  backgroundColor: '#1F2029',
                  padding: 10,
                  borderRadius: 8,
                  marginBottom: 10
                }}>Cliente: {client}</Text>
              <Text style={{
                  color: '#fff',
                  backgroundColor: '#1F2029',
                  padding: 10,
                  borderRadius: 8,
                  marginBottom: 10
                }}>Id: {id}</Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: '#fff',
                  marginBottom: 10
                }}
              >
                Localização:
              </Text>
              <Text style={{
                  color: '#fff',
                  backgroundColor: '#1F2029',
                  padding: 10,
                  borderRadius: 8,
                  marginBottom: 10
                }}>Local: {place}</Text>
              <View style={{
                display: "flex",
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
              <Text style={{
                  color: '#fff',
                  backgroundColor: '#1F2029',
                  padding: 10,
                  borderRadius: 8,
                  marginBottom: 10
                }}>Latitude: {lat}</Text>
              <Text style={{
                  color: '#fff',
                  backgroundColor: '#1F2029',
                  padding: 10,
                  borderRadius: 8,
                  marginBottom: 10
                }}>Longitude: {lon}</Text>
              </View>
              <View style={{
                width: '100%',
                height: 400,
                marginBottom: -150,
                // paddingBottom: -20
                }}>
              <WebView source={{ uri: `https://api.mapbox.com/styles/v1/mapbox/dark-v10.html?title=true&access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA#15/${lat}/${lon}` }}
              style={{
                width: '100%',
                // height: 200,
                // marginBottom: 10,
                // paddingBottom: -20
                }}/>
              </View>
              <View style={{
                backgroundColor: '#181b23',
                paddingTop: 10,
                paddingBottom: 10
              }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: '#fff',
                  marginBottom: 10,
                }}
              >
                Dispositivo:
              </Text>
              <TouchableOpacity onPress={() => copyToClipboard()} style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#1F2029',
                padding: 10,
                borderRadius: 8,
                marginBottom: 10
                }}>
              <Text style={{
                color: '#fff',
                }}>Id: {device}
                </Text>
                <Feather name="copy" size={15} color="white" />
              </TouchableOpacity>
              <Pressable
                style={{
                  borderRadius: 8,
                  padding: 10,
                  marginTop: 10,
                  elevation: 2,
                  backgroundColor: "#d53f8c",
                }}
                onPress={() =>
                  axios
                    .post("https://dweet.io/dweet/for/safewoman?Active=0")
                    .then(function (response) {
                      console.log(response);
                      setInterval(
                        () =>
                          apiWatch.get("/").then((response) => {
                            setId(response.data.with[0].content.Id);
                            setClient(response.data.with[0].content.Client);
                            setActive(response.data.with[0].content.Active);
                            setLat(response.data.with[0].content.Latitude);
                            setLon(response.data.with[0].content.Longitude);
                            setDevice(response.data.with[0].content.Device);
                          }),
                        1000
                      );
                    })
                    .catch(function (error) {
                      console.log(error);
                    })
                }
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#fff",
                    fontSize: 18,
                  }}
                >
                  Visualizar
                </Text>
              </Pressable>
              </View>
            </View>
          </ScrollView>
        ) : (
          <View
            style={{
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
              flex: 1,
              backgroundColor: '#181b23',
            }}
          >
            <ActivityIndicator size="large" color="#d53f8c" />
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
