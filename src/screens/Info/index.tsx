import { Platform, KeyboardAvoidingView } from "react-native";
import { Photo } from "../../components/Photo";
import {
  Upload,
  NameLabel,
  Description,
  Container,
  Since,
  Insta,
  Name,
} from "./styles";
import { Feather } from "@expo/vector-icons";
import { Space } from "../../components/Space";

export function Info() {
  return (
    <Space>
      <Upload>
        <Photo uri="https://trello.com/1/cards/629a99a52a684d06bb95777e/attachments/62a9bf0d5caccd08b376817f/download/grupo.jpg" />
        <Container>
          <NameLabel>Safe Woman</NameLabel>
          <Since>Desde 2022</Since>
        </Container>
      </Upload>
      <Description>
        A Safe Woman é uma startup de segurança brasileira focada em entregar o
        melhor valor a seus clientes. Nós começamos a operar em Abril de 2022
        com os melhores profissionais do país. Nossa especialidade é no
        desenvolvimento e aprimoração da segurança feminina utilizando as
        melhores tecnologias. A Safe Woman segue uma filosofia simples de Oss:
        dedicar seu talento e tecnologia à criação de produtos e serviços
        superiores que contribuam para uma sociedade global melhor.
      </Description>
      <Insta>
        <Feather name="instagram" size={25} color="#d53f8c" />
        <Name>@safewoman22</Name>
      </Insta>
    </Space>
  );
}
