// src/styles/theme.ts

import { extendTheme } from 'native-base';

// Color palette based on our design system
const colors = {
  primary: {
    50: '#e0fcf9',
    100: '#b5f9f3',
    200: '#82f3ec',
    300: '#4eece5',
    400: '#1ae5dd',
    500: '#00E5CC', // Primary teal
    600: '#00b8a3',
    700: '#008677',
    800: '#00574e',
    900: '#002925',
  },
  secondary: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2D9CDB', // Electric blue
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
  },
  success: {
    50: '#e8f5e9',
    100: '#c8e6c9',
    200: '#a5d6a7',
    300: '#81c784',
    400: '#66bb6a',
    500: '#0ACF83', // Mint green
    600: '#43a047',
    700: '#388e3c',
    800: '#2e7d32',
    900: '#1b5e20',
  },
  error: {
    50: '#ffebee',
    100: '#ffcdd2',
    200: '#ef9a9a',
    300: '#e57373',
    400: '#ef5350',
    500: '#FF4D4D', // Loss red
    600: '#e53935',
    700: '#d32f2f',
    800: '#c62828',
    900: '#b71c1c',
  },
  warning: {
    50: '#fff8e1',
    100: '#ffecb3',
    200: '#ffe082',
    300: '#ffd54f',
    400: '#ffca28',
    500: '#FFD700', // Gold
    600: '#ffb300',
    700: '#ffa000',
    800: '#ff8f00',
    900: '#ff6f00',
  },
  accent: {
    50: '#fff0ed',
    100: '#ffd7cc',
    200: '#ffbcaa',
    300: '#ffa088',
    400: '#ff8866',
    500: '#FF7F50', // Vibrant orange
    600: '#e56036',
    700: '#cc4522',
    800: '#b22c11',
    900: '#991200',
  },
  dark: {
    50: '#edefef',
    100: '#d1d4d6',
    200: '#b3b9bc',
    300: '#939fa3',
    400: '#7b8a8f',
    500: '#121212', // Surface dark
    600: '#5a676c',
    700: '#444f53',
    800: '#2d363a',
    900: '#000000', // True black
  },
  light: {
    50: '#ffffff',
    100: '#F5F5F5', // Main text
    200: '#CCCCCC', // Secondary text
    300: '#999999', // Tertiary text
    400: '#666666', // Subtle accents
    500: '#333333', // Card borders
  },
};

// Default theme configuration
const theme = extendTheme({
  colors,
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: true,
  },
  components: {
    // Component-specific theme overrides
    Button: {
      baseStyle: {
        rounded: 'md',
      },
      defaultProps: {
        colorScheme: 'primary',
      },
    },
    Text: {
      baseStyle: (props: any) => ({
        color: props.colorMode === 'dark' ? 'light.100' : 'dark.900',
      }),
      defaultProps: {
        size: 'md',
      },
    },
    Heading: {
      baseStyle: (props: any) => ({
        color: props.colorMode === 'dark' ? 'light.100' : 'dark.900',
      }),
    },
    Card: {
      baseStyle: (props: any) => ({
        backgroundColor: props.colorMode === 'dark' ? 'dark.500' : 'light.50',
        p: 4,
        rounded: 'xl',
        shadow: 3,
      }),
    },
  },
  fontConfig: {
    // We'll use system fonts for now, but you can add custom fonts later
  },
  fonts: {
    heading: undefined,
    body: undefined,
    mono: undefined,
  },
});

export default theme;