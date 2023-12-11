
import { StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
// import {NavigationContainer} from 'react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Category from './views/Category';
import Products from './views/Products';
import AddCategory from './views/AddCategory';
'@react-navigation/bottom-tabs';


const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export default function HostComponent() {
  return (
      <NavigationContainer>
         
          {/* <Stack.Navigator initialRouteName='Category'> 
             
             <Stack.Screen name="CategoryList" 
           component={Category}
            options={{title: 'Category List',headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }}}
           />   
            <Stack.Screen name="Product" 
           component={Products}
           options={{title: 'Product List',headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }}}
           />  
            <Stack.Screen name="AddCategory" 
           component={AddCategory}
           options={{title: 'Product List',headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }}}
           />  
          </Stack.Navigator>  */}
        <Tab.Navigator >
          <Tab.Screen name='Category' component={Category}/>
          <Tab.Screen name='AddCategory' component={AddCategory}/>
          <Tab.Screen name='Products' component={Products}/>
        </Tab.Navigator>
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