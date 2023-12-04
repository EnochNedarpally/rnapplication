import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

const SmartTextInput = (props) => {

/*Check for the invalid values for the props to control the rendering of TextInput*/
/*The parent to pass te label and text property to this component*/
/*Lets define the local state that will be used to render the textInput based on the
 validation of props received from the parent*/

 const submit =()=>{
    props.emitData(props.text.toUpperase())
 }
 const [bColor, setBColor] = useState("blue");
 if(props.text===undefined || props.text.length ===0){
    <View>
      <Text>{props.label}</Text>
      <TextInput value={props.text} style={{backgroundColor:"red"}}/>
      <Button title="Submit" onPress={submit} disabled={true}/>
    </View>
 }
 else {

 }
  return (
    <View>
      <Text>{props.label}</Text>
      <TextInput value={props.text} style={{backgroundColor:"violet"}}/>
      <Button title="Submit" disabled={true}/>
    </View>
  )
}

export default SmartTextInput

// const styles = StyleSheet.create({})