import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../uiapps/styles'
import AddEmpComponent from './View/AddEmpComponent'
import ListEmpComponent from './View/ListEmpComponent'
import {useSelector} from 'react-redux'
const MainReduxComponent = () => {
const storeData = useSelector(state=>state.emps)
  return (
    <View style={styles.container}>
            <Text style={styles.text}>Redux App</Text>
             <View style={{flex:2}}>
                <AddEmpComponent/>
             </View>
            
             <View style={{flex:3}}>
                <ListEmpComponent data={storeData} />
             </View>
        </View>
  )
}

export default MainReduxComponent