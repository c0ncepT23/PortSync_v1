// src/contexts/ThemeContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { NativeBaseProvider, ColorMode, extendTheme } from 'native-base';
import { StorageManager } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

// Define default light and dark themes for React Navigation
const navigationLightTheme = {
  dark: false,
  colors: {
    primary: '#00E5CC',
    background: '#F8F9FA',
    card: '#FFFFFF',
    text: '#1A1A1A',
    textSecondary: '#757575',
    border: '#E0E0E0',
    notification: '#FF3B30',
  },
};

const navigationDarkTheme = {
  dark: true,
  colors: {
    primary: '#00E5CC',
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    border: '#2C2C2C',
    notification: '#FF453A',
  },
};

// Define NativeBase theme
const nativeBaseTheme = extendTheme({
  colors: {
    primary: {
      500: '#00E5CC',
    },
    dark: {
      50: '#E0E0E0',
      100: '#AAAAAA',
      200: '#757575',
      300: '#616161',
      400: '#484848',
      500: '#212121',
      600: '#1E1E1E',
      700: '#1A1A1A',
      800: '#121212',
      900: '#0A0A0A',
    },
    light: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  config: {
    initialColorMode: 'dark',
  },
});

// Define the context type
type ThemeContextType = {
  colorMode: ColorMode;
  toggleColorMode: () => void;
  setColorMode: (mode: ColorMode) => void;
  theme: typeof navigationLightTheme | typeof navigationDarkTheme;
  toggleTheme: () => void;
};

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType>({
  colorMode: 'dark',
  toggleColorMode: () => {},
  setColorMode: () => {},
  theme: navigationDarkTheme,
  toggleTheme: () => {},
});

// Storage manager for NativeBase
const colorModeManager: StorageManager = {
  get: async () => {
    try {
      const val = await AsyncStorage.getItem('@color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'dark';
    }
  },
  set: async (value: ColorMode) => {
    try {
      await AsyncStorage.setItem('@color-mode', value);
    } catch (e) {
      console.log(e);
    }
  },
};

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const deviceTheme = useColorScheme();
  const [colorMode, setColorMode] = useState<ColorMode>('dark');
  const [theme, setTheme] = useState(
    deviceTheme === 'dark' ? navigationDarkTheme : navigationLightTheme
  );

  // Load saved theme preference
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setTheme(savedTheme === 'dark' ? navigationDarkTheme : navigationLightTheme);
          setColorMode(savedTheme as ColorMode);
        }
      } catch (error) {
        console.log('Error loading theme:', error);
      }
    };
    
    loadTheme();
  }, []);

  // Toggle between dark and light modes
  const toggleColorMode = () => {
    const newMode = colorMode === 'dark' ? 'light' : 'dark';
    setColorMode(newMode);
    toggleTheme(); // Also toggle the navigation theme
  };

  // Set a specific color mode
  const changeColorMode = (mode: ColorMode) => {
    setColorMode(mode);
    setTheme(mode === 'dark' ? navigationDarkTheme : navigationLightTheme);
  };

  // Toggle between light and dark themes
  const toggleTheme = async () => {
    const newTheme = theme.dark ? navigationLightTheme : navigationDarkTheme;
    setTheme(newTheme);
    
    try {
      await AsyncStorage.setItem('theme', newTheme.dark ? 'dark' : 'light');
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        colorMode,
        toggleColorMode,
        setColorMode: changeColorMode,
        theme,
        toggleTheme,
      }}
    >
      <NativeBaseProvider theme={nativeBaseTheme} colorModeManager={colorModeManager}>
        {children}
      </NativeBaseProvider>
    </ThemeContext.Provider>
  );
}