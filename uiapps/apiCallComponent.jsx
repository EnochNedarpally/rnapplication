import { useState,useEffect } from 'react'
import { View, Text, Button, ActivityIndicator, TextInput, FlatList, Alert } from 'react-native'
import { styles } from './styles'
import { HttpService } from '../services/httpServices'

const ApiCallComponent = () => {
const [categories, setCategories] = useState([]);
const [category, setCategory] = useState(
    {
        "CategoryId": "",
        "CategoryName": "",
        "BasePrice": ""
    }
);
const [isCompleted, setIsCompleted] = useState(false);
const [isError, setIsError] = useState(true);
const [error, setError] = useState({
    "CategoryId": null,
    "CategoryName": null,
    "BasePrice": null
});

const serv = new HttpService();

/* Get data post mounting of the component*/

useEffect(()=>{
    serv.getCategories()
    .then(res=>{
        setCategories(res.data)
        setIsCompleted(true)
    })
    .catch(error=> console.log(error))
},[])

useEffect(()=>{
    checkNullValue();
    checkIfIdExist(category.CategoryId)
},[category])


const checkNullValue=()=>{
    const isEmpty = Object.values(category).findIndex(val=>val == "")
    if(isEmpty <0){
        setIsError(false)
    }
}


const checkIfIdExist=(text)=>{
    const idExist = categories.findIndex(c=>c.CategoryId==text)
    let errorMessage={
        "CategoryId": null,
        "CategoryName": null,
        "BasePrice": null
    }
    if(idExist >=0 ){
        errorMessage.CategoryId=true
    }
    setError(errorMessage)
}
const validateInput=(cat)=>{
    let errorMessage={
        "CategoryId": null,
        "CategoryName": null,
        "BasePrice": null
    }
    
   
    // checkEmptyValue(cat)
   
    if(cat.CategoryName[0] !== cat.CategoryName[0].toUpperCase() ){
        Alert.alert("Category Name should start with a Capital letter")
        errorMessage={...error,CategoryName:true}
    }
    if(cat.BasePrice < 0){
        Alert.alert("Base price should be greater than 0")
        errorMessage={...error,BasePrice:true}
    }
    
    setError(errorMessage)
    return true
}

const save =()=>{
    // let cat = {
    //     "CategoryId": 1321,
    //     "CategoryName": "New-Cat-21030",
    //     "BasePrice": 3000
    // }

    validateInput(category)
    // serv.postCategories(cat)
    // .then(res=>{
    //     //Add te newly created record un the array
    //     setCategories([...categories,res.data])
    // })
    // .catch(err=> {
    //     console.log(err)
    // })
}

const RenderCategory = ({item})=>(
    <View>
        <Text>{`${item.CategoryId} ${item.CategoryName} ${item.BasePrice}`}</Text>
    </View>
)
  return (
    <View style={styles.container}>
        {!isCompleted && <ActivityIndicator/>}
      {/* <Text style={styles.text}>{JSON.stringify(categories)}</Text> */}
      <Text>Category Id</Text>
      <TextInput style={{...styles.textInput,borderWidth:error.CategoryId ? 2:0,borderColor:error.CategoryId ? "red":"transparent"}} value ={category.CategoryId} onChangeText={text=>{setCategory({...category,CategoryId:text})}}/>
      {error.CategoryId && <Text style={{color:'red',margin:5}}>Id should be unique</Text>}
      <Text>Category Name</Text>
      <TextInput style={styles.textInput} value ={category.CategoryName} onChangeText={text=>setCategory({...category,CategoryName:text})}/>
      <Text>Base Price</Text>
      <TextInput style={styles.textInput} value ={category.BasePrice} onChangeText={text=>{setCategory({...category,BasePrice:text})}}/>
      <Button onPress={save} disabled={isError} title='Add Category' />
      <FlatList
        data={categories}
        keyExtractor={({CategoryId})=>CategoryId}
        renderItem={({item})=><RenderCategory item={item}/>}
      />
    </View>
  )
}

export default ApiCallComponent