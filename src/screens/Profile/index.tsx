import React from 'react'
import { DeleteLabel, Title, Upload, NameLabel, Description } from './styles'
import { Platform, KeyboardAvoidingView, TouchableOpacity, View, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../../theme'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { ButtonBack } from '../../components/ButtonBack';
import { Photo } from '../../components/Photo';
import { Button as PickImageButton } from '../../components/Button'
import { AntDesign } from '@expo/vector-icons'

export function Profile(){
    return(
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
        <TouchableOpacity style={{position: 'absolute', bottom: 10, right: 10, zIndex: 5, width: 60, height: 60, backgroundColor: '#181b23', borderRadius: 30, display: 'flex', justifyContent: 'center', alignItems: 'center'}} onPress={() => Alert.alert('Erro', 'Este serviço não está disponível no momento.')}>
            <AntDesign name="star" size={25} color="white" />
        </TouchableOpacity>
        <Upload>
        <Photo uri="https://trello.com/1/cards/629a99a52a684d06bb95777e/attachments/62a9bf0d5caccd08b376817f/download/grupo.jpg"/>
        <View style={{display: 'flex'}}>
        <NameLabel style={{
            marginRight: 16,
            fontWeight: 'bold'
        }}>Safe Woman</NameLabel>
        <Description style={{
            color: '#888'
        }}>Desde 2022</Description>
        </View>
        </Upload>
        <Description style={{
            marginTop: -20,
            textAlign: 'justify',
            paddingHorizontal: 20
        }}>A Safe Woman é uma startup de segurança brasileira focada em entregar o melhor valor a seus clientes. Nós começamos a operar em Abril de 2022 com os melhores profissionais do país. Nossa especialidade é no desenvolvimento e aprimoração da segurança feminina utilizando as melhores tecnologias.

        A Safe Woman segue uma filosofia simples de Oss: dedicar seu talento e tecnologia à criação de produtos e serviços superiores que contribuam para uma sociedade global melhor.</Description>
        </KeyboardAvoidingView>
    )
}