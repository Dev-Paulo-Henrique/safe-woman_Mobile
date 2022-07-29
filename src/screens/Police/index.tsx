import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  Clipboard,
} from "react-native";
import { Photo } from "../../components/Photo";
import { Describe } from "../../components/Describe";
import { Type, Name } from "../../components/Describe/styles";
import "react-native-gesture-handler";
import { Feather } from '@expo/vector-icons'; 
import WebView from 'react-native-webview';
import { DATA } from '../../services/data';
import { Container, Scroll, Content, Description, Unity, Web, Index, Button, See, Title, Load } from './styles'
import { apiWatch, places, refresh } from "../../services/api";

interface UserProps {
  Id: number;
  Client: string;
  Active: number;
  Latitude: string;
  Longitude: string;
  Device: string;
}

interface LocalProps {
  name: string;
  address: {
    state: string;
    city: string;
    postcode: string;
    country: string;
  }
}

export function Police() {
  const [user, setUser] = useState<UserProps>();
  const [local, setLocal] = useState<LocalProps>();

  places
    .get(`/reverse.php?lat=${user?.Latitude}&lon=${user?.Longitude}&format=jsonv2`)
    .then((response) => {
      setLocal(response.data)
    });

    useEffect(() => {
      setInterval(
        () =>
          apiWatch.get("/").then((response) => {
            setUser(response.data.with[0].content)
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
        {user?.Active === 1 ? (
          <Scroll>
            <Content>
              <Photo 
                uri={
                  user?.Client === "Aline"
                    ? DATA[0].photo
                    : user?.Client === "Geovana"
                    ? DATA[2].photo
                    : user?.Client === "Caillany"
                    ? DATA[3].photo
                    : user?.Client === "Erica"
                    ? DATA[4].photo
                    : user?.Client === "Rayssa"
                    ? DATA[6].photo
                    : user?.Client === "Daniel"
                    ? DATA[5].photo
                    : user?.Client === "Eduarda"
                    ? DATA[7].photo
                    : user?.Client === "Paulo"
                    ? DATA[1].photo
                    : "https://www.gov.br/cdn/sso-status-bar/src/image/user.png"
                }
              />
              <Name>{user?.Client}</Name>
            </Content>
            <Description>
              <Type>Geral:</Type>
                <Describe title={`Cliente: ${user?.Client}`}/>
                <Describe title={`Id: ${user?.Id}`}/>
              <Type>Localização:</Type>
              <Describe title={`Local: ${local?.name}`}/>
              <Describe title={`Cidade: ${local?.address.city}`}/>
              <Describe title={`Estado: ${local?.address.state}`}/>
              <Describe title={`País: ${local?.address.country}`}/>
              <Describe title={`CEP: ${local?.address.postcode}`}/>
              <Unity>
                <Describe title={`Latitude: ${user?.Latitude}`}/>
                <Describe title={`Longitude: ${user?.Longitude}`}/>
              </Unity>
              <Web>
              <WebView source={{ uri: `https://api.mapbox.com/styles/v1/mapbox/dark-v10.html?title=true&access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA#15/${user?.Latitude}/${user?.Longitude}`}}/>
              </Web>
              <Index>
              <Type>Dispositivo:</Type>
              <Button onPress={() => Clipboard.setString(user?.Device)}>
                <Describe title={`Id: ${user?.Device}`}/>
                <Feather name="copy" size={15} color="white" style={{marginBottom: 10}}/>
              </Button>
              <See onPress={() => refresh.post("")}>
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
