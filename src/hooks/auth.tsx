import React, { createContext, useContext, ReactNode, useState } from 'react'
import auth, { firebase } from '@react-native-firebase/auth'
import { Alert } from 'react-native'

type AuthContextData = {
    signIn: (email: string, password: string) => Promise<void>;
    isLogging: boolean;
    isLogged: boolean;
    adminIsLogged: boolean;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({children}: AuthProviderProps){
    const [ isLogging, setIsLogging ] = useState(false)
    const [ isLogged, setIsLogged ] = useState(false)
    const [ adminIsLogged, setAdminIsLogged ] = useState(false)

    async function signIn(email: string, password: string){
        if(!email || !password){
            return Alert.alert('Login', 'Informe o e-mail e a senha.')
        }   
        
        setIsLogging(true)
        if(email === 'teste@gmail.com' && password === '123123123'){
            setTimeout(() => {setIsLogging(false), setIsLogged(true)}, 2000)
            
        }else if(email === 'admin' && password === 'admin'){
            setTimeout(() => {setIsLogging(false), setAdminIsLogged(true)}, 2000)
        }
        setTimeout(() => setIsLogging(false), 2000)
        

    }

    return (
        <AuthContext.Provider value={{
            signIn,
            isLogging,
            isLogged,
            adminIsLogged
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext)

    return context
}

export { AuthProvider, useAuth }