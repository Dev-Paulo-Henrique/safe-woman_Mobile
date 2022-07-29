import styled, { css } from 'styled-components/native'

export const Container = styled.View`
margin-bottom: 10;
border-radius: 8px;
padding: 10px;
background-color: ${({ theme }) => theme.COLORS.SUCCESS_900 };
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