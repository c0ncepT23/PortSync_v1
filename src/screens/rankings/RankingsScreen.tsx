import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { Box, Text, HStack, VStack, Heading, Icon, Pressable, Spinner, Button, Avatar, Badge } from 'native-base';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Mock data for rankings
const MOCK_RANKINGS = [
  {
    id: '1',
    username: 'crypto_wizard',
    designation: 'Software Engineer',
    organization: 'Acme Corp',
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
    organization: 'Globex Industries',
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
    organization: 'Initech',
    rank: 3,
    previousRank: 5,
    portfolioValue: 38765.43,
    dailyChange: 2.9,
    weeklyChange: 6.5,
  },
  {
    id: '4',
    username: 'passive_income',
    designation: 'HR Manager',
    organization: 'Acme Corp',
    rank: 4,
    previousRank: 4,
    portfolioValue: 35432.10,
    dailyChange: 1.5,
    weeklyChange: 4.2,
  },
  {
    id: '5',
    username: 'value_investor',
    designation: 'Product Manager',
    organization: 'Globex Industries',
    rank: 5,
    previousRank: 2,
    portfolioValue: 32109.87,
    dailyChange: -0.8,
    weeklyChange: 3.1,
  },
];

// Time period options
const TIME_PERIODS = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'All Time', value: 'allTime' },
];

const RankingsScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [timeFrame, setTimeFrame] = useState('daily');
  const [userRank, setUserRank] = useState(null);

  // Fetch rankings data
  useEffect(() => {
    fetchRankings();
  }, []);

  const fetchRankings = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setRankings(MOCK_RANKINGS);
      // Set user's rank (for demo purposes)
      setUserRank({
        rank: 12,
        previousRank: 15,
        username: 'you',
        portfolioValue: 15432.10,
        dailyChange: 1.8,
        weeklyChange: 4.2,
      });
      setLoading(false);
    }, 1000);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchRankings();
    setRefreshing(false);
  };

  const navigateToOrganizationRankings = (organization) => {
    // @ts-ignore
    navigation.navigate('OrganizationRankings', { organization });
  };

  // Get color based on change value
  const getChangeColor = (change) => {
    return change > 0 ? "green.500" : change < 0 ? "red.500" : theme.colors.textSecondary;
  };

  // Get icon based on rank change
  const getRankChangeIcon = (current, previous) => {
    if (current < previous) {
      return { name: 'arrow-up', color: 'green.500' };
    } else if (current > previous) {
      return { name: 'arrow-down', color: 'red.500' };
    }
    return { name: 'remove', color: 'gray.500' };
  };

  const renderRankingItem = ({ item, index }) => {
    const rankChange = getRankChangeIcon(item.rank, item.previousRank);
    
    return (
      <Pressable onPress={() => navigateToOrganizationRankings(item.organization)}>
        <Box 
          bg={theme.colors.card}
          borderRadius="lg"
          p={4}
          mb={3}
          borderWidth={1}
          borderColor={theme.colors.border}
        >
          <HStack space={3} alignItems="center">
            <Box 
              width={10} 
              height={10} 
              borderRadius="full" 
              bg={item.rank <= 3 ? 
                (item.rank === 1 ? "primary.500" : 
                 item.rank === 2 ? "amber.500" : "bronze.500") : 
                "gray.500"
              }
              justifyContent="center"
              alignItems="center"
            >
              <Text color="white" fontWeight="bold">
                {item.rank}
              </Text>
            </Box>
            
            <VStack flex={1}>
              <HStack alignItems="center" space={2}>
                <Text color={theme.colors.text} fontWeight="bold" fontSize="md">
                  {item.username}
                </Text>
                <HStack alignItems="center" space={1}>
                  <Icon as={Ionicons} name={rankChange.name} size="xs" color={rankChange.color} />
                  <Text color={rankChange.color} fontSize="xs">
                    {Math.abs(item.rank - item.previousRank)}
                  </Text>
                </HStack>
              </HStack>
              
              <HStack space={1} alignItems="center">
                <Text color={theme.colors.textSecondary} fontSize="xs">
                  {item.designation}
                </Text>
                <Text color={theme.colors.textSecondary} fontSize="xs">•</Text>
                <Text 
                  color="primary.500" 
                  fontSize="xs"
                  onPress={() => navigateToOrganizationRankings(item.organization)}
                >
                  {item.organization}
                </Text>
              </HStack>
            </VStack>
            
            <VStack alignItems="flex-end" space={1}>
              <Text color={theme.colors.text} fontWeight="bold">
                ${item.portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </Text>
              <Text 
                color={getChangeColor(
                  timeFrame === 'weekly' ? item.weeklyChange : item.dailyChange
                )} 
                fontSize="sm"
              >
                {(timeFrame === 'weekly' ? item.weeklyChange : item.dailyChange) > 0 ? '+' : ''}
                {timeFrame === 'weekly' ? item.weeklyChange : item.dailyChange}%
              </Text>
            </VStack>
          </HStack>
        </Box>
      </Pressable>
    );
  };

  const renderUserRank = () => {
    if (!userRank) return null;
    
    const rankChange = getRankChangeIcon(userRank.rank, userRank.previousRank);
    
    return (
      <Box 
        bg={theme.colors.card}
        borderRadius="lg"
        p={4}
        mb={4}
        borderWidth={1}
        borderColor="primary.500"
      >
        <HStack space={3} alignItems="center">
          <Box 
            width={10} 
            height={10} 
            borderRadius="full" 
            bg="primary.500"
            justifyContent="center"
            alignItems="center"
          >
            <Text color="white" fontWeight="bold">
              {userRank.rank}
            </Text>
          </Box>
          
          <VStack flex={1}>
            <HStack alignItems="center" space={2}>
              <Text color={theme.colors.text} fontWeight="bold" fontSize="md">
                {userRank.username}
              </Text>
              <Badge colorScheme="primary" variant="solid" rounded="full">
                You
              </Badge>
              <HStack alignItems="center" space={1}>
                <Icon as={Ionicons} name={rankChange.name} size="xs" color={rankChange.color} />
                <Text color={rankChange.color} fontSize="xs">
                  {Math.abs(userRank.rank - userRank.previousRank)}
                </Text>
              </HStack>
            </HStack>
          </VStack>
          
          <VStack alignItems="flex-end" space={1}>
            <Text color={theme.colors.text} fontWeight="bold">
              ${userRank.portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </Text>
            <Text 
              color={getChangeColor(
                timeFrame === 'weekly' ? userRank.weeklyChange : userRank.dailyChange
              )} 
              fontSize="sm"
            >
              {(timeFrame === 'weekly' ? userRank.weeklyChange : userRank.dailyChange) > 0 ? '+' : ''}
              {timeFrame === 'weekly' ? userRank.weeklyChange : userRank.dailyChange}%
            </Text>
          </VStack>
        </HStack>
      </Box>
    );
  };

  return (
    <Box flex={1} bg={theme.colors.background} safeArea>
      <VStack space={4} flex={1}>
        <VStack px={4} pt={4} space={4}>
          <HStack justifyContent="space-between" alignItems="center">
            <Heading color={theme.colors.text} size="lg">Rankings</Heading>
            <Button 
              variant="ghost" 
              rightIcon={<Icon as={Ionicons} name="chevron-forward" size="sm" />}
              onPress={() => {}}
              _text={{ color: theme.colors.primary }}
            >
              Filter
            </Button>
          </HStack>
          
          <HStack space={2} mb={2}>
            {TIME_PERIODS.map(period => (
              <Button
                key={period.value}
                size="sm"
                variant={timeFrame === period.value ? "solid" : "outline"}
                colorScheme="primary"
                onPress={() => setTimeFrame(period.value)}
                flex={1}
              >
                {period.label}
              </Button>
            ))}
          </HStack>
        </VStack>
        
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
            ListHeaderComponent={renderUserRank}
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
                  No rankings available
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
    paddingBottom: 100, // Add extra padding at the bottom for the tab bar
  },
});

export default RankingsScreen; 