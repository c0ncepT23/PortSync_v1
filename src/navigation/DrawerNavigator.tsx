import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Box, VStack, HStack, Avatar, Text, Icon, Pressable, Heading, Divider } from 'native-base';
import { Feather } from '@expo/vector-icons';
import MainNavigator from './MainNavigator';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

// Mock user data
const mockUser = {
  username: 'johndoe',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  email: 'john.doe@example.com',
  designation: 'Software Engineer',
  organization: 'TechCorp'
};

// Custom Drawer Content
const CustomDrawerContent = (props) => {
  const navigation = useNavigation();
  
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      // @ts-ignore
      if (global.refreshAuthStatus) {
        // @ts-ignore
        global.refreshAuthStatus();
      }
    } catch (e) {
      console.log('Error logging out', e);
    }
  };
  
  return (
    <Box flex={1} bg="dark.800" p={6}>
      <VStack space={6}>
        <VStack space={4} alignItems="center" mt={4}>
          <Avatar 
            source={{ uri: mockUser.avatar }} 
            size="2xl"
            bg="primary.500"
          >
            {mockUser.username.charAt(0).toUpperCase()}
          </Avatar>
          <VStack alignItems="center">
            <Text color="light.100" fontSize="xl" fontWeight="bold">{mockUser.username}</Text>
            <Text color="light.400">{mockUser.email}</Text>
            <HStack space={1} mt={1}>
              <Text color="light.400">{mockUser.designation}</Text>
              <Text color="light.400">at</Text>
              <Text color="light.400">{mockUser.organization}</Text>
            </HStack>
          </VStack>
        </VStack>
        
        <Divider bg="dark.600" />
        
        <VStack space={4}>
          <Pressable 
            onPress={() => {
              props.navigation.closeDrawer();
              navigation.navigate('Portfolio');
            }}
          >
            <HStack space={3} alignItems="center" py={3}>
              <Icon as={Feather} name="pie-chart" size="md" color="light.100" />
              <Text color="light.100" fontSize="md">My Portfolio</Text>
            </HStack>
          </Pressable>
          
          <Pressable 
            onPress={() => {
              props.navigation.closeDrawer();
              // Navigate to settings
            }}
          >
            <HStack space={3} alignItems="center" py={3}>
              <Icon as={Feather} name="settings" size="md" color="light.100" />
              <Text color="light.100" fontSize="md">Settings</Text>
            </HStack>
          </Pressable>
          
          <Pressable 
            onPress={() => {
              props.navigation.closeDrawer();
              // Navigate to help
            }}
          >
            <HStack space={3} alignItems="center" py={3}>
              <Icon as={Feather} name="help-circle" size="md" color="light.100" />
              <Text color="light.100" fontSize="md">Help & Support</Text>
            </HStack>
          </Pressable>
        </VStack>
        
        <Pressable 
          onPress={handleLogout}
          mt="auto"
          bg="error.600"
          py={3}
          px={4}
          rounded="md"
        >
          <HStack space={2} alignItems="center" justifyContent="center">
            <Icon as={Feather} name="log-out" size="sm" color="white" />
            <Text color="white" fontWeight="bold">Log Out</Text>
          </HStack>
        </Pressable>
      </VStack>
    </Box>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '80%',
          backgroundColor: '#1E1E1E',
        },
        drawerType: 'front',
        overlayColor: 'rgba(0, 0, 0, 0.7)',
      }}
    >
      <Drawer.Screen name="Main" component={MainNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator; 