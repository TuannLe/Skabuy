import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from './presentation/navigation'
import {
  StatusBar,
  View
} from 'react-native';
import store, { persistor } from './core/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import SplashScreen from 'react-native-splash-screen';
import { RootSiblingParent } from 'react-native-root-siblings';

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <RootSiblingParent>
      <SafeAreaProvider>
        <StatusBar />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Navigation />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </RootSiblingParent>
  );
}

export default App;
