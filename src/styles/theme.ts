// src/styles/theme.ts

import { extendTheme } from 'native-base';

// Color palette based on our design system
const colors = {
  primary: {
    50: '#e6fffc',
    100: '#b3fff5',
    200: '#80ffee',
    300: '#4dffe7',
    400: '#1affe0',
    500: '#00E5CC', // Primary teal
    600: '#00b8a3',
    700: '#008a7a',
    800: '#005c52',
    900: '#002e29',
  },
  secondary: {
    50: '#e6f2ff',
    100: '#b3d9ff',
    200: '#80bfff',
    300: '#4da6ff',
    400: '#1a8cff',
    500: '#2D9CDB', // Secondary blue
    600: '#0066cc',
    700: '#004d99',
    800: '#003366',
    900: '#001a33',
  },
  success: {
    50: '#e8f5e9',
    100: '#c8e6c9',
    200: '#a5d6a7',
    300: '#81c784',
    400: '#66bb6a',
    500: '#10B981', // Green
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
    500: '#EF4444', // Red
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
    500: '#F59E0B', // Amber
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
    50: '#f2f2f2',
    100: '#d9d9d9',
    200: '#bfbfbf',
    300: '#a6a6a6',
    400: '#8c8c8c',
    500: '#333333', // Dark gray
    600: '#262626',
    700: '#1a1a1a',
    800: '#0d0d0d',
    900: '#000000', // Black
  },
  light: {
    50: '#ffffff',
    100: '#f2f2f2',
    200: '#e6e6e6',
    300: '#cccccc',
    400: '#b3b3b3',
    500: '#999999',
    600: '#808080',
    700: '#666666',
    800: '#4d4d4d',
    900: '#333333',
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