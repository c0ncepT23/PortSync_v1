// App.tsx

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, AppStateStatus } from 'react-native';
import { NativeBaseProvider } from 'native-base';

// Navigation
import AuthNavigator from './src/navigation/AuthNavigator';
import MainNavigator from './src/navigation/MainNavigator';

// Context
import { ThemeProvider } from './src/contexts/ThemeContext';

// Store
import { store, persistor } from './src/store';
import theme from './src/styles/theme';

const Stack = createStackNavigator();

// Add a global refresh function that components can access
// @ts-ignore
global.refreshAuthStatus = null;

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated
  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('Auth token found:', !!token);
      setIsAuthenticated(!!token);
    } catch (error) {
      console.log('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle app state changes
  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      checkAuthStatus();
    }
  };

  useEffect(() => {
    // Initial check
    checkAuthStatus();
    
    // Listen for app state changes instead of AsyncStorage events
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Set the global refresh function
    // @ts-ignore
    global.refreshAuthStatus = checkAuthStatus;

    return () => {
      subscription.remove();
    };
  }, []);

  if (isLoading) {
    return null; // Or a splash screen
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <NativeBaseProvider theme={theme}>
            <SafeAreaProvider>
              <NavigationContainer>
                <StatusBar style="auto" />
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  {isAuthenticated ? (
                    <Stack.Screen name="Main" component={MainNavigator} />
                  ) : (
                    <Stack.Screen name="Auth" component={AuthNavigator} />
                  )}
                </Stack.Navigator>
              </NavigationContainer>
            </SafeAreaProvider>
          </NativeBaseProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}