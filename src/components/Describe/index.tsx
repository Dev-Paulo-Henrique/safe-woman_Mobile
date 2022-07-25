import React from 'react'
import { Container, Title } from './styles'

type Props = {
    title: string; 
}

export function Describe({ title, ...rest }:Props){
    return (
        <Container {...rest}>
            <Title>{title}</Title>
        </Container>
    )
}