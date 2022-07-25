import React from "react";
import 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'
import { Container, Title } from './styles'

type Props = {
  title: string;
  nick: string;
  to: () => {};
};

export function List({ title, to, nick, ...rest }: Props) {
  return (
    <Container {...rest} onPress={to}>
      <Feather name={nick} size={25} color="black" />
      <Title>{title}</Title>
    </Container>
  );
}
