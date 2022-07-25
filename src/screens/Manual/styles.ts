import styled, { css } from 'styled-components/native'

export const Container = styled.View`
display: flex;
width: auto;
height: auto;
flex-direction: column;
align-items: center;
justify-content: space-between;
padding: 0 10px;
`

export const Content = styled.View`
display: flex;
width: 300;
height: auto;
flex-direction: column;
align-items: center;
justify-content: space-between;
padding: 10px 5px;
`

export const Text = styled.Text`
font-size: 14px;

${({ theme }) => css`
font-family: ${ theme.FONTS.TEXT };
`}
`