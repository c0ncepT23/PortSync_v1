import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Box, Text, VStack, HStack, Input, Button, Icon, Avatar, Divider, Spinner, Pressable } from 'native-base';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Mock data for comments
const MOCK_COMMENTS = [
  {
    id: '1',
    username: 'crypto_fan',
    content: 'I completely agree with your analysis!',
    timestamp: '15m ago',
    likes: 5,
  },
  {
    id: '2',
    username: 'stock_trader',
    content: 'Have you considered the impact of the recent Fed announcement?',
    timestamp: '32m ago',
    likes: 2,
  },
  {
    id: '3',
    username: 'dividend_hunter',
    content: 'What are your thoughts on energy stocks in this environment?',
    timestamp: '1h ago',
    likes: 8,
  },
];

const PostDetailScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  
  // Get post from route params or use a default
  const post = route.params?.post || {
    id: '1',
    username: 'crypto_enthusiast',
    userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    content: 'Just increased my ETH position. Bullish on the merge!',
    timestamp: '2 hours ago',
    likes: 24,
    comments: 5,
  };
  
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  
  useEffect(() => {
    // Simulate fetching comments
    setTimeout(() => {
      setComments(MOCK_COMMENTS);
      setLoading(false);
    }, 1000);
  }, []);
  
  const handleBack = () => {
    navigation.goBack();
  };
  
  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };
  
  const handleComment = () => {
    if (!commentText.trim()) return;
    
    // Add new comment to the list
    const newComment = {
      id: Date.now().toString(),
      username: 'you', // In a real app, get from user state
      content: commentText,
      timestamp: 'Just now',
      likes: 0,
    };
    
    setComments([newComment, ...comments]);
    setCommentText('');
  };
  
  const renderComment = ({ item }) => {
    return (
      <VStack space={2} p={4} borderBottomWidth={1} borderBottomColor={theme.colors.border}>
        <HStack space={2} alignItems="center">
          <Avatar 
            size="sm" 
            bg="primary.500"
          >
            {item.username.charAt(0).toUpperCase()}
          </Avatar>
          <VStack>
            <Text color={theme.colors.text} fontWeight="bold">
              {item.username}
            </Text>
            <Text color={theme.colors.textSecondary} fontSize="xs">
              {item.timestamp}
            </Text>
          </VStack>
        </HStack>
        
        <Text color={theme.colors.text}>
          {item.content}
        </Text>
        
        <HStack space={4} alignItems="center">
          <Pressable onPress={() => {}}>
            <HStack space={1} alignItems="center">
              <Icon as={Ionicons} name="heart-outline" size="sm" color={theme.colors.textSecondary} />
              <Text color={theme.colors.textSecondary} fontSize="xs">
                {item.likes}
              </Text>
            </HStack>
          </Pressable>
          
          <Pressable onPress={() => {}}>
            <HStack space={1} alignItems="center">
              <Icon as={Ionicons} name="chatbubble-outline" size="sm" color={theme.colors.textSecondary} />
              <Text color={theme.colors.textSecondary} fontSize="xs">
                Reply
              </Text>
            </HStack>
          </Pressable>
        </HStack>
      </VStack>
    );
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Box flex={1} bg={theme.colors.background} safeArea>
        <VStack space={0} flex={1}>
          {/* Header */}
          <HStack p={4} alignItems="center" space={4}>
            <Pressable onPress={handleBack}>
              <Icon as={Ionicons} name="arrow-back" size="md" color={theme.colors.text} />
            </Pressable>
            <Text color={theme.colors.text} fontWeight="bold" fontSize="lg">
              Post
            </Text>
          </HStack>
          
          <Divider bg={theme.colors.border} />
          
          {/* Post */}
          <VStack space={3} p={4} borderBottomWidth={1} borderBottomColor={theme.colors.border}>
            <HStack space={3} alignItems="center">
              <Avatar 
                source={{ uri: post.userAvatar }} 
                size="md"
                fallbackSource={{
                  uri: `https://ui-avatars.com/api/?name=${post.username}&background=random`
                }}
              />
              <VStack>
                <Text color={theme.colors.text} fontWeight="bold">
                  {post.username}
                </Text>
                <Text color={theme.colors.textSecondary} fontSize="xs">
                  {post.timestamp}
                </Text>
              </VStack>
            </HStack>
            
            <Text color={theme.colors.text} fontSize="md">
              {post.content}
            </Text>
            
            <HStack space={4} alignItems="center">
              <Pressable onPress={handleLike}>
                <HStack space={1} alignItems="center">
                  <Icon 
                    as={Ionicons} 
                    name={liked ? "heart" : "heart-outline"} 
                    size="sm" 
                    color={liked ? "red.500" : theme.colors.textSecondary} 
                  />
                  <Text color={theme.colors.textSecondary}>
                    {likeCount}
                  </Text>
                </HStack>
              </Pressable>
              
              <HStack space={1} alignItems="center">
                <Icon as={Ionicons} name="chatbubble-outline" size="sm" color={theme.colors.textSecondary} />
                <Text color={theme.colors.textSecondary}>
                  {comments.length}
                </Text>
              </HStack>
            </HStack>
          </VStack>
          
          {/* Comments */}
          {loading ? (
            <Box flex={1} justifyContent="center" alignItems="center">
              <Spinner size="lg" color="primary.500" />
            </Box>
          ) : (
            <FlatList
              data={comments}
              renderItem={renderComment}
              keyExtractor={item => item.id}
              contentContainerStyle={{ flexGrow: 1 }}
              ListEmptyComponent={
                <Box flex={1} justifyContent="center" alignItems="center" p={10}>
                  <Text color={theme.colors.textSecondary}>
                    No comments yet. Be the first to comment!
                  </Text>
                </Box>
              }
            />
          )}
          
          {/* Comment input */}
          <HStack 
            space={2} 
            p={4} 
            borderTopWidth={1} 
            borderTopColor={theme.colors.border}
            alignItems="center"
            bg={theme.colors.card}
          >
            <Input
              flex={1}
              placeholder="Add a comment..."
              value={commentText}
              onChangeText={setCommentText}
              borderRadius="full"
              bg={theme.colors.background}
              color={theme.colors.text}
            />
            <Button
              onPress={handleComment}
              isDisabled={!commentText.trim()}
              colorScheme="primary"
              borderRadius="full"
              p={2}
              minW={10}
            >
              <Icon as={Ionicons} name="send" size="sm" color="white" />
            </Button>
          </HStack>
        </VStack>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default PostDetailScreen; 