import React from "react";
import { Feather } from '@expo/vector-icons';
import { Platform, KeyboardAvoidingView, View, Text, TextInput } from 'react-native'
import { RectButton } from "react-native-gesture-handler";

export function User(){
    return(
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
          <View style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{
            color: '#aaa'
          }}>Nenhuma mensagem</Text>
          </View>
        <TextInput 
        placeholder='Mensagem...'
        style={{
          paddingHorizontal: 10,
          height: 56,
          backgroundColor: '#fff',
          borderRadius: 12,
          fontSize: 14,
          paddingVertical: 7,
          paddingLeft: 20,
          fontFamily: 'DMSans_400Regular',
          borderWidth: 1,
          borderColor: '#DCDCDC',
          position: 'absolute', 
          bottom: 10, 
          left: 10, 
          right: 80, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
        }}/>
        <RectButton 
        style={{
          position: 'absolute', 
          bottom: 10, 
          right: 10, 
          zIndex: 5, 
          width: 60, 
          height: 60, 
          backgroundColor: '#d53f8c', 
          borderRadius: 30, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
        }}
        >
          <Feather name="arrow-right-circle" size={24} color="white" />
          </RectButton>
        </KeyboardAvoidingView>
    )
  }
  