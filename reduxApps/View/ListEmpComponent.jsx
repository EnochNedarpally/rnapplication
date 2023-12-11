import { View, Text, FlatList, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { selEmp } from '../actions'

const ListEmpComponent = (props) => {
  const dispatch =useDispatch()
    console.log("props.data",props.data)

    const selectEmployee=(empNo)=>{
      console.log("empNo in list ",empNo)
      dispatch(selEmp(empNo))
    }
    const renderEmpList =({item})=>(
        <TouchableOpacity onPress={()=>selectEmployee(item)}>
            <Text>
                {`${item.EmpNo}  ${item.EmpName}  `}
            </Text>
        </TouchableOpacity>
    )
  return (
    <View>
      <Text>ListEmpComponent</Text>
      <FlatList
      data={props.data}
      keyExtractor={({EmpNo})=>EmpNo}
      renderItem={renderEmpList}
      />

    </View>
  )
}

export default ListEmpComponent