import { useEffect, useState } from "react";
import { View,Text,TextInput,Button } from "react-native";
import { useDispatch } from "react-redux";
import { styles } from "../../uiapps/styles";
import { addCategory, addProduct, deleteCategory, listCategory, listProducts, updateCategory, updateProduct } from "../../sagasapp/actions";
import { useNavigation, useRoute } from "@react-navigation/native";

const AddProduct = () => {
    const initialState={
    ProductUniqueId:0,
    ProductId:0,
    ProductName:"",
    Description:"",
    Price:0,
    CategoryId:0,
    Manufacturer:""
    }
    const [product,setProduct] = useState(initialState);
    const dispatch = useDispatch();
    const route = useRoute();
    const { data } = route.params;
    console.log("data",data.type)
    useEffect(()=>{
        if(data.product){
            console.log("data.product",data.product)
            setProduct(data.product)
        }
    },[data])
    // console.log("category",category)
    const navigation=useNavigation()
    const addCategoryData =() =>{
        /* Dispatch Action */
        if(data?.type=="Delete"){
            dispatch(deleteCategory(product.ProductUniqueId))
            dispatch(listProducts())
        }

        if(data?.type=="Update"){
            dispatch(updateProduct(product))
            dispatch(listProducts())
        }
        else{
            dispatch(addProduct(product))
            dispatch(listProducts())
        }
        dispatch(listProducts())
        navigation.navigate("Products")
    };
    return (
        <View style={styles.container}>
              <Text style={styles.text}>ProductId:</Text>
            <TextInput value={product.ProductId.toString()} style={data?.type == "Delete"  ?  styles.disableTextInput : styles.textInput}
              onChangeText={text=>setProduct({...product, ProductId:text})} editable={data?.type == "Delete" ? false : true}
            />
              <Text style={styles.text}>ProductName:</Text>
            <TextInput value={product.ProductName} style={data?.type == "Delete" ?  styles.disableTextInput : styles.textInput}
              onChangeText={text=>setProduct({...product, ProductName:text})} editable={data?.type == "Delete" ? false : true}
            />
              <Text style={styles.text}>Description:</Text>
            <TextInput value={product.Description} style={data?.type == "Delete"  ?  styles.disableTextInput : styles.textInput}
              onChangeText={text=>setProduct({...product, Description:text})} editable={data?.type == "Delete" ? false : true}
            />
              <Text style={styles.text}>Price:</Text>
            <TextInput value={product.Price.toString()} style={data?.type == "Delete" ?  styles.disableTextInput : styles.textInput}
              onChangeText={text=>setProduct({...product, Price:text})} editable={data?.type == "Delete" ? false : true}
            />
              <Text style={styles.text}>CategoryId:</Text>
            <TextInput value={product.CategoryId.toString()} style={data?.type == "Delete"  ?  styles.disableTextInput : styles.textInput}
              onChangeText={text=>setProduct({...product, CategoryId:text})} editable={data?.type == "Delete" ? false : true}
            />
              <Text style={styles.text}>Manufacturer:</Text>
            <TextInput value={product.Manufacturer} style={data?.type == "Delete" ?  styles.disableTextInput : styles.textInput}
              onChangeText={text=>setProduct({...product, Manufacturer:text})} editable={data?.type == "Delete" ? false : true}
            />
            <Button title={data?.type ?? "Save"} onPress={addCategoryData}/>
        </View>
    );
};

export default AddProduct;
