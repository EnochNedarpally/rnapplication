import { View, Text, Button, Alert } from 'react-native'
import React from 'react'
import { styles } from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

const storageComponent = () => {

const setData = async()=>{
    await AsyncStorage.setItem("myKey","Data in Async Storage")
}
const getData = async()=>{
    let data = await AsyncStorage.getItem("myKey");
    Alert.alert(`Data in storage = ${data}`)
    let keys = await AsyncStorage.getAllKeys();
    Alert.alert(`All Keys ${JSON.stringify(keys)}`)
    // return data
}

const clearKeys = async()=>{
    await AsyncStorage.clear()
}
  return (
    <View style={styles.container}>
      <Text style={styles.text}>storageComponent</Text>
      <Button title="Set Data" onPress={setData}/>
      <Button title="Get Data" onPress={getData}/>
      <Button title="Clear" onPress={clearKeys}/>
    </View>
  )
}

export default storageComponent