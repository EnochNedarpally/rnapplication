/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import FirstComponent from './components/firstComponent';
import SimpleCalculator from './components/simpleCalculator';
import BlogsComponent from './uiapps/blogsComponent';

AppRegistry.registerComponent(appName, () => BlogsComponent);
