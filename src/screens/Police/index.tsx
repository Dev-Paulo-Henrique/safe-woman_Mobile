import React from 'react';
import { DeleteLabel, Title, Upload } from './styles'
import { Platform, KeyboardAvoidingView, TouchableOpacity, Alert, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../../theme'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { ButtonBack } from '../../components/ButtonBack';
import { Photo } from '../../components/Photo';
import { Button as PickImageButton } from '../../components/Button'
import { WebView } from 'react-native-webview';
import { Feather } from '@expo/vector-icons';


export function Police(){
    return(
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
            {/* <LinearGradient
        colors={theme.COLORS.GRADIENT}
        style={{
            // flex: 1,
            // display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            paddingTop: (getStatusBarHeight() + 20),
            paddingHorizontal: 20,
            paddingBottom: 24
        }}
        > */}
            {/* <ButtonBack/> */}
            {/* <Title>SafeWatch</Title> */}
            <TouchableOpacity style={{position: 'absolute', bottom: 10, right: 10, zIndex: 5, width: 60, height: 60, backgroundColor: '#d53f8c', borderRadius: 30, display: 'flex', justifyContent: 'center', alignItems: 'center'}} onPress={() => Alert.alert('Erro', 'Ocorreu um erro ao conectar um dispositivo.')}>
            <Feather name="watch" size={25} color="white" />
            </TouchableOpacity>
        {/* </LinearGradient> */}
        <WebView style={{ flex: 1, marginTop: -150, marginBottom: -500}} source={{ uri: `https://www.google.com.br/maps/search/policia` }}/>
        {/* <View style={{position: 'absolute', zIndex: 5, top: 95, width: '100%', height: '100%'}}/> */}
        </KeyboardAvoidingView>
    )
}

