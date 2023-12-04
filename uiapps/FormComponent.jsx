import { View, Text } from 'react-native'
import React, { useState } from 'react'
import CustomForms from '../resuableUI/CustomForms'
import { styles } from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
const FormComponent = () => {
    const employee = {
        EmpNo: 0,
        EmpName: ''
    };
    const [formValues, setFormValues] = useState(employee)
    console.log(formValues)
const saveForm=async(formData)=>{
    await AsyncStorage.setItem('formData',JSON.stringify(formData));
    const data = await AsyncStorage.getItem('formData');
    console.log("data",data)
}
  return (
    <View style={styles.container}>
      <CustomForms employee={employee} saveForm={saveForm} formValues={formValues} setFormValues={(val)=>setFormValues(val)}/>
    </View>
  )
}

export default FormComponent