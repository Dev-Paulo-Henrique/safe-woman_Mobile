import styled, { css } from 'styled-components/native'

export const Title = styled.Text`
font-size: 24px;

${({ theme }) => css`
font-family: ${ theme.FONTS.TITLE };
color: ${ theme.COLORS.TITLE }
`}
`

export const DeleteLabel = styled.Text`
font-size: 14px;

${({ theme }) => css`
font-family: ${ theme.FONTS.TEXT };
color: ${ theme.COLORS.TITLE }
`}
`

export const Upload = styled.View`
width: 100%;
flex-direction: row;
justify-content: center;
align-items: center;
margin: 32px 0;
`

export const Container = styled.View`
display: flex;
align-items: flex-start;
justify-content: flex-start;
flex: 1;
`

export const Content = styled.View`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
position: absolute;
top: 10px;
left: 10px;
right: 10px;
`