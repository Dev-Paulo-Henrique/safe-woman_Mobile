import styled, { css } from 'styled-components/native'
// import { RectButton } from 'react-native-gesture-handler'

export const Container = styled.TouchableOpacity`
margin-bottom: 10px;
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

export const Title = styled.Text`
font-size: 14px;

${({ theme }) => css`
color: ${ theme.COLORS.TITLE };
font-family: ${ theme.FONTS.TEXT };
`}

`

export const Type = styled.Text`
font-size: 16px;
font-weight: bold;
font-size: 18px;
margin-bottom: 10px;

${({ theme }) => css`
color: ${ theme.COLORS.TITLE };
font-family: ${ theme.FONTS.TITLE };
`}

`

export const Name = styled.Text`
font-size: 26px;
font-weight: bold;
margin-top: 10px;

${({ theme }) => css`
color: ${ theme.COLORS.TITLE };
font-family: ${ theme.FONTS.TITLE };
`}

`