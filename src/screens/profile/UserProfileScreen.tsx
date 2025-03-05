import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Avatar,
  Icon,
  Pressable,
  Divider,
  Spinner,
  useTheme,
  IconButton,
  Heading,
  FlatList,
  Button,
  Badge
} from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

// Mock data for user posts
const mockUserPosts = [
  {
    id: '1',
    content: 'Just rebalanced my portfolio. Tech stocks are looking promising for Q2!',
    likes: 24,
    comments: 5,
    time: '2h ago'
  },
  {
    id: '2',
    content: 'What do you all think about the recent market dip? Buying opportunity or time to be cautious?',
    likes: 31,
    comments: 12,
    time: '4h ago'
  },
  {
    id: '3',
    content: 'Just started investing in index funds! Any tips for a beginner?',
    likes: 18,
    comments: 8,
    time: '6h ago'
  }
];

const UserProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Get user from route params
  const user = route.params?.user;
  
  // Mock portfolio data for this user
  const [portfolio, setPortfolio] = useState({
    totalValue: 32450.75,
    dailyChange: 425.50,
    dailyChangePercent: 1.3,
    rank: 28,
    totalUsers: 250
  });
  
  // Mock social stats
  const [socialStats, setSocialStats] = useState({
    followers: 142,
    following: 87
  });
  
  // Posts data based on active tab
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    if (!user) {
      navigation.goBack();
      return;
    }
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setPosts(mockUserPosts);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [user, navigation]);
  
  useEffect(() => {
    // Update posts based on active tab
    if (activeTab === 'posts') {
      setPosts(mockUserPosts);
    } else if (activeTab === 'likes') {
      // Simulate liked posts (just modify the existing ones for demo)
      setPosts(mockUserPosts.map(post => ({
        ...post,
        content: `Liked: ${post.content}`,
        time: `Liked ${post.time}`
      })));
    } else if (activeTab === 'comments') {
      // Simulate commented posts
      setPosts(mockUserPosts.map(post => ({
        ...post,
        content: `Commented: ${post.content}`,
        time: `Commented ${post.time}`
      })));
    }
  }, [activeTab]);
  
  const handleBack = () => {
    navigation.goBack();
  };
  
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setSocialStats(prev => ({
      ...prev,
      followers: isFollowing ? prev.followers - 1 : prev.followers + 1
    }));
  };
  
  const navigateToPostDetail = (post) => {
    // Add the user to the post for the detail view
    navigation.navigate('PostDetail', { post: { ...post, user } });
  };
  
  const renderPost = ({ item }) => {
    return (
      <Pressable onPress={() => navigateToPostDetail(item)}>
        <Box bg="dark.700" p={4} rounded="xl" mb={4}>
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
            <Text color="light.400" fontSize="xs">{item.time}</Text>
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
          <Text color="light.100" mt={4}>Loading profile...</Text>
        </Box>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.dark[900] }}>
      <Box flex={1} px={4}>
        {/* Header with back button */}
        <HStack alignItems="center" py={4}>
          <IconButton
            icon={<Icon as={Feather} name="arrow-left" size="md" color="light.100" />}
            onPress={handleBack}
            variant="ghost"
            _pressed={{
              bg: "dark.700"
            }}
          />
          <Text color="light.100" fontSize="lg" fontWeight="bold" ml={2}>Profile</Text>
        </HStack>
        
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={renderPost}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <VStack space={4} mb={6}>
              {/* User Info */}
              <HStack space={4} alignItems="center">
                <Avatar 
                  source={{ uri: user.avatar }} 
                  size="xl"
                  bg="primary.500"
                >
                  {user.username.charAt(0).toUpperCase()}
                </Avatar>
                <VStack flex={1}>
                  <Text color="light.100" fontSize="xl" fontWeight="bold">{user.username}</Text>
                  <Text color="light.400">
                    {user.designation} at {user.organization}
                  </Text>
                  <HStack space={4} mt={2}>
                    <Pressable>
                      <HStack space={1} alignItems="baseline">
                        <Text color="light.100" fontWeight="bold">{socialStats.followers}</Text>
                        <Text color="light.400" fontSize="xs">Followers</Text>
                      </HStack>
                    </Pressable>
                    <Pressable>
                      <HStack space={1} alignItems="baseline">
                        <Text color="light.100" fontWeight="bold">{socialStats.following}</Text>
                        <Text color="light.400" fontSize="xs">Following</Text>
                      </HStack>
                    </Pressable>
                  </HStack>
                </VStack>
                <Button
                  size="sm"
                  variant={isFollowing ? "outline" : "solid"}
                  colorScheme="primary"
                  onPress={handleFollow}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </HStack>
              
              {/* Portfolio Stats */}
              <Box bg="dark.700" p={4} rounded="xl">
                <HStack justifyContent="space-between" alignItems="center" mb={2}>
                  <Text color="light.400">Portfolio Value</Text>
                  <Badge colorScheme="success" variant="subtle" rounded="md">
                    <HStack space={1} alignItems="center">
                      <Icon as={Feather} name="arrow-up" size="2xs" />
                      <Text>{portfolio.dailyChangePercent}%</Text>
                    </HStack>
                  </Badge>
                </HStack>
                <Text color="light.100" fontSize="2xl" fontWeight="bold">
                  ${portfolio.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Text>
                <Text color="success.500">
                  +${portfolio.dailyChange.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} today
                </Text>
              </Box>
              
              {/* Ranking */}
              <Box bg="dark.700" p={4} rounded="xl">
                <Text color="light.400" mb={1}>Current Ranking</Text>
                <HStack alignItems="baseline" space={1}>
                  <Text color="light.100" fontSize="2xl" fontWeight="bold">#{portfolio.rank}</Text>
                  <Text color="light.400">of {portfolio.totalUsers}</Text>
                </HStack>
              </Box>
              
              {/* Tabs */}
              <HStack space={4} borderBottomWidth={1} borderBottomColor="dark.700">
                <Pressable 
                  onPress={() => setActiveTab('posts')}
                  pb={2}
                  borderBottomWidth={2}
                  borderBottomColor={activeTab === 'posts' ? "primary.500" : "transparent"}
                >
                  <Text 
                    color={activeTab === 'posts' ? "primary.500" : "light.400"}
                    fontWeight={activeTab === 'posts' ? "bold" : "normal"}
                  >
                    Posts
                  </Text>
                </Pressable>
                <Pressable 
                  onPress={() => setActiveTab('likes')}
                  pb={2}
                  borderBottomWidth={2}
                  borderBottomColor={activeTab === 'likes' ? "primary.500" : "transparent"}
                >
                  <Text 
                    color={activeTab === 'likes' ? "primary.500" : "light.400"}
                    fontWeight={activeTab === 'likes' ? "bold" : "normal"}
                  >
                    Likes
                  </Text>
                </Pressable>
                <Pressable 
                  onPress={() => setActiveTab('comments')}
                  pb={2}
                  borderBottomWidth={2}
                  borderBottomColor={activeTab === 'comments' ? "primary.500" : "transparent"}
                >
                  <Text 
                    color={activeTab === 'comments' ? "primary.500" : "light.400"}
                    fontWeight={activeTab === 'comments' ? "bold" : "normal"}
                  >
                    Comments
                  </Text>
                </Pressable>
              </HStack>
            </VStack>
          }
          ListEmptyComponent={
            <Box alignItems="center" justifyContent="center" py={10}>
              <Icon as={Feather} name="inbox" size="4xl" color="light.700" />
              <Text color="light.400" mt={4}>No {activeTab} yet</Text>
            </Box>
          }
        />
      </Box>
    </SafeAreaView>
  );
};

export default UserProfileScreen; 