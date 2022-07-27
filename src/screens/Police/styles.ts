import styled, { css } from 'styled-components/native'

export const Title = styled.Text`
text-align: center;
font-weight: bold;
font-size: 18;

${({ theme }) => css`
font-family: ${ theme.FONTS.TITLE };
color: ${ theme.COLORS.TITLE }
`}
`

export const Container = styled.View`
flex: 1;
`

export const Scroll = styled.ScrollView`
margin-bottom: -350px;

${({ theme }) => css`
background-color: ${ theme.COLORS.PRIMARY_900 }
`}
`

export const Content = styled.View`
display: flex;
align-items: center;
padding-top: 50px;
`

export const Description = styled.View`
margin-bottom: 100%;
width: 100%;
display: flex;
padding: 20px;
`

export const Unity = styled.View`
display: flex;
flex-direction: row;
justify-content: space-between;
`

export const Web = styled.View`
width: 100%;
height: 400px;
margin-bottom: -150px;
`

export const Index = styled.View`
padding: 10px 0;

${({ theme }) => css`
background-color: ${ theme.COLORS.PRIMARY_900 }
`}
`

export const Load = styled.View`
align-items: center;
width: 100%;
justify-content: center;
flex: 1;

${({ theme }) => css`
background-color: ${ theme.COLORS.PRIMARY_900 }
`}
`

export const Button = styled.TouchableOpacity`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-top: 10px;
padding-right: 10px;

${({ theme }) => css`
background-color: ${ theme.COLORS.SUCCESS_900 }
`}
`

export const See = styled.TouchableOpacity`
border-radius: 8px;
padding: 10px;
margin-top: 10px;
height: 60px;
justify-content: center;

${({ theme }) => css`
background-color: ${ theme.COLORS.PRIMARY_800 }
`}
`