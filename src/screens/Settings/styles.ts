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

export const NameLabel = styled.Text`
font-size: 24px;

${({ theme }) => css`
font-family: ${ theme.FONTS.TEXT };
color: ${ theme.COLORS.PRIMARY_900 }
`}
`

export const Description = styled.Text`
font-size: 14px;

${({ theme }) => css`
font-family: ${ theme.FONTS.TEXT };
color: ${ theme.COLORS.PRIMARY_900 }
`}
`

export const Upload = styled.View`
width: 100%;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin: 32px 0;
padding: 0 12px
`