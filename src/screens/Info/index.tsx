import { Platform, KeyboardAvoidingView, View, Text } from 'react-native'
import { Photo } from '../../components/Photo';
import { Upload, NameLabel, Description } from './styles'
import { Feather } from '@expo/vector-icons'

export function Info(){
    return(
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
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
        <View style={{
          marginLeft: 20,
          marginTop: 10,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          // justifyContent: 'space-between'
        }}>
          <Feather name="instagram" size={25} color="#d53f8c"/>
          <Text style={{
            marginLeft: 5,
            color: "#d53f8c"
          }}>@safewoman22</Text>
        </View>
        </KeyboardAvoidingView>
    )
}