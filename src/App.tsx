/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from './presentation/navigation'
import {
  StatusBar,
} from 'react-native';
import store, { persistor } from './core/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
