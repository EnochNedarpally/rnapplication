import { useState } from "react";
import { View,Text,TextInput,Button } from "react-native";
import { useDispatch } from "react-redux";
import { styles } from "../../uiapps/styles";
import {addCategory} from './../actions';

const AddCategoryComponent = () => {
    const [category,setCategory] = useState({CategoryId:'0', CategoryName:'',BasePrice:'0'});
    const dispatch = useDispatch();
    const addCategoryData =() =>{
        /* Dispatch Action */
        dispatch(addCategory(category))
    };
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Category Id:</Text>
            <TextInput value={category.CategoryId} style={styles.textInput}
              onChangeText={text=>setCategory({...category, CategoryId:text})}
            />
              <Text style={styles.text}>Category Name:</Text>
            <TextInput value={category.CategoryName} style={styles.textInput}
              onChangeText={text=>setCategory({...category, CategoryName:text})}
            />
              <Text style={styles.text}>Base Price:</Text>
            <TextInput value={category.BasePrice} style={styles.textInput}
              onChangeText={text=>setCategory({...category, BasePrice:text})}
            />
            <Button title="Save" onPress={addCategoryData}/>
        </View>
    );
};

export default AddCategoryComponent;
