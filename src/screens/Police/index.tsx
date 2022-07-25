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
import { Describe } from "../../components/Describe";
import { Type, Name } from "../../components/Describe/styles";
import "react-native-gesture-handler";
import { Feather } from '@expo/vector-icons'; 
import WebView from 'react-native-webview';
import { DATA } from '../../services/data';

import { apiWatch } from "../../services/api";
import axios from "axios";

export function Police() {
  const [id, setId] = useState(0);
  const [client, setClient] = useState("");
  const [active, setActive] = useState(0);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [device, setDevice] = useState("");
  const [place, setPlace] = useState("");
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [cep, setCep] = useState("")
  const [country, setCountry] = useState("")

  const places = axios.create({
    baseURL: "https://nominatim.openstreetmap.org/",
  });

  places
    .get(`/reverse.php?lat=${lat}&lon=${lon}&format=jsonv2`)
    .then((response) => {
      setPlace(response.data.name);
      setState(response.data.address.state);
      setCity(response.data.address.city);
      setCep(response.data.address.postcode);
      setCountry(response.data.address.country);
    });

    useEffect(() => {
      setInterval(
        () =>
          apiWatch.get("/").then((response) => {
            setId(response.data.with[0].content.Id);
            setClient(response.data.with[0].content.Client);
            setActive(response.data.with[0].content.Active);
            setLat(response.data.with[0].content.Latitude);
            setLon(response.data.with[0].content.Longitude);
            setDevice(response.data.with[0].content.Device);
          })
          ,
        1000
      );
    }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
        }}
        >
        {active === 1 ? (
          <ScrollView
          style={{
            backgroundColor: '#181b23',
            marginBottom: -350
          }}
          >
            <View
              style={{
                display: "flex",
                alignItems: "center",
                paddingTop: getStatusBarHeight() + 20,
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
              <Name>{client}</Name>
            </View>
            <View style={{
              marginBottom: '100%',
              width: '100%',
              display: 'flex',
              padding: 20,
            }}>
              <Type>Geral:</Type>
                <Describe title={`Cliente: ${client}`}/>
                <Describe title={`Id: ${id}`}/>
              <Type>Localização:</Type>
              <Describe title={`Local: ${place}`}/>
              <Describe title={`Cidade: ${city}`}/>
              <Describe title={`Estado: ${state}`}/>
              <Describe title={`País: ${country}`}/>
              <Describe title={`CEP: ${cep}`}/>
              <View style={{
                display: "flex",
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
                <Describe title={`Latitude: ${lat}`}/>
                <Describe title={`Longitude: ${lon}`}/>
              </View>
              <View style={{
                width: '100%',
                height: 400,
                marginBottom: -150,
                }}>
              <WebView source={{ uri: `https://api.mapbox.com/styles/v1/mapbox/dark-v10.html?title=true&access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA#15/${lat}/${lon}` }}
              style={{
                width: '100%',
                }}/>
              </View>
              <View style={{
                backgroundColor: '#181b23',
                paddingTop: 10,
                paddingBottom: 10
              }}>
              <Type>Dispositivo:</Type>
              <TouchableOpacity onPress={() => Clipboard.setString(device)} style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#1F2029',
                paddingRight: 10,
                paddingTop: 10
                }}>
                <Describe title={`Id: ${device}`}/>
                <Feather name="copy" size={15} color="white" style={{marginBottom: 10}}/>
              </TouchableOpacity>
              <Pressable
                style={{
                  borderRadius: 8,
                  padding: 10,
                  marginTop: 10,
                  elevation: 2,
                  backgroundColor: "#d53f8c",
                }}
                onPress={() => axios.post("https://dweet.io/dweet/for/safewoman?Active=0")}
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
