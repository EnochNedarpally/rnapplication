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
                    <Text style={{fontSize:16,marginVertical:10}}>{key}</Text>
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
        fontSize:24,
        marginTop:55,
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
        backgroundColor: '#e4e4e4',
        borderWidth: 2,
        borderRadius: 5,
        width:300,
        color:'#464646'
    },
    button:{
        backgroundColor:'#67ceeb',
        width:100,
        padding:10,
        alignItems:'center',
        borderRadius:10,
        cursor:'pointer',
        '&:hover':{
            backgroundColor:'#1495b9',
        }
    }
})