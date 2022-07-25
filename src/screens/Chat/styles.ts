import styled, { css } from 'styled-components/native'
import { RectButton } from "react-native-gesture-handler";

export const Title = styled.Text`
font-size: 16px;
color: #aaa;

${({ theme }) => css`
font-family: ${ theme.FONTS.TITLE };
`}
`

export const Input = styled.TextInput`
font-size: 14px;
color: #181b23;
padding: 7px 10px 7px 20px;
height: 56px;
background-color: #fff;
border-radius: 12px;
font-size: 14px;
border: 1px solid #DCDCDC;
position: absolute; 
bottom: 10px; 
left: 10px; 
right: 80px; 
display: flex; 
justify-content: center; 
align-items: center;

${({ theme }) => css`
font-family: ${ theme.FONTS.TEXT };
`}
`

export const Container = styled.View`
flex: 1;
justify-content: center;
flex-direction: column;
align-items: center;
display: flex;
`

export const Button = styled(RectButton)`
position: absolute; 
bottom: 10px; 
right: 10px; 
z-index: 5px; 
width: 60px; 
height: 60px; 
background-color: #d53f8c; 
border-radius: 30px; 
display: flex; 
justify-content: center; 
align-items: center;
`