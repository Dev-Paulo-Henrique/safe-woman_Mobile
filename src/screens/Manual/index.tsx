import { FlatList } from "react-native";
import { TIP } from "../../services/data";
import { Container, Content, Text } from "./styles";
import { Space } from "../../components/Space";

export function Manual() {
  return (
    <Space>
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
    </Space>
  );
}
