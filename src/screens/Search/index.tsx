import { api } from "../../services/api";
import React, { useState, useEffect } from "react";
import { Platform, KeyboardAvoidingView, View, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { connect, disconnect, subscribeToNewDevs } from "../../services/socket";
import {
  Bio,
  Button,
  Callout,
  Container,
  Content,
  Img,
  Input,
  Name,
  Number,
  SecondContent,
  Tech,
  ViewUser,
} from "./styles";

interface DevsProps {
  _id: string;
  avatar_url: string;
  name: string;
  bio: string;
  github_username: string;
  techs: [string];
}

interface Region {
  latitude: Number;
  longitude: Number;
  latitudeDelta: Number;
  longitudeDelta: Number;
}

export function Search() {
  const [devs, setDevs] = useState<DevsProps[]>([]);
  const [currentRegion, setCurrentRegion] = useState<Region>(null!);
  const [techs, setTechs] = useState("");

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
        });
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

    connect(latitude, longitude, techs);
  }

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;

    const response = await api.get("/search", {
      params: {
        latitude,
        longitude,
        techs,
      },
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
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <Container>
        <Input
          placeholder="Buscar usuárias..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
          selectionColor="#D53F8C"
        />

        <Button onPress={loadDevs}>
          <MaterialIcons name="search" size={25} color="#FFF" />
        </Button>
        <ViewUser>
          <ScrollView showsVerticalScrollIndicator={false}>
            {devs?.map((dev) => (
              <Callout key={dev._id}>
                <Content>
                  <Img source={{ uri: dev.avatar_url }} />
                  <View>
                    <Name>{dev.name}</Name>
                    <Number>+{dev.github_username}</Number>
                  </View>
                </Content>
                <Bio>{dev.bio}</Bio>
                <SecondContent>
                  <Tech>{dev.techs}</Tech>
                </SecondContent>
              </Callout>
            ))}
          </ScrollView>
        </ViewUser>
      </Container>
    </KeyboardAvoidingView>
  );
}
