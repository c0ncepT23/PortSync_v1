// src/screens/ProfileScreen.tsx

import React from 'react';
import { Box, Button, Center, Heading, Text, VStack, Avatar, HStack, Divider } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { clearCredentials } from '../store/slices/authSlice';
import { RootState } from '../store';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleSignOut = () => {
    dispatch(clearCredentials());
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
      <Box flex={1} p={4}>
        <VStack space={6}>
          <Heading color="light.100" size="xl">Profile</Heading>
          
          <Box bg="dark.500" rounded="xl" p={5}>
            <VStack space={4} alignItems="center">
              <Avatar 
                bg="primary.500" 
                size="xl"
                _text={{ fontSize: "xl" }}
              >
                {user?.username?.substring(0, 2)?.toUpperCase() || "U"}
              </Avatar>
              
              <VStack space={1} alignItems="center">
                <Heading size="md" color="light.100">@{user?.username || "username"}</Heading>
                <Text color="light.300">{user?.designation || "Designation"}</Text>
                <Text color="light.300">{user?.organization || "Organization"}</Text>
              </VStack>
              
              <HStack space={8} justifyContent="center" mt={2}>
                <VStack alignItems="center">
                  <Text color="light.100" bold fontSize="md">0</Text>
                  <Text color="light.300">Followers</Text>
                </VStack>
                <VStack alignItems="center">
                  <Text color="light.100" bold fontSize="md">0</Text>
                  <Text color="light.300">Following</Text>
                </VStack>
                <VStack alignItems="center">
                  <Text color="light.100" bold fontSize="md">0</Text>
                  <Text color="light.300">Posts</Text>
                </VStack>
              </HStack>
            </VStack>
          </Box>
          
          <Box bg="dark.500" rounded="xl" p={5}>
            <VStack space={3}>
              <Heading size="sm" color="light.100">Account</Heading>
              <Divider bg="dark.400" />
              <HStack justifyContent="space-between">
                <Text color="light.100">Edit Profile</Text>
                <Text color="light.300">›</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text color="light.100">Privacy Settings</Text>
                <Text color="light.300">›</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text color="light.100">Notification Preferences</Text>
                <Text color="light.300">›</Text>
              </HStack>
            </VStack>
          </Box>
          
          <Button 
            onPress={handleSignOut} 
            colorScheme="primary" 
            variant="outline"
            mt={4}
          >
            Sign Out
          </Button>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default ProfileScreen;