// Update src/screens/RankingsScreen.tsx

import React, { useState } from 'react';
import { Box, Heading, Text, VStack, HStack, Avatar, FlatList, Pressable, Icon, Button } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

// Mock data for rankings
const mockGlobalRankings = [
  {
    id: '1',
    rank: 1,
    username: 'investPro',
    designation: 'Portfolio Manager',
    organization: 'InvestCorp',
    performance: 34.2
  },
  {
    id: '2',
    rank: 2,
    username: 'trader42',
    designation: 'Day Trader',
    organization: 'TradeCo',
    performance: 26.8
  },
  {
    id: '3',
    rank: 3,
    username: 'finWiz',
    designation: 'Financial Analyst',
    organization: 'FinTech Inc',
    performance: 22.4
  },
  {
    id: '4',
    rank: 4,
    username: 'marketMover',
    designation: 'Investment Banker',
    organization: 'Goldman Sachs',
    performance: 19.7
  },
  {
    id: '5',
    rank: 5,
    username: 'stockHunter',
    designation: 'Wealth Advisor',
    organization: 'WealthFirm',
    performance: 18.3
  },
  {
    id: '6',
    rank: 6,
    username: 'cryptoKing',
    designation: 'Crypto Analyst',
    organization: 'BlockChain Co',
    performance: 17.5
  },
  {
    id: '7',
    rank: 7,
    isCurrentUser: true,
    username: 'you',
    designation: 'Product Manager',
    organization: 'TechCorp',
    performance: 16.4
  }
];

const mockOrganizationRankings = [
  {
    id: '1',
    rank: 1,
    username: 'cfoExpert',
    designation: 'CFO',
    organization: 'TechCorp',
    performance: 22.1
  },
  {
    id: '2',
    rank: 2,
    username: 'techInvestor',
    designation: 'CTO',
    organization: 'TechCorp',
    performance: 19.8
  },
  {
    id: '3',
    rank: 3,
    isCurrentUser: true,
    username: 'you',
    designation: 'Product Manager',
    organization: 'TechCorp',
    performance: 16.4
  },
  {
    id: '4',
    rank: 4,
    username: 'devTrader',
    designation: 'Senior Developer',
    organization: 'TechCorp',
    performance: 12.7
  },
  {
    id: '5',
    rank: 5,
    username: 'marketingGuru',
    designation: 'Marketing Director',
    organization: 'TechCorp',
    performance: 10.5
  }
];

const RankingsScreen = () => {
  const [activeTab, setActiveTab] = useState('global');
  
  const renderRankingItem = ({ item }) => {
    const isTopThree = item.rank <= 3;
    const isHighlighted = item.isCurrentUser;
    
    // Determine medal color for top 3
    let medalColor = '';
    if (item.rank === 1) medalColor = '#FFD700'; // Gold
    else if (item.rank === 2) medalColor = '#2D9CDB'; // Silver (using our secondary blue)
    else if (item.rank === 3) medalColor = '#00E5CC'; // Bronze (using our primary teal)
    
    return (
      <Pressable>
        <Box 
          bg={isHighlighted ? 'primary.500' : 'dark.500'} 
          opacity={isHighlighted ? 0.15 : 1}
          p={4} 
          rounded="xl" 
          mb={3}
          borderWidth={isHighlighted ? 1 : 0}
          borderColor="primary.500"
        >
          <HStack space={3} alignItems="center">
            {/* Rank */}
            <Box 
              w={10} 
              h={10} 
              rounded="full" 
              bg={isTopThree ? 'transparent' : 'dark.900'} 
              justifyContent="center" 
              alignItems="center"
            >
              {isTopThree ? (
                <Icon 
                  as={Feather} 
                  name="award" 
                  size="lg" 
                  color={medalColor} 
                />
              ) : (
                <Text fontWeight="bold" color="light.100">
                  {item.rank}
                </Text>
              )}
            </Box>
            
            {/* User info */}
            <HStack flex={1} space={3} alignItems="center">
              <Avatar 
                bg={isHighlighted ? 'primary.500' : 'secondary.500'} 
                size="md"
              >
                {item.username.substring(0, 2).toUpperCase()}
              </Avatar>
              
              <VStack>
                <HStack space={2} alignItems="center">
                  <Text fontWeight="bold" color="light.100">
                    @{item.username}
                  </Text>
                  {isHighlighted && (
                    <Box bg="primary.500" px={1} rounded="sm">
                      <Text fontSize="xs" color="dark.900">
                        You
                      </Text>
                    </Box>
                  )}
                </HStack>
                <Text fontSize="xs" color="light.300">
                  {item.designation} at {item.organization}
                </Text>
              </VStack>
            </HStack>
            
            {/* Performance */}
            <Text 
              fontWeight="bold" 
              fontSize="md"
              color="success.500"
            >
              +{item.performance.toFixed(1)}%
            </Text>
          </HStack>
        </Box>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
      <Box flex={1} p={4}>
        <Heading color="light.100" size="lg" mb={6}>Rankings</Heading>
        
        <HStack bg="dark.500" rounded="full" p={1} mb={6}>
          <Pressable 
            flex={1} 
            onPress={() => setActiveTab('global')}
            bg={activeTab === 'global' ? 'primary.500' : 'transparent'}
            rounded="full"
            py={2}
          >
            <Text 
              textAlign="center" 
              color={activeTab === 'global' ? 'dark.900' : 'light.100'}
              fontWeight="bold"
            >
              Global
            </Text>
          </Pressable>
          <Pressable 
            flex={1} 
            onPress={() => setActiveTab('organization')}
            bg={activeTab === 'organization' ? 'primary.500' : 'transparent'}
            rounded="full"
            py={2}
          >
            <Text 
              textAlign="center" 
              color={activeTab === 'organization' ? 'dark.900' : 'light.100'}
              fontWeight="bold"
            >
              Organization
            </Text>
          </Pressable>
        </HStack>
        
        <Text color="light.300" mb={4}>
          {activeTab === 'global' 
            ? 'Top performers across all users' 
            : 'Top performers in your organization'}
        </Text>
        
        <FlatList
          data={activeTab === 'global' ? mockGlobalRankings : mockOrganizationRankings}
          keyExtractor={(item) => item.id}
          renderItem={renderRankingItem}
          showsVerticalScrollIndicator={false}
        />
      </Box>
    </SafeAreaView>
  );
};

export default RankingsScreen;