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

export const Container = styled.View`
flex: 1;
justify-content: space-between;
flex-direction: column;
align-items: flex-start;
width: 100%;
`

export const Content = styled.View`
justify-content: space-between;
flex-direction: column;
align-items: flex-start;
width: 100%;
`