import styled, { css } from 'styled-components/native'

export const Title = styled.Text`
font-size: 14px;
padding-left: 10px;

${({ theme }) => css`
font-family: ${ theme.FONTS.TITLE };
color: ${ theme.COLORS.PRIMARY_900 }
`}
`

export const Container = styled.TouchableOpacity`
width: 100%;
padding: 0 20px;
border-bottom: 0.5px solid #ccc;
height: 50px;
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
`