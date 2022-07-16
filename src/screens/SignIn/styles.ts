import styled, { css } from 'styled-components/native'
import { getBottomSpace } from 'react-native-iphone-x-helper'

export const Container = styled.ScrollView.attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        paddingBottom: getBottomSpace() + 48
    },

})`
 width: 100%;
 padding: 0 32px;
`

export const Title = styled.Text`
font-size: 32px;
margin-bottom: 24px;
align-self: flex-start;

${({ theme }) => css`
font-family: ${ theme.FONTS.TEXT };
color: ${ theme.COLORS.TITLE };
`}
`

export const Brand = styled.Image.attrs({
    resizeMode: 'contain'
})`
height: 200px;
margin-top: 64px;
margin-bottom: 12px
`

export const ForgotPasswordButton = styled.TouchableOpacity`
align-self: flex-end;
margin-bottom: 20px;
`

export const ForgotPasswordLabel = styled.Text`
font-size: 14px;

${({ theme }) => css`
font-family: ${ theme.FONTS.TEXT };
color: ${ theme.COLORS.TITLE };
`}
`

export const GoogleButton = styled.TouchableOpacity`
flex: 1;
max-height: 56px;
min-height: 56px;
border-radius: 12px;
justify-content: center;
align-items: center;
margin-top: 12px;
background-color: ${({ theme }) =>  theme.COLORS.GOOGLE };
`