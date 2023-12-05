import { useState, useEffect } from 'react'
import { View, Text, Button, ActivityIndicator, TextInput, FlatList, Alert } from 'react-native'
import { styles } from './styles'
import { HttpService } from '../services/httpServices'

const initialStateForCategory ={
    "CategoryId": "",
    "CategoryName": "",
    "BasePrice": ""
}
const ApiCallComponent = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(initialStateForCategory);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isError, setIsError] = useState(true);
    const [error, setError] = useState({
        "CategoryId": null,
        "CategoryName": null,
        "BasePrice": null
    });

    const serv = new HttpService();



    useEffect(() => {
        serv.getCategories()
            .then(res => {
                setCategories(res.data)
                setIsCompleted(true)
            })
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        checkNullValue();
        checkIfIdExist(category.CategoryId)
    }, [category])


    const checkNullValue = () => {
        const isEmpty = Object.values(category).findIndex(val => val == "")
        if (isEmpty < 0) {
            setIsError(false)
        }
    }

    const handleChange = (name, text) => {
        setCategory(prev => ({
            ...prev,
            [name]: text
        }))
    }

    const checkIfIdExist = (text) => {
        const idExist = categories.findIndex(c => c.CategoryId == text)
        let errorMessage = {
            "CategoryId": null,
            "CategoryName": null,
            "BasePrice": null
        }
        if (idExist >= 0) {
            errorMessage.CategoryId = true
        }
        setError(errorMessage)
    }
    const validateInput = (cat) => {
        let errorMessage = {
            "CategoryId": error.CategoryId,
            "CategoryName": null,
            "BasePrice": null
        }


        // checkEmptyValue(cat)
        if(errorMessage.CategoryId){
            Alert.alert("Id should be unique")
        }
        if (cat.CategoryName[0] !== cat.CategoryName[0].toUpperCase()) {
            Alert.alert("Category Name should start with a Capital letter")
            errorMessage = { ...error, CategoryName: true }
        }
        if (cat.BasePrice < 0) {
            Alert.alert("Base price should be greater than 0")
            errorMessage = { ...error, BasePrice: true }
        }

        setError(errorMessage)
        return true
    }

    const save = () => {
        const validate = validateInput(category)
        if (validate) {
            // serv.postCategories(category)
            //     .then(res => {
            //         //Add te newly created record un the array
            //         setCategories([...categories, res.data])
            //         setCategory(initialStateForCategory);
            //     })
            //     .catch(err => {
            //         console.log(err)
            //     })
        }

    }

    const RenderCategory = ({ item }) => (
        <View>
            <Text>{`${item.CategoryId} ${item.CategoryName} ${item.BasePrice}`}</Text>
        </View>
    )
    return (
        <View style={styles.container}>
            {!isCompleted && <ActivityIndicator />}
            {/* <Text style={styles.text}>{JSON.stringify(categories)}</Text> */}
            <Text>Category Id</Text>
            <TextInput style={{ ...styles.textInput, borderWidth: error.CategoryId ? 2 : 0, borderColor: error.CategoryId ? "red" : "transparent" }} value={category.CategoryId} onChangeText={text => handleChange("CategoryId", text)} />
            {error.CategoryId && <Text style={{ color: 'red', margin: 5 }}>Id should be unique</Text>}
            <Text>Category Name</Text>
            <TextInput style={styles.textInput} value={category.CategoryName} onChangeText={text => handleChange("CategoryName", text)} />
            <Text>Base Price</Text>
            <TextInput style={styles.textInput} value={category.BasePrice} onChangeText={text => handleChange("BasePrice", text)} />
            <Button onPress={save} disabled={isError} title='Add Category' />
            <FlatList
                data={categories}
                keyExtractor={({ CategoryId }) => CategoryId}
                renderItem={({ item }) => <RenderCategory item={item} />}
            />
        </View>
    )
}

export default ApiCallComponent