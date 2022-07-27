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
import { Container, Scroll, Content, Description, Unity, Web, Index, Button, See, Title, Load } from './styles'
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
      <Container>
        {active === 1 ? (
          <Scroll>
            <Content>
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
            </Content>
            <Description>
              <Type>Geral:</Type>
                <Describe title={`Cliente: ${client}`}/>
                <Describe title={`Id: ${id}`}/>
              <Type>Localização:</Type>
              <Describe title={`Local: ${place}`}/>
              <Describe title={`Cidade: ${city}`}/>
              <Describe title={`Estado: ${state}`}/>
              <Describe title={`País: ${country}`}/>
              <Describe title={`CEP: ${cep}`}/>
              <Unity>
                <Describe title={`Latitude: ${lat}`}/>
                <Describe title={`Longitude: ${lon}`}/>
              </Unity>
              <Web>
              <WebView source={{ uri: `https://api.mapbox.com/styles/v1/mapbox/dark-v10.html?title=true&access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA#15/${lat}/${lon}`}}/>
              </Web>
              <Index>
              <Type>Dispositivo:</Type>
              <Button onPress={() => Clipboard.setString(device)}>
                <Describe title={`Id: ${device}`}/>
                <Feather name="copy" size={15} color="white" style={{marginBottom: 10}}/>
              </Button>
              <See onPress={() => axios.post("https://dweet.io/dweet/for/safewoman?Active=0")}>
                <Title>Visualizar</Title>
              </See>
              </Index>
            </Description>
          </Scroll>
        ) : (
          <Load>
            <ActivityIndicator size="large" color="#d53f8c" />
          </Load>
        )}
      </Container>
    </KeyboardAvoidingView>
  );
}
