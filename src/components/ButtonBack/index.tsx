import React from 'react'
import { Container } from './styles'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'

export function ButtonBack(){
    const { COLORS } = useTheme()

    return(
        <Container>
            <MaterialIcons name="chevron-left" size={18} color={COLORS.TITLE}/>
        </Container>
    )
}