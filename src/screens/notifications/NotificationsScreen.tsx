import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Box, Text, VStack, HStack, Icon, Pressable, Spinner, Heading, Avatar, Divider } from 'native-base';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Mock notifications data
const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    type: 'like',
    username: 'crypto_wizard',
    content: 'liked your post about Ethereum',
    timestamp: '5m ago',
    read: false,
  },
  {
    id: '2',
    type: 'comment',
    username: 'stock_guru',
    content: 'commented on your post: "Great analysis!"',
    timestamp: '15m ago',
    read: false,
  },
  {
    id: '3',
    type: 'ranking',
    content: 'You moved up 5 positions in the daily rankings!',
    timestamp: '1h ago',
    read: true,
  },
  {
    id: '4',
    type: 'follow',
    username: 'dividend_king',
    content: 'started following you',
    timestamp: '3h ago',
    read: true,
  },
  {
    id: '5',
    type: 'portfolio',
    content: 'Your portfolio is up 2.3% today',
    timestamp: '5h ago',
    read: true,
  },
  {
    id: '6',
    type: 'system',
    content: 'Welcome to PortSync! Complete your profile to get started.',
    timestamp: '1d ago',
    read: true,
  },
];

const NotificationsScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate fetching notifications
    setTimeout(() => {
      setNotifications(MOCK_NOTIFICATIONS);
      setLoading(false);
    }, 1000);
  }, []);
  
  const handleBack = () => {
    navigation.goBack();
  };
  
  const markAsRead = (id) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };
  
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return { name: 'heart', color: 'red.500' };
      case 'comment':
        return { name: 'chatbubble', color: 'blue.500' };
      case 'ranking':
        return { name: 'trophy', color: 'amber.500' };
      case 'follow':
        return { name: 'person-add', color: 'green.500' };
      case 'portfolio':
        return { name: 'trending-up', color: 'purple.500' };
      case 'system':
        return { name: 'information-circle', color: 'gray.500' };
      default:
        return { name: 'notifications', color: 'primary.500' };
    }
  };
  
  const renderNotification = ({ item }) => {
    const icon = getNotificationIcon(item.type);
    
    return (
      <Pressable 
        onPress={() => markAsRead(item.id)}
        bg={item.read ? 'transparent' : `${theme.colors.primary}10`}
      >
        <HStack 
          space={3} 
          p={4} 
          alignItems="center"
          borderBottomWidth={1}
          borderBottomColor={theme.colors.border}
        >
          <Box 
            bg={`${icon.color}:alpha.20`}
            p={2}
            borderRadius="full"
          >
            <Icon as={Ionicons} name={icon.name} size="md" color={icon.color} />
          </Box>
          
          <VStack flex={1} space={1}>
            <HStack alignItems="center" justifyContent="space-between">
              {item.username ? (
                <Text color={theme.colors.text} fontWeight="bold">
                  {item.username}
                </Text>
              ) : (
                <Text color={theme.colors.text} fontWeight="bold">
                  PortSync
                </Text>
              )}
              <Text color={theme.colors.textSecondary} fontSize="xs">
                {item.timestamp}
              </Text>
            </HStack>
            
            <Text color={theme.colors.text}>
              {item.content}
            </Text>
          </VStack>
          
          {!item.read && (
            <Box 
              w={3} 
              h={3} 
              borderRadius="full" 
              bg="primary.500" 
            />
          )}
        </HStack>
      </Pressable>
    );
  };
  
  return (
    <Box flex={1} bg={theme.colors.background} safeArea>
      <VStack space={0} flex={1}>
        {/* Header */}
        <HStack p={4} alignItems="center" justifyContent="space-between">
          <Pressable onPress={handleBack}>
            <Icon as={Ionicons} name="arrow-back" size="md" color={theme.colors.text} />
          </Pressable>
          <Heading size="md" color={theme.colors.text}>Notifications</Heading>
          <Box w={8} /> {/* Spacer for alignment */}
        </HStack>
        
        <Divider bg={theme.colors.border} />
        
        {/* Notifications list */}
        {loading ? (
          <Box flex={1} justifyContent="center" alignItems="center">
            <Spinner size="lg" color="primary.500" />
          </Box>
        ) : (
          <FlatList
            data={notifications}
            renderItem={renderNotification}
            keyExtractor={item => item.id}
            contentContainerStyle={{ flexGrow: 1 }}
            ListEmptyComponent={
              <Box flex={1} justifyContent="center" alignItems="center" p={10}>
                <Text color={theme.colors.textSecondary}>
                  No notifications yet
                </Text>
              </Box>
            }
          />
        )}
      </VStack>
    </Box>
  );
};

export default NotificationsScreen; 