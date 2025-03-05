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
  Input,
  IconButton,
  FlatList,
  Spinner,
  useTheme
} from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

// Mock comments data
const mockComments = [
  {
    id: '1',
    user: {
      username: 'fintech_guru',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    },
    content: 'I agree! Tech stocks have been showing strong momentum lately.',
    time: '1h ago',
    likes: 5
  },
  {
    id: '2',
    user: {
      username: 'value_investor',
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
    },
    content: "What specific tech stocks are you looking at? I'm considering adding more AAPL to my portfolio.",
    time: '45m ago',
    likes: 3
  },
  {
    id: '3',
    user: {
      username: 'crypto_whale',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    content: 'Have you considered diversifying into some crypto as well? The correlation with tech stocks has been decreasing.',
    time: '30m ago',
    likes: 2
  }
];

const PostDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  
  // Get the post from route params
  const post = route.params?.post;
  
  useEffect(() => {
    if (!post) {
      navigation.goBack();
      return;
    }
    
    // Set initial like count from post
    setLikeCount(post.likes || 0);
    
    // Simulate loading comments
    const timer = setTimeout(() => {
      setComments(mockComments);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [post, navigation]);
  
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
      id: `new-${Date.now()}`,
      user: {
        username: 'me',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
      content: commentText,
      time: 'Just now',
      likes: 0
    };
    
    setComments([newComment, ...comments]);
    setCommentText('');
  };
  
  const renderComment = ({ item }) => {
    return (
      <Box py={3}>
        <HStack space={3} alignItems="flex-start">
          <Avatar 
            source={{ uri: item.user.avatar }} 
            size="sm"
            bg="primary.500"
          >
            {item.user.username.charAt(0).toUpperCase()}
          </Avatar>
          <VStack flex={1}>
            <HStack alignItems="center" justifyContent="space-between">
              <Text color="light.100" fontWeight="bold">{item.user.username}</Text>
              <Text color="light.400" fontSize="xs">{item.time}</Text>
            </HStack>
            <Text color="light.100" mt={1}>{item.content}</Text>
            <HStack space={4} mt={2}>
              <HStack space={1} alignItems="center">
                <Icon as={Feather} name="heart" size="xs" color="light.400" />
                <Text color="light.400" fontSize="xs">{item.likes}</Text>
              </HStack>
              <HStack space={1} alignItems="center">
                <Icon as={Feather} name="message-circle" size="xs" color="light.400" />
                <Text color="light.400" fontSize="xs">Reply</Text>
              </HStack>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    );
  };
  
  if (!post) {
    return null;
  }
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.dark[900] }}>
      <Box flex={1}>
        {/* Header */}
        <HStack px={4} py={2} alignItems="center" borderBottomWidth={1} borderBottomColor="dark.700">
          <Pressable onPress={handleBack} mr={3}>
            <Icon as={Feather} name="arrow-left" size="md" color="light.100" />
          </Pressable>
          <Text color="light.100" fontSize="lg" fontWeight="bold">Post</Text>
        </HStack>
        
        {/* Post Content */}
        <Box p={4} borderBottomWidth={1} borderBottomColor="dark.700">
          <HStack space={3} alignItems="flex-start">
            <Avatar 
              source={{ uri: post.user.avatar }} 
              size="md"
              bg="primary.500"
            >
              {post.user.username.charAt(0).toUpperCase()}
            </Avatar>
            <VStack flex={1}>
              <HStack alignItems="center" justifyContent="space-between">
                <VStack>
                  <Text color="light.100" fontWeight="bold">{post.user.username}</Text>
                  <Text color="light.400" fontSize="xs">
                    {post.user.designation} at {post.user.organization}
                  </Text>
                </VStack>
                <Text color="light.400" fontSize="xs">{post.time}</Text>
              </HStack>
              <Text color="light.100" mt={2} fontSize="md">{post.content}</Text>
              
              {/* Post Actions */}
              <HStack justifyContent="space-between" mt={4}>
                <HStack space={6}>
                  <Pressable onPress={handleLike}>
                    <HStack space={1} alignItems="center">
                      <Icon 
                        as={Feather} 
                        name={liked ? "heart" : "heart"} 
                        size="sm" 
                        color={liked ? "error.500" : "light.400"} 
                      />
                      <Text color={liked ? "error.500" : "light.400"}>{likeCount}</Text>
                    </HStack>
                  </Pressable>
                  <HStack space={1} alignItems="center">
                    <Icon as={Feather} name="message-circle" size="sm" color="light.400" />
                    <Text color="light.400">{comments.length}</Text>
                  </HStack>
                </HStack>
                <Icon as={Feather} name="share-2" size="sm" color="light.400" />
              </HStack>
            </VStack>
          </HStack>
        </Box>
        
        {/* Comments Section */}
        {loading ? (
          <Box flex={1} justifyContent="center" alignItems="center">
            <Spinner size="lg" color="primary.500" />
            <Text color="light.100" mt={2}>Loading comments...</Text>
          </Box>
        ) : (
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={renderComment}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            ItemSeparatorComponent={() => <Divider bg="dark.700" />}
            ListEmptyComponent={
              <Box py={10} alignItems="center">
                <Text color="light.400">No comments yet</Text>
                <Text color="light.600" fontSize="xs">Be the first to comment</Text>
              </Box>
            }
          />
        )}
        
        {/* Comment Input */}
        <HStack 
          space={2} 
          p={4} 
          alignItems="center" 
          borderTopWidth={1} 
          borderTopColor="dark.700"
          bg="dark.800"
        >
          <Avatar 
            size="sm" 
            bg="primary.500"
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          >
            ME
          </Avatar>
          <Input
            flex={1}
            placeholder="Add a comment..."
            value={commentText}
            onChangeText={setCommentText}
            variant="filled"
            bg="dark.700"
            borderWidth={0}
            color="light.100"
            _focus={{
              bg: "dark.700",
              borderColor: "transparent"
            }}
          />
          <IconButton
            icon={<Icon as={Feather} name="send" size="sm" color="primary.500" />}
            onPress={handleComment}
            isDisabled={!commentText.trim()}
            variant="ghost"
            _pressed={{
              bg: "dark.700"
            }}
          />
        </HStack>
      </Box>
    </SafeAreaView>
  );
};

export default PostDetailScreen; 