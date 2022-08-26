import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useAuth } from '../hooks/auth'
import { SignIn } from '../screens/SignIn'
import { Police } from '../screens/Police/index'

export function Routes(){
    const { adminIsLogged } = useAuth()
    return(
        <NavigationContainer>
            {adminIsLogged ? <Police/> :<SignIn/>}
        </NavigationContainer>
    )
}