import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Box, Text, HStack, VStack, Heading, Icon, Pressable, Spinner, Button } from 'native-base';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Mock data for organization rankings
const MOCK_ORG_RANKINGS = [
  {
    id: '1',
    username: 'crypto_wizard',
    designation: 'Software Engineer',
    rank: 1,
    previousRank: 3,
    portfolioValue: 45678.90,
    dailyChange: 5.2,
    weeklyChange: 12.4,
  },
  {
    id: '2',
    username: 'stock_guru',
    designation: 'Financial Analyst',
    rank: 2,
    previousRank: 1,
    portfolioValue: 42345.67,
    dailyChange: 3.8,
    weeklyChange: 8.7,
  },
  {
    id: '3',
    username: 'dividend_king',
    designation: 'Marketing Manager',
    rank: 3,
    previousRank: 5,
    portfolioValue: 38765.43,
    dailyChange: 2.9,
    weeklyChange: 6.5,
  },
];

const OrganizationRankingsScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  
  const organization = route.params?.organization || 'Acme Corp';
  
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    fetchRankings();
  }, []);
  
  const fetchRankings = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setRankings(MOCK_ORG_RANKINGS);
      setLoading(false);
    }, 1000);
  };
  
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchRankings();
    setRefreshing(false);
  };
  
  const handleBack = () => {
    navigation.goBack();
  };
  
  const renderRankingItem = ({ item, index }) => {
    return (
      <Pressable>
        <Box 
          bg={theme.colors.card}
          borderRadius="lg"
          p={4}
          mb={3}
        >
          <HStack space={3} alignItems="center">
            <Box 
              width={10} 
              height={10} 
              borderRadius="full" 
              bg={index < 3 ? 
                index === 0 ? "primary.500" : 
                index === 1 ? "amber.500" : "bronze.500" 
                : "gray.500"
              }
              justifyContent="center"
              alignItems="center"
            >
              <Text color="white" fontWeight="bold">
                {item.rank}
              </Text>
            </Box>
            
            <VStack flex={1}>
              <Text color={theme.colors.text} fontWeight="bold" fontSize="md">
                {item.username}
              </Text>
              <Text color={theme.colors.textSecondary} fontSize="xs">
                {item.designation}
              </Text>
              
              <HStack space={4} mt={2}>
                <VStack>
                  <Text color={theme.colors.textSecondary} fontSize="xs">
                    Daily
                  </Text>
                  <Text 
                    color={item.dailyChange >= 0 ? "green.500" : "red.500"} 
                    fontWeight="bold"
                  >
                    {item.dailyChange >= 0 ? "+" : ""}{item.dailyChange}%
                  </Text>
                </VStack>
                
                <VStack>
                  <Text color={theme.colors.textSecondary} fontSize="xs">
                    Weekly
                  </Text>
                  <Text 
                    color={item.weeklyChange >= 0 ? "green.500" : "red.500"} 
                    fontWeight="bold"
                  >
                    {item.weeklyChange >= 0 ? "+" : ""}{item.weeklyChange}%
                  </Text>
                </VStack>
                
                <VStack>
                  <Text color={theme.colors.textSecondary} fontSize="xs">
                    Portfolio
                  </Text>
                  <Text color={theme.colors.text} fontWeight="bold">
                    ${item.portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          </HStack>
        </Box>
      </Pressable>
    );
  };
  
  return (
    <Box flex={1} bg={theme.colors.background} safeArea>
      <VStack space={0} flex={1}>
        <HStack p={4} alignItems="center">
          <Pressable onPress={handleBack} mr={3}>
            <Icon as={Ionicons} name="arrow-back" size="md" color={theme.colors.text} />
          </Pressable>
          <Heading color={theme.colors.text} size="lg">{organization} Rankings</Heading>
        </HStack>
        
        {loading && !refreshing ? (
          <Box flex={1} justifyContent="center" alignItems="center">
            <Spinner size="lg" color="primary.500" />
          </Box>
        ) : (
          <FlatList
            data={rankings}
            renderItem={renderRankingItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                tintColor={theme.colors.primary}
              />
            }
            ListEmptyComponent={
              <Box flex={1} justifyContent="center" alignItems="center" py={10}>
                <Text color={theme.colors.textSecondary}>
                  No rankings available for this organization
                </Text>
              </Box>
            }
          />
        )}
      </VStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
});

export default OrganizationRankingsScreen; 