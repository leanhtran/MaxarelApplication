/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform 
} from 'react-native';
import 'react-native-gesture-handler';
import creatSagaMiddleware from 'redux-saga';
import rootSaga from './src/sagas/root-saga';
import allReducers from './src/reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import RouterAuthStack from './src/navigation/router'
import SplashScreen from 'react-native-splash-screen'
import { ColorCustom } from './src/utils/color'

const sagaMiddleware = creatSagaMiddleware()
let store = createStore(allReducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

const App: () => React$Node = () => {

  useEffect(() => {
    SplashScreen.hide()
  },[])

  return (
    <Provider store={store}>
      {Platform.OS === 'ios' && <StatusBar backgroundColor={ColorCustom.LIGHT_GRAY} barStyle="dark-content" />}
      <RouterAuthStack />
    </Provider>
  );
};

const styles = StyleSheet.create({
});

export default App;
