import { View, Text, FlatList,StyleSheet, Button, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listCategory } from '../../sagasapp/actions';
import { useNavigation } from '@react-navigation/native';

const Category = () => {

const dispatch = useDispatch();
const categoryData=useSelector(state=>state.categories);
const navigation = useNavigation();

useEffect(()=>{
  // dispatch(listCategory());
  dispatch(listCategory())
},[])
// console.log("categoryData",categoryData)

const handeleUpdatePress=(type,item)=>{
  if(type=="Delete"){
    navigation.navigate('AddCategory',{data:{type:type,category:item}});
  }
  if(type=="Update"){
    navigation.navigate('AddCategory',{data:{type:type,category:item}});
  }

}

const renderItem=({item})=>(
  <View style={styles.container}>
      <Text>{item.CategoryId}</Text>
      <Text>{item.CategoryName}</Text>
      <Text>{item.BasePrice}</Text>
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
        data={categoryData}
        keyExtractor={({ CategoryId }) => CategoryId}
        numColumns={2}
        renderItem={renderItem}
        ListFooterComponent={<Button onPress={({item})=>navigation.navigate("AddCategory",{data:{}})} title="Add Category"/>}
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