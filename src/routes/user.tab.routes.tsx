import React from 'react'
import { Platform } from 'react-native'
import { useTheme } from 'styled-components/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons, AntDesign, MaterialIcons } from '@expo/vector-icons'

// import { Orders } from '../screens/Orders'
// import { Home } from '../screens/Home'

import { Profile } from '../screens/Profile'
import { MyStack, Home } from '../screens/Home'
import { Police } from '../screens/Police'
// import { Chat } from '../screens/Chat'

const { Navigator, Screen } = createBottomTabNavigator()

export function UserTabRoutes(){
    const { COLORS } = useTheme()

    return(
        <Navigator
        initialRouteName="MyStack"
        screenOptions={{
            tabBarActiveTintColor: COLORS.SECONDARY_900,
            tabBarInactiveTintColor: COLORS.PRIMARY_50,
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                height: 40,
                backgroundColor: '#181B23',
                borderTopColor: COLORS.SHAPE,
                borderTopWidth: 1,
                paddingVertical: Platform.OS === 'ios' ? 20 : 0
            }
        }}
        >
            <Screen 
            name="MyStack"
            component={MyStack}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="home" color={color} size={size} />
                    ),
                }}
            />
                <Screen 
                name="Police"
                component={Police}
                options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="local-police" color={color} size={size} />
                  ),
                }}
                />
                <Screen 
                name="Profile"
                component={Profile}
                options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="person" color={color} size={size} />
                  ),
                }}
                />
                
        </Navigator>
    )
}