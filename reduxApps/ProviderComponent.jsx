import { View, Text } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux';
import MainReduxComponent from './MainReduxComponent';
import HostComponent from '../miniProject/MainComponent';
import { store } from '../sagasapp/store';

const ProviderComponent = () => {
  return (
    <Provider store={store}>
      <HostComponent/>
    </Provider>
  )
}

export default ProviderComponent