/**
 * @format
 */

import { AppRegistry, YellowBox } from 'react-native';
import App from './App';
import {name as appName} from './app.json';

YellowBox.ignoreWarnings(['componentWillReceiveProps']);
YellowBox.ignoreWarnings(['componentWillUpdate']);

AppRegistry.registerComponent(appName, () => App);
