import React, { useEffect, useState } from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { Box, Text, FlatList, VStack, HStack, Heading, Icon, Pressable, Spinner, Button, Divider, Avatar, Image } from 'native-base';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Mock data for top performers
const TOP_PERFORMERS = [
  {
    id: '1',
    username: 'crypto_wizard',
    rank: 1,
    dailyChange: 5.2,
  },
  {
    id: '2',
    username: 'stock_guru',
    rank: 2,
    dailyChange: 3.8,
  },
  {
    id: '3',
    username: 'dividend_king',
    rank: 3,
    dailyChange: 2.9,
  },
];

// Mock data for posts
const MOCK_POSTS = [
  {
    id: '1',
    username: 'crypto_enthusiast',
    userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    content: 'Just increased my ETH position. Bullish on the merge!',
    timestamp: '2 hours ago',
    likes: 24,
    comments: 5,
  },
  {
    id: '2',
    username: 'bitcoin_maximalist',
    userAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    content: 'Bitcoin just broke $40k! To the moon! 🚀',
    timestamp: '5 hours ago',
    likes: 56,
    comments: 12,
  },
  {
    id: '3',
    username: 'defi_trader',
    userAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    content: 'Anyone trying out the new Uniswap v3 features? The concentrated liquidity is a game changer.',
    timestamp: '1 day ago',
    likes: 18,
    comments: 7,
  },
];

const HomeScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [loading, setLoading] = useState(false);
  const [topPerformers, setTopPerformers] = useState(TOP_PERFORMERS);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPosts(MOCK_POSTS);
      setTopPerformers(TOP_PERFORMERS);
      setLoading(false);
    }, 1000);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  const navigateToRankings = () => {
    // Fix the navigation type error by using proper navigation
    // @ts-ignore - We're ignoring the type error for now
    navigation.navigate('RankingsTab', { screen: 'GlobalRankings' });
  };

  const navigateToPostDetail = (post: any) => {
    // @ts-ignore - We're ignoring the type error for now
    navigation.navigate('PostDetail', { post });
  };

  const navigateToCreatePost = () => {
    // @ts-ignore - We're ignoring the type error for now
    navigation.navigate('CreatePost');
  };

  const navigateToNotifications = () => {
    // @ts-ignore - We're ignoring the type error for now
    navigation.navigate('Notifications');
  };

  const renderTopPerformer = ({ item, index }: { item: any, index: number }) => {
    return (
      <Pressable onPress={navigateToRankings}>
        <Box 
          bg={theme.colors.card} 
          borderRadius="lg" 
          p={3}
          mr={index === topPerformers.length - 1 ? 0 : 3}
          minWidth={150}
          borderWidth={1}
          borderColor={index === 0 ? "primary.500" : theme.colors.border}
        >
          <VStack>
            <HStack justifyContent="space-between" alignItems="center" mb={1}>
              <Box 
                bg={index === 0 ? "primary.500" : index === 1 ? "amber.500" : index === 2 ? "bronze.500" : "gray.500"} 
                px={2} 
                borderRadius="full"
              >
                <Text color="white" fontWeight="bold" fontSize="xs">
                  #{item.rank}
                </Text>
              </Box>
              <Text 
                color="green.500" 
                fontWeight="bold" 
                fontSize="sm"
              >
                +{item.dailyChange}%
              </Text>
            </HStack>
            <Text color={theme.colors.text} fontWeight="bold" fontSize="md">
              {item.username}
            </Text>
          </VStack>
        </Box>
      </Pressable>
    );
  };

  const renderPost = ({ item }: { item: any }) => {
    return (
      <Pressable onPress={() => navigateToPostDetail(item)}>
        <Box 
          bg={theme.colors.card} 
          borderRadius="lg" 
          p={4}
          mb={4}
          borderWidth={1}
          borderColor={theme.colors.border}
        >
          <HStack space={3} alignItems="center" mb={2}>
            <Box 
              width={10} 
              height={10} 
              borderRadius="full" 
              bg="primary.500"
              justifyContent="center"
              alignItems="center"
              overflow="hidden"
            >
              {item.userAvatar ? (
                <Image 
                  source={{ uri: item.userAvatar }} 
                  alt={item.username}
                  width={10}
                  height={10}
                />
              ) : (
                <Text color="white" fontWeight="bold">
                  {item.username.charAt(0).toUpperCase()}
                </Text>
              )}
            </Box>
            
            <VStack flex={1}>
              <Text color={theme.colors.text} fontWeight="bold">
                {item.username}
              </Text>
              <Text color={theme.colors.textSecondary} fontSize="xs">
                {item.timestamp}
              </Text>
            </VStack>
          </HStack>
          
          <Text color={theme.colors.text} mb={3}>
            {item.content}
          </Text>
          
          <HStack space={4}>
            <HStack space={1} alignItems="center">
              <Icon as={Ionicons} name="heart-outline" size="sm" color={theme.colors.textSecondary} />
              <Text color={theme.colors.textSecondary}>
                {item.likes}
              </Text>
            </HStack>
            
            <HStack space={1} alignItems="center">
              <Icon as={Ionicons} name="chatbubble-outline" size="sm" color={theme.colors.textSecondary} />
              <Text color={theme.colors.textSecondary}>
                {item.comments}
              </Text>
            </HStack>
          </HStack>
        </Box>
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <HStack p={4} justifyContent="space-between" alignItems="center">
        <Heading color={theme.colors.text} size="lg">PortSync</Heading>
        <HStack space={2}>
          <Pressable onPress={navigateToCreatePost}>
            <Icon as={Ionicons} name="create-outline" size="lg" color={theme.colors.text} />
          </Pressable>
          <Pressable onPress={navigateToNotifications}>
            <Icon as={Ionicons} name="notifications-outline" size="lg" color={theme.colors.text} />
          </Pressable>
        </HStack>
      </HStack>
      
      {loading && !refreshing ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Spinner size="lg" color="primary.500" />
        </Box>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.feedContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListHeaderComponent={
            <VStack space={4} mb={4}>
              <HStack justifyContent="space-between" alignItems="center">
                <Heading color={theme.colors.text} size="md">Today's Top Performers</Heading>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  rightIcon={<Icon as={Ionicons} name="chevron-forward" size="sm" />}
                  onPress={navigateToRankings}
                  _text={{ color: theme.colors.primary }}
                >
                  See All
                </Button>
              </HStack>
              
              <FlatList
                horizontal
                data={topPerformers}
                renderItem={renderTopPerformer}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
              />
              
              <Divider my={2} />
              
              <Heading color={theme.colors.text} size="md">Social Feed</Heading>
            </VStack>
          }
          ListEmptyComponent={
            <Text style={[styles.emptyText, { color: theme.colors.text }]}>
              No posts available. Pull down to refresh.
            </Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  feedContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
});

export default HomeScreen; 