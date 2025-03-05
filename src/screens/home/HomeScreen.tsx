// Update src/screens/HomeScreen.tsx

import React from 'react';
import { Box, Heading, Text, VStack, FlatList, Avatar, HStack, Pressable, Icon } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

// Mock data for the feed
const mockPosts = [
  {
    id: '1',
    user: {
      username: 'investor123',
      designation: 'Financial Analyst',
      organization: 'FinCorp'
    },
    content: 'Just rebalanced my portfolio. Tech stocks are looking promising for Q2!',
    likes: 24,
    comments: 5,
    time: '2h ago'
  },
  {
    id: '2',
    user: {
      username: 'traderpro',
      designation: 'Day Trader',
      organization: 'TradeCo'
    },
    content: 'What do you all think about the recent market dip? Buying opportunity or time to be cautious?',
    likes: 31,
    comments: 12,
    time: '4h ago'
  },
  {
    id: '3',
    user: {
      username: 'investmentnewbie',
      designation: 'Software Engineer',
      organization: 'TechStartup'
    },
    content: 'Just started investing in index funds! Any tips for a beginner?',
    likes: 18,
    comments: 8,
    time: '6h ago'
  }
];

const HomeScreen = () => {
  const renderPost = ({ item }) => (
    <Pressable>
      <Box bg="dark.500" p={4} rounded="xl" mb={4}>
        <HStack space={3} alignItems="center" mb={3}>
          <Avatar bg="primary.500" size="md">
            {item.user.username.substring(0, 2).toUpperCase()}
          </Avatar>
          <VStack flex={1}>
            <Text color="light.100" bold>@{item.user.username}</Text>
            <Text color="light.300" fontSize="xs">{item.user.designation} at {item.user.organization}</Text>
          </VStack>
          <Pressable>
            <Box px={3} py={1} bg="primary.500" rounded="full">
              <Text color="dark.900" fontSize="xs" fontWeight="bold">Follow</Text>
            </Box>
          </Pressable>
        </HStack>
        
        <Text color="light.100" mb={3}>{item.content}</Text>
        
        <HStack justifyContent="space-between" alignItems="center">
          <Text color="light.300" fontSize="xs">{item.time}</Text>
          <HStack space={4}>
            <HStack space={1} alignItems="center">
              <Icon as={Feather} name="heart" size="sm" color="light.300" />
              <Text color="light.300" fontSize="xs">{item.likes}</Text>
            </HStack>
            <HStack space={1} alignItems="center">
              <Icon as={Feather} name="message-circle" size="sm" color="light.300" />
              <Text color="light.300" fontSize="xs">{item.comments}</Text>
            </HStack>
            <Icon as={Feather} name="share-2" size="sm" color="light.300" />
          </HStack>
        </HStack>
      </Box>
    </Pressable>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
      <Box flex={1} p={4}>
        <HStack justifyContent="space-between" alignItems="center" mb={6}>
          <Heading color="light.100" size="lg">Feed</Heading>
          <Icon as={Feather} name="bell" size="md" color="light.100" />
        </HStack>
        
        <Box bg="dark.500" p={4} rounded="xl" mb={6}>
          <HStack justifyContent="space-between" alignItems="center">
            <VStack>
              <Text color="light.300">Your Portfolio</Text>
              <Text color="light.100" fontSize="2xl" fontWeight="bold">$24,561.78</Text>
              <Text color="success.500">+$345.25 (1.4%)</Text>
            </VStack>
            <VStack alignItems="center">
              <Text color="light.300">Rank</Text>
              <Text color="light.100" fontSize="xl" fontWeight="bold">#42</Text>
            </VStack>
          </HStack>
        </Box>
        
        <FlatList
          data={mockPosts}
          keyExtractor={(item) => item.id}
          renderItem={renderPost}
          showsVerticalScrollIndicator={false}
        />
      </Box>
    </SafeAreaView>
  );
};

export default HomeScreen;