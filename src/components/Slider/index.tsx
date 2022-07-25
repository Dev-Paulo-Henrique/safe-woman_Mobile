import React, { ReactNode } from "react";
import Slick from "react-native-slick";

type Props = {
  children: ReactNode;
};

export function SliderContainer({ children }: Props) {
  return (
    <Slick showsButtons={false} loop={false} showsPagination={false}>
      {children}
    </Slick>
  );
}

export function SliderContent({ children }: Props) {
  return (
    <Slick
      showsButtons={false}
      autoplay
      autoplayTimeout={5}
      showsPagination={false}
    >
      {children}
    </Slick>
  );
}
