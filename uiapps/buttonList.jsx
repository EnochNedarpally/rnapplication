import { Button, StyleSheet, View } from 'react-native'
import React from 'react'

const ButtonList = (props) => {
const emitValue=(val)=>{
    props.selectedValue(val)
}
  return (
    <View style={styles.container}>
        {
            props.collections.map((c,id)=>(
                <Button onPress={()=>emitValue(c)} style={styles.button} title={`${c}`} key={id}/>
            ))
        }
    </View>
  )
}

export default ButtonList

const styles = StyleSheet.create({
    container:{
        width:'100%',
        justifyContent:'center'
    },
    button:{
        fontFamily:'Times New Roman',
        fontSize:20,
        fontWeight:'bold',
        color:'black'
    }
})