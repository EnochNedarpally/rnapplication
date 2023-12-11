import { View, Text, TextInput, Button } from 'react-native'
import {useState} from 'react'
import { styles } from '../../uiapps/styles'
import {useDispatch,useSelector} from 'react-redux'
import { addEmp, clearselEmp } from '../actions'

const AddEmpComponent = () => {
const selectedEmployee = useSelector(state=>state.selEmp)

const dispatch= useDispatch();
    const [emp, setEmp] = useState({
        EmpNo:"0",
        EmpName:""
    })
const saveEmp=()=>{
    dispatch(addEmp(emp))
    dispatch(clearselEmp(emp))
    setEmp({
        EmpNo:"0",
        EmpName:""
    })
}
  return (
    <View style={styles.container}>
    <Text style={styles.text}>EmpNo</Text>
    <TextInput style={styles.textInput}
      value={selectedEmployee ? selectedEmployee.EmpNo :emp.EmpNo}
      onChangeText={text=>setEmp({...emp, EmpNo:text})}
     />
      <Text style={styles.text}>EmpName</Text>
    <TextInput style={styles.textInput}
      value={selectedEmployee ? selectedEmployee.EmpName :emp.EmpName}
      onChangeText={text=>setEmp({...emp, EmpName:text})}
     />
     
     <Button title="Save Emp" onPress={saveEmp}/>
</View>
  )
}

export default AddEmpComponent