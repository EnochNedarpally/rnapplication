import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomForms = ({employee,setFormValues,formValues,saveForm}) => {

    const save=()=>{
        
    }
    return (
        <View style={styles.formContainer}>
            <Text style={styles.header}>CustomForms</Text>
            <View style={styles.form}>
            {Object.keys(employee).map(key => (
                <View key={key}>
                    <Text>{key}</Text>
                    <TextInput value={formValues.key} onChangeText={text=>setFormValues({...formValues,[key]:text})} style={styles.input} />
                </View>
            ))}
            <TouchableOpacity onPress={()=>saveForm(formValues)} style={styles.button}>
                        <Text>Save</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomForms

const styles = StyleSheet.create({
    formContainer:{
        flex:1,
        marginHorizontal:20,
        alignItems:'center',
        justifyContent:'center',
    },
    header:{
        fontSize:18,
        marginHorizontal:15,
        fontWeight:'600'
    },
    form:{
        flex:1,
        alignItems:'center',
        gap:10,
        // borderWidth:2,
        // borderColor:'grey',
        // borderRadius:7,
    },
    input: {
        backgroundColor: 'grey',
        borderWidth: 2,
        borderRadius: 5,
        width:300,
        color:'white'
    },
    button:{
        backgroundColor:'crimson',
        width:100,
        padding:10,
        alignItems:'center',
        borderRadius:10
    }
})