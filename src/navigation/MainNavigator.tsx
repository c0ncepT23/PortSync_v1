import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../contexts/ThemeContext';
import RankingsTabIcon from '../components/navigation/RankingsTabIcon';
import { View, Text } from 'react-native';

// Screens
import HomeScreen from '../screens/home/HomeScreen';
import ConnectPortfolioScreen from '../screens/portfolio/ConnectPortfolioScreen';
import PortfolioOverviewScreen from '../screens/portfolio/PortfolioOverviewScreen';
import AssetDetailScreen from '../screens/portfolio/AssetDetailScreen';
import MarketScreen from '../screens/market/MarketScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import RankingsScreen from '../screens/rankings/RankingsScreen';
import OrganizationRankingsScreen from '../screens/rankings/OrganizationRankingsScreen';
import CreatePostScreen from '../screens/social/CreatePostScreen';
import PostDetailScreen from '../screens/social/PostDetailScreen';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';

// Create navigators
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const PortfolioStack = createStackNavigator();
const MarketStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const RankingsStack = createStackNavigator();

// Inline SettingsScreen component
const SettingsScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings Screen</Text>
    </View>
  );
};

// Home Stack Navigator
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeFeed" component={HomeScreen} />
      <HomeStack.Screen name="PostDetail" component={PostDetailScreen} />
      <HomeStack.Screen name="CreatePost" component={CreatePostScreen} />
      <HomeStack.Screen name="Notifications" component={NotificationsScreen} />
    </HomeStack.Navigator>
  );
};

// Portfolio Stack Navigator
const PortfolioStackNavigator = () => {
  return (
    <PortfolioStack.Navigator screenOptions={{ headerShown: false }}>
      <PortfolioStack.Screen name="PortfolioOverview" component={PortfolioOverviewScreen} />
      <PortfolioStack.Screen name="ConnectPortfolio" component={ConnectPortfolioScreen} />
      <PortfolioStack.Screen name="AssetDetail" component={AssetDetailScreen} />
    </PortfolioStack.Navigator>
  );
};

// Market Stack Navigator
const MarketStackNavigator = () => {
  return (
    <MarketStack.Navigator screenOptions={{ headerShown: false }}>
      <MarketStack.Screen name="MarketList" component={MarketScreen} />
    </MarketStack.Navigator>
  );
};

// Rankings Stack Navigator
const RankingsStackNavigator = () => {
  return (
    <RankingsStack.Navigator screenOptions={{ headerShown: false }}>
      <RankingsStack.Screen name="GlobalRankings" component={RankingsScreen} />
      <RankingsStack.Screen name="OrganizationRankings" component={OrganizationRankingsScreen} />
    </RankingsStack.Navigator>
  );
};

// Profile Stack Navigator
const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
      <ProfileStack.Screen name="ConnectPortfolio" component={ConnectPortfolioScreen} />
    </ProfileStack.Navigator>
  );
};

// Main Tab Navigator
const MainNavigator = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Portfolio') {
            iconName = focused ? 'pie-chart' : 'pie-chart-outline';
          } else if (route.name === 'RankingsTab') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          } else if (route.name === 'Market') {
            iconName = focused ? 'trending-up' : 'trending-up-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Portfolio" component={PortfolioStackNavigator} />
      <Tab.Screen 
        name="RankingsTab"
        component={RankingsStackNavigator}
        options={{
          tabBarLabel: "Rankings",
          tabBarIcon: (props) => <RankingsTabIcon {...props} />,
        }}
      />
      <Tab.Screen 
        name="Market" 
        component={MarketStackNavigator}
        options={{ tabBarBadge: '🔥' }}
      />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

export default MainNavigator; 