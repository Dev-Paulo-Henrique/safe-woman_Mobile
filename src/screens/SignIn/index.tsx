import React, { useState } from 'react'
import { Container, Title, Brand, GoogleButton, ForgotPasswordButton, ForgotPasswordLabel } from './styles'
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../../theme';
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { KeyboardAvoidingView, Platform, TouchableOpacity, Text, Alert } from 'react-native'
import brandImg from '../../assets/icon.png'
import { useAuth } from '../../hooks/auth'
import { AntDesign } from '@expo/vector-icons'

export function SignIn(){
    const { signIn, isLogging } = useAuth()
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    function handleSignIn(){
        signIn(email, password)
    }

    return(
        <LinearGradient
        colors={theme.COLORS.GRADIENT}
        style={{flex: 1, display: 'flex', justifyContent: 'center'}}
        >
            <KeyboardAvoidingView behavior={ Platform.OS === 'ios' ? 'padding' : undefined }>
            <Container>
            <Brand source={brandImg}/>
            <Title>Login</Title>
            <Input placeholder='E-mail' type="secondary" onChangeText={setEmail} autoCorrect={false} autoCapitalize="none"/>
            <Input placeholder='Senha' type="secondary" onChangeText={setPassword} secureTextEntry/>
            <ForgotPasswordButton onPress={() => Alert.alert('Erro', 'Este serviço não está disponível no momento.')}>
                <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
            </ForgotPasswordButton>
            <TouchableOpacity onPress={handleSignIn}>
            <Button title="Entrar" type="secondary" isLoading={isLogging}/>
            </TouchableOpacity>
            <GoogleButton onPress={() => Alert.alert('Erro', 'Este serviço não está disponível no momento.')}>
            <AntDesign name="google" size={25} color="#FFF" />
            </GoogleButton>
            </Container>
            </KeyboardAvoidingView>
        </LinearGradient>
    )
}