// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import theme from './src/styles/theme';
import RootNavigator from './src/navigation/RootNavigator';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            <NativeBaseProvider theme={theme}>
              <RootNavigator />
            </NativeBaseProvider>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}