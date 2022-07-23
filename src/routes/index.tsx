import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { UserTabRoutes } from './user.tab.routes'
import { useAuth } from '../hooks/auth'
import { SignIn } from '../screens/SignIn'
import { Police } from '../screens/Police/index'

export function Routes(){
    const { isLogged, adminIsLogged } = useAuth()
    return(
        <NavigationContainer>
            {isLogged ? <UserTabRoutes/> : adminIsLogged ? <Police/> :<SignIn/>}
        </NavigationContainer>
    )
}