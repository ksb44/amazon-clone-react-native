import React from 'react'
import StackNavigator from './src/navigation/StackNavigator'
import { Provider } from 'react-redux'
import store from './src/store/store'
import {ModalPortal} from 'react-native-modals'
import { UserContext } from './src/context/UserContext'
const App = () => {
  return (
<Provider store={store}>
<UserContext>
    <StackNavigator/>
    <ModalPortal/>
  </UserContext>
    </Provider>
  )
}

export default App

