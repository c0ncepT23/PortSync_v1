import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

const ProfileScreen = ({ navigation }) => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = useState(theme.dark);

  // Mock user data - replace with actual user data from your auth state
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    joinDate: 'January 2023',
    portfolioValue: 24563.78,
    portfolioChange: 3.2,
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    toggleTheme();
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              // Clear auth token
              await AsyncStorage.removeItem('userToken');
              
              // Instead of trying to navigate directly, use the global refresh function
              // @ts-ignore
              if (global.refreshAuthStatus) {
                // @ts-ignore
                global.refreshAuthStatus();
              }
              
              console.log('Logged out successfully');
            } catch (error) {
              console.log('Error logging out:', error);
            }
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      id: 'account',
      title: 'Account Settings',
      icon: 'person-outline',
      onPress: () => navigation.navigate('AccountSettings'),
    },
    {
      id: 'security',
      title: 'Security',
      icon: 'shield-checkmark-outline',
      onPress: () => navigation.navigate('SecuritySettings'),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: 'notifications-outline',
      onPress: () => navigation.navigate('NotificationSettings'),
    },
    {
      id: 'payment',
      title: 'Payment Methods',
      icon: 'card-outline',
      onPress: () => navigation.navigate('PaymentMethods'),
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: 'help-circle-outline',
      onPress: () => navigation.navigate('HelpSupport'),
    },
    {
      id: 'about',
      title: 'About',
      icon: 'information-circle-outline',
      onPress: () => navigation.navigate('About'),
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Profile</Text>
        <TouchableOpacity>
          <Icon name="settings-outline" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
      
      <View style={[styles.profileCard, { backgroundColor: theme.colors.card }]}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.profileInfo}>
          <Text style={[styles.userName, { color: theme.colors.text }]}>{user.name}</Text>
          <Text style={[styles.userEmail, { color: theme.colors.textSecondary }]}>{user.email}</Text>
          <Text style={[styles.joinDate, { color: theme.colors.textSecondary }]}>Member since {user.joinDate}</Text>
        </View>
      </View>
      
      <View style={[styles.portfolioSummary, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.portfolioLabel, { color: theme.colors.textSecondary }]}>Portfolio Value</Text>
        <Text style={[styles.portfolioValue, { color: theme.colors.text }]}>${user.portfolioValue.toLocaleString()}</Text>
        <View style={styles.changeContainer}>
          <Icon 
            name={user.portfolioChange >= 0 ? "trending-up-outline" : "trending-down-outline"} 
            size={16} 
            color={user.portfolioChange >= 0 ? '#4CAF50' : '#F44336'} 
          />
          <Text 
            style={[
              styles.changeText, 
              { color: user.portfolioChange >= 0 ? '#4CAF50' : '#F44336' }
            ]}
          >
            {user.portfolioChange >= 0 ? '+' : ''}{user.portfolioChange}% (All time)
          </Text>
        </View>
      </View>
      
      <View style={styles.menuSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Settings</Text>
        
        <View style={[styles.menuCard, { backgroundColor: theme.colors.card }]}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={item.id}
              style={[
                styles.menuItem, 
                index < menuItems.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.colors.border }
              ]}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <Icon name={item.icon} size={22} color={theme.colors.primary} />
                <Text style={[styles.menuItemText, { color: theme.colors.text }]}>{item.title}</Text>
              </View>
              <Icon name="chevron-forward" size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.preferencesSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Preferences</Text>
        
        <View style={[styles.preferencesCard, { backgroundColor: theme.colors.card }]}>
          <View style={styles.preferenceItem}>
            <View style={styles.preferenceItemLeft}>
              <Icon name={isDarkMode ? "moon" : "sunny"} size={22} color={theme.colors.primary} />
              <Text style={[styles.preferenceItemText, { color: theme.colors.text }]}>Dark Mode</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={handleThemeToggle}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={'#f4f3f4'}
            />
          </View>
        </View>
      </View>
      
      <TouchableOpacity 
        style={[styles.logoutButton, { backgroundColor: theme.colors.card }]}
        onPress={handleLogout}
      >
        <Icon name="log-out-outline" size={22} color="#F44336" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      
      <View style={styles.versionContainer}>
        <Text style={[styles.versionText, { color: theme.colors.textSecondary }]}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileInfo: {
    marginLeft: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 4,
  },
  joinDate: {
    fontSize: 12,
  },
  portfolioSummary: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  portfolioLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  portfolioValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    marginLeft: 4,
    fontWeight: '500',
  },
  menuSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  menuCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 12,
  },
  preferencesSection: {
    marginBottom: 24,
  },
  preferencesCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  preferenceItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  preferenceItemText: {
    fontSize: 16,
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  logoutText: {
    color: '#F44336',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  versionText: {
    fontSize: 12,
  },
});

export default ProfileScreen; 