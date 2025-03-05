import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../contexts/ThemeContext';

// Screens
import HomeScreen from '../screens/home/HomeScreen';
import PortfolioScreen from '../screens/portfolio/PortfolioScreen';
import RankingsScreen from '../screens/rankings/RankingsScreen';
import PostDetailScreen from '../screens/social/PostDetailScreen';
import CreatePostScreen from '../screens/social/CreatePostScreen';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import UserProfileScreen from '../screens/profile/UserProfileScreen';
import PortfolioDetailScreen from '../screens/portfolio/PortfolioDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Home Stack Navigator
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeFeed" component={HomeScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="PortfolioDetail" component={PortfolioDetailScreen} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Portfolio') {
            iconName = focused ? 'pie-chart' : 'pie-chart-outline';
          } else if (route.name === 'Rankings') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStack} 
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen name="Portfolio" component={PortfolioScreen} />
      <Tab.Screen name="Rankings" component={RankingsScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator; 