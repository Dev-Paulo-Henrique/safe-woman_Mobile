import React from "react";
import { Feather } from "@expo/vector-icons";
import { Container, Input, Button, Title } from "./styles";
import { Space } from "../../components/Space";

export function User() {
  return (
    <Space>
      <Container>
        <Title>Nenhuma mensagem</Title>
      </Container>
      <Input placeholder="Mensagem..." selectionColor="#D53F8C" />
      <Button>
        <Feather name="arrow-right-circle" size={24} color="white" />
      </Button>
    </Space>
  );
}
