
import { StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
// import {NavigationContainer} from 'react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Category from './views/Category';
import Products from './views/Products';
import AddCategory from './views/AddCategory';
import AddProduct from './views/AddProduct';
'@react-navigation/bottom-tabs';


const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export default function HostComponent() {

  const HomeStack = () => (
    <Tab.Navigator>
      <Tab.Screen name="Category" component={Category} />
      <Tab.Screen name="Products" component={Products} />
    </Tab.Navigator>
  );
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName='Home' >
                <Stack.Screen options={{ headerShown: false }} name='AddCategory' component={AddCategory} />
                <Stack.Screen options={{ headerShown: false }} name='AddProduct' component={AddProduct} />
                <Stack.Screen options={{ headerShown: false }} name='Home' component={HomeStack} /> 
          </Stack.Navigator> 
        {/* <Tab.Navigator > */}
          {/* <Tab.Screen name='Category' component={Category}/>
          <Tab.Screen name="Home" component={HomeStack}/> */}
          {/* <Tab.Screen name='AddCategory' component={AddCategory}/>
          <Tab.Screen name='AddProduct' component={AddProduct}/> */}
          {/* <Tab.Screen name='Products' component={Products}/> */}
        {/* </Tab.Navigator> */}
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});