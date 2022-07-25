import { Platform, KeyboardAvoidingView, FlatList } from "react-native";
import { TIP } from "../../services/data";
import { Container, Content, Text } from "./styles";

export function Manual() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <FlatList
        data={TIP}
        keyExtractor={(TIP) => TIP.id}
        renderItem={({ item }) => (
          <Container>
            <Content>
              <Text>{item.message}</Text>
            </Content>
          </Container>
        )}
        style={{
          backgroundColor: "#fff",
          width: "100%",
          height: "auto",
        }}
      />
    </KeyboardAvoidingView>
  );
}
