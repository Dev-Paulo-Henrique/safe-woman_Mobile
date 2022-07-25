import WebView from 'react-native-webview';
import { Platform, KeyboardAvoidingView} from 'react-native'
import {TIP} from '../../services/data';

export function Avaliar(){
    return(
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
        <WebView source={{ uri: `https://safe-woman.vercel.app/avaliar/${TIP[0].id}`}}/>
        </KeyboardAvoidingView>
    )
}