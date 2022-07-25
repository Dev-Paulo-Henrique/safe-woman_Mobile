import { Platform, KeyboardAvoidingView, View, Text, FlatList } from 'react-native'
import { TIP } from '../../services/data'

export function Manual(){
    return(
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
        <FlatList
        data={TIP}
        keyExtractor={(TIP) => TIP.id}
        renderItem={({ item }) => (
          <View style={{
            display: 'flex',
            width: 'auto',
            height: 'auto',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            borderColor: "#ccc",
            borderBottomWidth: 0.5,
          }}>
          <View style={{
            height: 'auto',
            width: 300,
            paddingTop: 10,
            paddingBottom: 20,
            display: 'flex',
            // flexDirection: 'column',
            justifyContent: "space-between"
          }}>
          <Text
            style={{
              fontSize: 14,
              color: "#000",
            }}
          >
            {item.message}
          </Text>
          </View>
          </View>
        )}
        style={{
          backgroundColor: "#fff",
          width: "100%",
          height: "auto",
        }}
      />
        </KeyboardAvoidingView>
    )
}