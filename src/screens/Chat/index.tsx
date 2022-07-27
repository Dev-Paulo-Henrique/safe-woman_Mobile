import React from "react";
import { Feather } from "@expo/vector-icons";
import { Platform, KeyboardAvoidingView } from "react-native";
import { Container, Input, Button, Title } from "./styles";

export function User() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <Container>
        <Title>Nenhuma mensagem</Title>
      </Container>
      <Input placeholder="Mensagem..." selectionColor="#D53F8C"/>
      <Button>
        <Feather name="arrow-right-circle" size={24} color="white" />
      </Button>
    </KeyboardAvoidingView>
  );
}
