import React, {useState} from 'react'
import { Container } from './styles'
import { Feather } from '@expo/vector-icons';
import { Modal, Pressable, ActivityIndicator, View, Text, Alert } from 'react-native'


export function Mode(){
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
        <Container  onPress={() => setModalVisible(true)}>
            <Feather name="watch" size={25} color="white" />
        </Container>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  }}>
          <View style={{
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }}>
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    }}>
    <ActivityIndicator size="small" color="#d53f8c"/>
            <Text style={{
              marginLeft: 5,
              textAlign: 'center',
  }}>
  Procurando...
  </Text>
    </View>
            <Pressable
              style={[{
                borderRadius: 8,
                padding: 10,
                elevation: 2,
              }, {
                backgroundColor: '#d33',
              }]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
        </>
    )
}