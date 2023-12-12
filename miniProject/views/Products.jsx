import { View, Text, FlatList,StyleSheet, Button, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listCategory, listProducts } from '../../sagasapp/actions';
import { useNavigation } from '@react-navigation/native';

const Category = () => {

const dispatch = useDispatch();
const productData=useSelector(state=>state.products);
const navigation = useNavigation();

useEffect(()=>{
  // dispatch(listCategory());
  dispatch(listProducts())
},[])
console.log("productData",productData)

const handeleUpdatePress=(type,item)=>{
  if(type=="Delete"){
    navigation.navigate('AddProduct',{data:{type:type,product:item}});
  }
  if(type=="Update"){
    navigation.navigate('AddProduct',{data:{type:type,product:item}});
  }

}

// ProductUniqueId:0,
// ProductId:0,
// ProductName:"",
// Description:"",
// Price:0,
// CategoryId:0,
// Manufacturer:""
const renderItem=({item})=>(
  <View style={styles.container}>
      <Text>{item.ProductUniqueId}</Text>
      <Text>{item.ProductId}</Text>
      <Text>{item.ProductName}</Text>
      <Text>{item.Description}</Text>
      <Text>{item.Price}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={()=>handeleUpdatePress("Update",item)} style={styles.actionButton}>
            <Text>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handeleUpdatePress("Delete",item)} style={styles.actionButton}>
            <Text>Delete</Text>
        </TouchableOpacity>
      </View>
  </View>
)
  return (
    <View>
        <FlatList
        data={productData}
        keyExtractor={({ ProductId }) => ProductId}
        numColumns={2}
        renderItem={renderItem}
        ListFooterComponent={<Button onPress={({item})=>navigation.navigate("AddProduct",{data:{}})} title="Add Product"/>}
        />
        
    </View>
  )
}


const styles=StyleSheet.create({
  container:{
    borderWidth:2,
    borderColor:"gray",
    padding:5,
  },
  buttons:{
    flexDirection:'row',
    gap:5,
  },
  actionButton:{
    backgroundColor:'violet',
    padding:5
  }
})
export default Category