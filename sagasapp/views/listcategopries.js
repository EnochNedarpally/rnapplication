import { View,Text, Button } from "react-native";
import { styles } from "../../uiapps/styles";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { listCategory } from "../actions";

const ListCategoryComponent =(props)=>{
    const dispatch=useDispatch();

  useEffect(()=>{
    getCategoryList()
  },[])

  const getCategoryList=()=>{
    dispatch(listCategory())
  }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>List of Categories</Text>
            <Button title="Get Categories" getCategoryList />
            <Text>{JSON.stringify(props.categories)}</Text>
        </View>
    );
};

export default ListCategoryComponent;