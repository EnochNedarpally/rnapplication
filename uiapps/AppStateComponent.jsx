
import { View, AppState, Text, BackHandler, Alert } from "react-native";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { HttpService } from "../services/httpServices";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppStateFunctionalComponent = () => {

    const [appState, setAppState] = useState(AppState.currentState);
    const [categories, setCategories] = useState([]);

    let serv = new HttpService();
    useEffect(() => {
        console.log(`The Component Mounting is completed`);
        const subsc = AppState.addEventListener('change', _handleAppStateChange);
        if(appState =="active"){
            console.log("Api is Called")
            serv.getCategories()
            .then(res => {
                setCategories(res.data)
                    addtoLocalStorage(res.data)
            })
            .catch(error => console.log("err",error))
        }
        return async() => {
            serv = {};
            const localData = await AsyncStorage.getItem("catData");
            // await console.log("localData",localData)
            console.log(`The Component is being unmounted`);
            subsc.remove();
        };
    },[]);

    useEffect(() => {
        const backAction = () => {

            Alert.alert('Hold on!', 'Going Back will Delete the app local data', [
              {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
              },

              {text: 'YES', onPress: async() => {
                await AsyncStorage.clear();
                BackHandler.exitApp() }},
            ]);
            return true;
          };
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        ); 
        return () => backHandler.remove();
      }, []);
    
    const addtoLocalStorage=async(data)=>{
        if(JSON.stringify(categories) == JSON.stringify(data)){
            console.log("Data already exist")
        }
        else{
            console.log("Data Added");
            await AsyncStorage.setItem("catData",JSON.stringify(data))
            const asyncData = await AsyncStorage.getItem("catData")
        }
    }
    const _handleAppStateChange = (nextAppState) => {
        if (appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!')
        }
        setAppState(nextAppState);
    }

    return (

        <View style={styles.container}>
            <Text style={styles.text}>
                The State is : {appState}
            </Text>
        </View>
    );
};

export default AppStateFunctionalComponent;