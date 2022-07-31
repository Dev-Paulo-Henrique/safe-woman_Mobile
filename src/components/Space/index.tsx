import { ReactNode } from "react";
import { Platform, KeyboardAvoidingView } from "react-native";

interface Props {
  children: ReactNode;
}

export function Space({ children }: Props) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      {children}
    </KeyboardAvoidingView>
  );
}
