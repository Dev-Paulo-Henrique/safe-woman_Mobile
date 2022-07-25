import React from "react";
import { TouchableOpacity, Text } from "react-native";
import 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'


type Props = {
  title: string;
  nick: string;
  to: () => {};
};

export function List({ title, to, nick, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        paddingHorizontal: 20,
        borderBottomColor: "#ccc",
        borderBottomWidth: 0.5,
        height: 50,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
      {...rest}
      onPress={to}
    >
      <Feather name={nick} size={25} color="black" />
      <Text
        style={{
          paddingLeft: 10,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
