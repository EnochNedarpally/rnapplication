/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import FirstComponent from './components/firstComponent';
import SimpleCalculator from './components/simpleCalculator';
import BlogsComponent from './uiapps/blogsComponent';
import storageComponent from './uiapps/storageComponent';
import UtilizerComponent from './uiapps/utilizerComponent';
import PracticeAsyncStorage from './uiapps/practiceAsyncStorage';
import TextInputParentComponent from './uiapps/textInputParentComponent';
import FormComponent from './uiapps/FormComponent';
import ApiCallComponent from './uiapps/apiCallComponent';

AppRegistry.registerComponent(appName, () => ApiCallComponent);
