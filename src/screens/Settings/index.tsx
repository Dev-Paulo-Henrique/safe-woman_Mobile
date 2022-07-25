import React from "react";
import { Platform, KeyboardAvoidingView, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Container, Content } from './styles'
import "react-native-gesture-handler";
import { List } from "../../components/List";
import { Search } from "../Search";
import { Info } from "../Info";
import { Avaliar } from "../Avaliar";
import { Manual } from "../Manual";

const { Navigator, Screen } = createStackNavigator();

export function Settings({ navigation }: any) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <Container>
        <Content>
          <List
            title="Buscar usuárias"
            nick="search"
            to={() => navigation.navigate("Search")}
          />
          <List
            title="Manual"
            nick="list"
            to={() => navigation.navigate("Manual")}
          />
          <List
            title="Informações"
            nick="info"
            to={() => navigation.navigate("Informações")}
          />
          <List
            title="Avaliar"
            nick="star"
            to={() => navigation.navigate("Avaliar")}
          />
        </Content>
      </Container>
    </KeyboardAvoidingView>
  );
}

export function MySettings() {
  return (
    <Navigator initialRouteName="Configurações">
      <Screen
        name="Configurações"
        component={Settings}
        options={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#181b23" },
        }}
      />
      <Screen
        name="Informações"
        component={Info}
        options={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#181b23" },
        }}
      />

      <Screen
        name="Search"
        component={Search}
        options={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#181b23" },
          headerTitle: "Buscar",
        }}
      />
      <Screen
        name="Manual"
        component={Manual}
        options={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#181b23" },
        }}
      />
      <Screen
        name="Avaliar"
        component={Avaliar}
        options={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#181b23" },
        }}
      />
    </Navigator>
  );
}