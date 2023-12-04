import { View, Text, TextInput, Button, FlatList,StyleSheet, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

const PracticeAsyncStorage = () => {
const [expenseList,setExpenseList]=useState([])
const [selectedExpense,setSelectedExpense]=useState(null)
const [isEditable,setIsEditable]=useState(true)


const maxLimitValidation = {
    Petrol: 10000,
    Investment: 50000,
    Entertainment:4000,
    Food:15000,
    Hotel:5000
}
const [expenseDetail, setExpenseDetail] = useState({
    expenseHeadId:"",
    expenseHeadName:"",
    expenseHeadDetail:"",
    maxLimitForExpense:"",

})


useEffect(()=>{

    getDataFromAsyncStorage()
},[])

const validateInput = (expanseDetail)=>{
    if(expanseDetail.maxLimitForExpense > maxLimitValidation[expanseDetail.expenseHeadName]){
        return `Max Limit for ${expanseDetail.expenseHeadName} is ${maxLimitValidation[expanseDetail.expenseHeadName]}`
    }
    return null
}
const handleSave = async() =>{
    if(selectedExpense === null){
        if(validateInput(expenseDetail)){
            Alert.alert(validateInput(expenseDetail));
            return
        }
        let list = [...expenseList]
        list.push(expenseDetail)
        // console.log("list",list)
        await AsyncStorage.setItem("expenseList",JSON.stringify(list))
        await getDataFromAsyncStorage()
        await AsyncStorage.clear()
    }
    else{
        
        if(validateInput(expenseDetail)){
            Alert.alert(validateInput(expenseDetail));
            return
        }
        else{
            const index =  expenseList.findIndex(expense=> expenseDetail.expenseHeadId == expense.expenseHeadId);
            const updatedItem = expenseList;
            updatedItem[index] = expenseDetail
            await AsyncStorage.setItem("expenseList",JSON.stringify(updatedItem))
            await getDataFromAsyncStorage()
            setSelectedExpense(null)
            setIsEditable(true)
        }
    }
    setSelectedExpense(null)
    setExpenseDetail({
        expenseHeadId:"",
        expenseHeadName:"",
        expenseHeadDetail:"",
        maxLimitForExpense:"",
    
    })
    
}

const handleSelect = (item)=>{
    setSelectedExpense(item);
    setExpenseDetail(item)
    setIsEditable(false)
}
const getDataFromAsyncStorage = async()=>{
    // await AsyncStorage.clear()
    await AsyncStorage.setItem("expenseList",)
    let data= await AsyncStorage.getItem("expenseList",)
    // console.log("data",JSON.parse(data))
    setExpenseList(JSON.parse(data)??[])
}

const RenderList = ({item})=>(
    <TouchableOpacity  onPress={()=>handleSelect(item)} style={asyncStyles.list} >
        <Text >{`${item.expenseHeadId}  ${item.expenseHeadName}  ${item.expenseHeadDetail}  ${item.maxLimitForExpense}`}</Text>
        {/* <Text>{item.expenseHeadName}</Text>
        <Text>{item.expenseHeadDetail}</Text>
        <Text>{item.maxLimitForExpense}</Text> */}
    </TouchableOpacity>
)
  return (
    <View style={styles.container}>
        <Text>ExpenseHead ID</Text>
        <TextInput style={isEditable ?  styles.textInput : styles.disableTextInput} value={expenseDetail.expenseHeadId} onChangeText={text => setExpenseDetail({...expenseDetail,expenseHeadId:text})} editable={isEditable} />
        <Text>ExpenseHead Name</Text>
        <TextInput style={styles.textInput} value={expenseDetail.expenseHeadName} onChangeText={text => setExpenseDetail({...expenseDetail,expenseHeadName:text})}/>
        <Text>ExpenseHead Detail</Text>
        <TextInput style={styles.textInput} value={expenseDetail.expenseHeadDetail} onChangeText={text => setExpenseDetail({...expenseDetail,expenseHeadDetail:text})}/>
        <Text>Max Limit For Expense</Text>
        <TextInput style={styles.textInput} value={expenseDetail.maxLimitForExpense} onChangeText={text => setExpenseDetail({...expenseDetail,maxLimitForExpense:text})}/>
        <Button title='Save Expense' onPress={handleSave}/>
        <FlatList
            data={expenseList}
            keyExtractor={({expenseHeadId})=>expenseHeadId}
            renderItem={({item})=><RenderList item={item}/>}
        />
    </View>
  )
}

const asyncStyles=StyleSheet.create({
    list:{
        backgroundColor:'violet',
        padding:10
    }
})

export default PracticeAsyncStorage