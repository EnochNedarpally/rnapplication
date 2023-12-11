import { useEffect, useState } from "react";
import { View,Text,TextInput,Button } from "react-native";
import { useDispatch } from "react-redux";
import { styles } from "../../uiapps/styles";
import { addCategory, deleteCategory, listCategory, updateCategory } from "../../sagasapp/actions";
import { useNavigation, useRoute } from "@react-navigation/native";

const AddCategory = () => {
    const [category,setCategory] = useState({CategoryId:'0', CategoryName:'',BasePrice:'0'});
    const dispatch = useDispatch();
    const route = useRoute();
    const { data } = route.params;
    console.log("data",data.type)
    useEffect(()=>{
        if(data.category){
            setCategory(data.category)
        }
    },[data])
    // console.log("category",category)
    const navigation=useNavigation()
    const addCategoryData =() =>{
        /* Dispatch Action */
        if(data?.type=="Delete"){
            dispatch(deleteCategory(category.CategoryId))
            // dispatch(listCategory())
        }

        if(data?.type=="Update"){
            dispatch(updateCategory(category))
            // dispatch(listCategory())
        }
        else{

            dispatch(addCategory(category))
            // dispatch(listCategory())
        }
        dispatch(listCategory())
        navigation.navigate("Category")
    };
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Category Id:</Text>
            <TextInput value={category.CategoryId.toString()} style={data?.type == "Delete" || data?.type == "Update"  ?  styles.disableTextInput : styles.textInput}
              onChangeText={text=>setCategory({...category, CategoryId:text})} editable={data?.type == "Delete" ? false : true} 
            />
              <Text style={styles.text}>Category Name:</Text>
            <TextInput value={category.CategoryName.toString()} style={data?.type == "Delete"  ?  styles.disableTextInput : styles.textInput}
              onChangeText={text=>setCategory({...category, CategoryName:text})} editable={data?.type == "Delete" ? false : true}
            />
              <Text style={styles.text}>Base Price:</Text>
            <TextInput value={category.BasePrice.toString()} style={data?.type == "Delete" ?  styles.disableTextInput : styles.textInput}
              onChangeText={text=>setCategory({...category, BasePrice:text})} editable={data?.type == "Delete" ? false : true}
            />
            <Button title={data?.type ?? "Save"} onPress={addCategoryData}/>
        </View>
    );
};

export default AddCategory;
