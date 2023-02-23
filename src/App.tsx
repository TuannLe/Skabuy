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

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar />
      <Navigation />
    </SafeAreaProvider>
  );
}

export default App;
