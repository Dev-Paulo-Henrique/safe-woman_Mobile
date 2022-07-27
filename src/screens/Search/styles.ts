import styled, { css } from 'styled-components/native'

export const Input = styled.TextInput`
position: absolute;
height: 50px;
top: 20px;
left: 20px;
right: 80px;
background-color: #FFF;
color: #333;
border-radius: 25px;
padding: 0 20px;
font-size: 16px;
border: 1px solid #ddd;

${({ theme }) => css`
font-family: ${ theme.FONTS.TITLE };
`}
`

export const Name = styled.Text`
font-weight: bold;
font-size: 16;
margin-bottom: 5;

${({ theme }) => css`
font-family: ${ theme.FONTS.TITLE };
color: ${ theme.COLORS.PRIMARY_900 }
`}
`

export const Number = styled.Text`
color: #888

${({ theme }) => css`
font-family: ${ theme.FONTS.TITLE };
`}
`

export const Bio = styled.Text`
color: #666;
margin-top: 5px;

${({ theme }) => css`
font-family: ${ theme.FONTS.TITLE };
`}
`

export const Tech = styled.Text`
margin-top: 5px;

${({ theme }) => css`
font-family: ${ theme.FONTS.TITLE };
`}
`

export const Container = styled.View`
display: flex;
justify-content: center;
padding: 20px;
padding-bottom: 0;
flex-direction: row;
width: 100%;
`

export const Scroll = styled.ScrollView`
margin-bottom: -350px;

${({ theme }) => css`
background-color: ${ theme.COLORS.PRIMARY_900 }
`}
`

export const Content = styled.View`
display: flex;
flex-direction: row;
align-items: center;
`

export const SecondContent = styled.View`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`

export const Callout = styled.View`
width: 100%;
height: auto;
background-color: #fff;
border-radius: 4px;
margin-bottom: 20px;
padding: 10px;
`

export const ViewUser = styled.View`
width: 100%;
height: auto;
display: flex;
margin-bottom: 50px;
border-radius: 25px;
justify-content: center;
top: 70px;
`

export const Button = styled.TouchableOpacity`
position: absolute;
right: 20px;
top: 20px;
width: 50px;
height: 50px;
border-radius: 25px;
justify-content: center;
align-items: center;
margin-left: 15px;

${({ theme }) => css`
background-color: ${ theme.COLORS.PRIMARY_800 }
`}
`

export const Img = styled.Image`
width: 54px;
height: 54px;
border-radius: 50%;
margin-right: 20px;
`