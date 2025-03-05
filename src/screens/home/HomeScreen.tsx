// src/screens/home/HomeScreen.tsx

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  FlatList, 
  Avatar, 
  Pressable, 
  Icon, 
  Badge,
  Spinner,
  useTheme,
  IconButton,
  Fab,
  Modal,
  Divider
} from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock data for the feed
const mockPosts = [
  {
    id: '1',
    user: {
      username: 'investor123',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
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
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
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
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      designation: 'Software Engineer',
      organization: 'TechStartup'
    },
    content: 'Just started investing in index funds! Any tips for a beginner?',
    likes: 18,
    comments: 8,
    time: '6h ago'
  }
];

// Mock data for portfolio
const mockPortfolio = {
  totalValue: 24561.78,
  dailyChange: 345.25,
  dailyChangePercent: 1.4,
  weeklyChange: 1250.50,
  weeklyChangePercent: 5.3
};

// Mock data for rankings
const mockRankings = {
  currentRank: 42,
  previousRank: 45,
  change: 3,
  totalUsers: 250
};

// Mock user data
const mockUser = {
  username: 'johndoe',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  email: 'john.doe@example.com',
  designation: 'Software Engineer',
  organization: 'TechCorp'
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [portfolio, setPortfolio] = useState(null);
  const [rankings, setRankings] = useState(null);
  const [user, setUser] = useState(null);
  const [refreshingPortfolio, setRefreshingPortfolio] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    // Simulate API calls
    const timer = setTimeout(() => {
      setPosts(mockPosts);
      setPortfolio(mockPortfolio);
      setRankings(mockRankings);
      setUser(mockUser);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const navigateToPostDetail = (post) => {
    navigation.navigate('PostDetail', { post });
  };
  
  const navigateToPortfolio = () => {
    navigation.navigate('Portfolio');
  };
  
  const navigateToRankings = () => {
    navigation.navigate('Rankings');
  };
  
  const navigateToNotifications = () => {
    navigation.navigate('Notifications');
  };

  const navigateToCreatePost = () => {
    navigation.navigate('CreatePost');
  };
  
  const openProfileModal = () => {
    setShowProfileModal(true);
  };
  
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
  
  const handleRefreshPortfolio = () => {
    setRefreshingPortfolio(true);
    
    // Simulate API call to refresh portfolio data
    setTimeout(() => {
      // Update with slightly different values to show refresh worked
      setPortfolio({
        ...mockPortfolio,
        totalValue: mockPortfolio.totalValue + (Math.random() * 100 - 50),
        dailyChange: mockPortfolio.dailyChange + (Math.random() * 20 - 10),
        dailyChangePercent: mockPortfolio.dailyChangePercent + (Math.random() * 0.4 - 0.2)
      });
      setRefreshingPortfolio(false);
    }, 1000);
  };

  const renderHeader = () => {
    return (
      <VStack space={4} mb={4}>
        {/* Header with profile and notification */}
        <HStack justifyContent="space-between" alignItems="center" pt={2} pb={4}>
          <Pressable onPress={openProfileModal}>
            <Avatar 
              source={{ uri: user?.avatar }} 
              size="md"
              bg="primary.500"
            >
              {user?.username?.charAt(0).toUpperCase()}
            </Avatar>
          </Pressable>
          
          <IconButton
            icon={<Icon as={Feather} name="bell" size="md" color="light.100" />}
            onPress={navigateToNotifications}
            variant="ghost"
            _pressed={{
              bg: "dark.700"
            }}
            mr={2}
          />
        </HStack>
        
        {/* Portfolio Overview Card */}
        <Pressable onPress={navigateToPortfolio}>
          <Box bg="dark.700" p={4} rounded="xl" mb={6}>
            <HStack justifyContent="space-between" alignItems="center">
              <VStack>
                <Text color="light.400">Portfolio Value</Text>
                <Text color="light.100" fontSize="2xl" fontWeight="bold">
                  ${portfolio?.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Text>
                <HStack alignItems="center" space={1}>
                  <Icon 
                    as={Feather} 
                    name={portfolio?.dailyChange >= 0 ? "trending-up" : "trending-down"} 
                    size="xs" 
                    color={portfolio?.dailyChange >= 0 ? "success.500" : "error.500"} 
                  />
                  <Text color={portfolio?.dailyChange >= 0 ? "success.500" : "error.500"}>
                    {portfolio?.dailyChange >= 0 ? "+" : ""}${portfolio?.dailyChange.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({portfolio?.dailyChangePercent}%)
                  </Text>
                </HStack>
              </VStack>
              <HStack space={2}>
                <IconButton
                  icon={
                    <Icon 
                      as={Feather} 
                      name="refresh-cw" 
                      size="sm" 
                      color="light.400"
                      spin={refreshingPortfolio}
                    />
                  }
                  onPress={handleRefreshPortfolio}
                  variant="ghost"
                  isDisabled={refreshingPortfolio}
                  _pressed={{
                    bg: "dark.600"
                  }}
                />
                <Icon as={Feather} name="chevron-right" size="md" color="light.400" />
              </HStack>
            </HStack>
          </Box>
        </Pressable>
        
        {/* Rankings Card */}
        <Pressable onPress={navigateToRankings}>
          <Box bg="dark.700" p={4} rounded="xl" mb={6}>
            <HStack justifyContent="space-between" alignItems="center">
              <VStack>
                <Text color="light.400">Your Ranking</Text>
                <HStack alignItems="baseline" space={1}>
                  <Text color="light.100" fontSize="2xl" fontWeight="bold">#{rankings?.currentRank}</Text>
                  <Text color="light.400" fontSize="md">of {rankings?.totalUsers}</Text>
                </HStack>
                <HStack alignItems="center" space={1}>
                  <Icon 
                    as={Feather} 
                    name={rankings?.change > 0 ? "arrow-up" : rankings?.change < 0 ? "arrow-down" : "minus"} 
                    size="xs" 
                    color={rankings?.change > 0 ? "success.500" : rankings?.change < 0 ? "error.500" : "light.400"} 
                  />
                  <Text color={rankings?.change > 0 ? "success.500" : rankings?.change < 0 ? "error.500" : "light.400"}>
                    {rankings?.change > 0 ? `+${rankings?.change}` : rankings?.change < 0 ? rankings?.change : "No change"} from yesterday
                  </Text>
                </HStack>
              </VStack>
              <Icon as={Feather} name="chevron-right" size="md" color="light.400" />
            </HStack>
          </Box>
        </Pressable>
        
        {/* Social Feed Heading */}
        <Heading color="light.100" size="md" mb={2}>Recent Posts</Heading>
      </VStack>
    );
  };

  const renderPost = ({ item }) => {
    return (
      <Pressable onPress={() => navigateToPostDetail(item)}>
        <Box bg="dark.700" p={4} rounded="xl" mb={4}>
          <HStack space={3} alignItems="center" mb={3}>
            <Pressable onPress={() => navigation.navigate('UserProfile', { user: item.user })}>
              <Avatar 
                source={{ uri: item.user.avatar }} 
                size="md"
                bg="primary.500"
              >
                {item.user.username.charAt(0).toUpperCase()}
              </Avatar>
            </Pressable>
            <VStack>
              <Pressable onPress={() => navigation.navigate('UserProfile', { user: item.user })}>
                <Text color="light.100" fontWeight="bold">{item.user.username}</Text>
                <Text color="light.400" fontSize="xs">
                  {item.user.designation} at {item.user.organization}
                </Text>
              </Pressable>
            </VStack>
            <Text color="light.400" fontSize="xs" ml="auto">{item.time}</Text>
          </HStack>
          
          <Text color="light.100" mb={3}>{item.content}</Text>
          
          <HStack justifyContent="space-between">
            <HStack space={4} alignItems="center">
              <HStack space={1} alignItems="center">
                <Icon as={Feather} name="heart" size="sm" color="light.400" />
                <Text color="light.400" fontSize="xs">{item.likes}</Text>
              </HStack>
              <HStack space={1} alignItems="center">
                <Icon as={Feather} name="message-circle" size="sm" color="light.400" />
                <Text color="light.400" fontSize="xs">{item.comments}</Text>
              </HStack>
            </HStack>
            <Icon as={Feather} name="share-2" size="sm" color="light.400" />
          </HStack>
        </Box>
      </Pressable>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.dark[900] }}>
        <Box flex={1} justifyContent="center" alignItems="center">
          <Spinner size="lg" color="primary.500" />
          <Text color="light.100" mt={4}>Loading your feed...</Text>
        </Box>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.dark[900] }}>
      <Box flex={1} px={4}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={renderPost}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <Box alignItems="center" justifyContent="center" py={10}>
              <Icon as={Feather} name="inbox" size="4xl" color="light.700" />
              <Text color="light.400" mt={4}>No posts yet</Text>
              <Text color="light.600" fontSize="xs">Follow more investors to see their posts</Text>
            </Box>
          }
        />
        
        {/* Floating Action Button for creating new post */}
        <Fab
          position="absolute"
          renderInPortal={false}
          size="md"
          icon={<Icon as={Feather} name="plus" size="sm" color="white" />}
          colorScheme="primary"
          bottom={8}
          right={4}
          onPress={navigateToCreatePost}
        />
        
        {/* Profile Modal */}
        <Modal 
          isOpen={showProfileModal} 
          onClose={() => setShowProfileModal(false)}
          size="full"
        >
          <Modal.Content bg="dark.800" maxH="80%" h="80%" w="90%" borderRadius="xl">
            <Modal.CloseButton />
            <Modal.Body p={6}>
              <VStack space={6}>
                <VStack space={4} alignItems="center">
                  <Avatar 
                    source={{ uri: user?.avatar }} 
                    size="2xl"
                    bg="primary.500"
                  >
                    {user?.username?.charAt(0).toUpperCase()}
                  </Avatar>
                  <VStack alignItems="center">
                    <Text color="light.100" fontSize="xl" fontWeight="bold">{user?.username}</Text>
                    <Text color="light.400">{user?.email}</Text>
                    <HStack space={1} mt={1}>
                      <Text color="light.400">{user?.designation}</Text>
                      <Text color="light.400">at</Text>
                      <Text color="light.400">{user?.organization}</Text>
                    </HStack>
                  </VStack>
                </VStack>
                
                <Divider bg="dark.600" />
                
                <VStack space={4}>
                  <Pressable 
                    onPress={() => {
                      setShowProfileModal(false);
                      navigateToPortfolio();
                    }}
                  >
                    <HStack space={3} alignItems="center" py={3}>
                      <Icon as={Feather} name="pie-chart" size="md" color="light.100" />
                      <Text color="light.100" fontSize="md">My Portfolio</Text>
                    </HStack>
                  </Pressable>
                  
                  <Pressable>
                    <HStack space={3} alignItems="center" py={3}>
                      <Icon as={Feather} name="settings" size="md" color="light.100" />
                      <Text color="light.100" fontSize="md">Settings</Text>
                    </HStack>
                  </Pressable>
                  
                  <Pressable>
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
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Box>
    </SafeAreaView>
  );
};

export default HomeScreen;