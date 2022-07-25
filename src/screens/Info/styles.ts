import styled, { css } from 'styled-components/native'

export const Upload = styled.View`
width: 100%;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin: 32px 0;
padding: 0 12px
`

export const Container = styled.View`
display: flex;
`

export const Name = styled.Text`
margin-left: 5px;
color: #d53f8c;
`

export const Insta = styled.View`
margin-left: 20px;
margin-top: 10px;
display: flex;
flex-direction: row;
align-items: center;
`

export const Since = styled.Text`
font-size: 14px;
color: #888;

${({ theme }) => css`
font-family: ${ theme.FONTS.TEXT };
`}
`

export const Description = styled.Text`
font-size: 14px;
margin-top: -20px;
text-align: justify;
padding: 0 20px;

${({ theme }) => css`
font-family: ${ theme.FONTS.TEXT };
color: ${ theme.COLORS.PRIMARY_900 }
`}
`

export const NameLabel = styled.Text`
font-size: 24px;
margin-right: 16px;
font-weight: bold;

${({ theme }) => css`
font-family: ${ theme.FONTS.TEXT };
color: ${ theme.COLORS.PRIMARY_900 }
`}
`