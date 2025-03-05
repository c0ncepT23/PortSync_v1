// src/navigation/RootNavigator.tsx

import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { Box, Spinner, Center } from 'native-base';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log('Failed to get token', e);
      }
      setUserToken(token);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  // Make the auth refresh function available globally
  // @ts-ignore
  global.refreshAuthStatus = async () => {
    const token = await AsyncStorage.getItem('userToken');
    setUserToken(token);
  };

  if (isLoading) {
    return (
      <Center flex={1} bg="dark.900">
        <Spinner size="lg" color="primary.500" />
      </Center>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken ? (
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;