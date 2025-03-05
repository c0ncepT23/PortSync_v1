// Update src/screens/PortfolioScreen.tsx

import React from 'react';
import { Box, Button, Center, Heading, Text, VStack, HStack, Divider, Icon, Progress } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

// Mock data for portfolio holdings
const mockHoldings = [
  {
    id: '1',
    name: 'Apple Inc.',
    symbol: 'AAPL',
    shares: 10,
    purchasePrice: 150.00,
    currentPrice: 175.50,
    changePercent: 17.0
  },
  {
    id: '2',
    name: 'Microsoft Corp.',
    symbol: 'MSFT',
    shares: 5,
    purchasePrice: 280.00,
    currentPrice: 310.25,
    changePercent: 10.8
  },
  {
    id: '3',
    name: 'Amazon.com Inc.',
    symbol: 'AMZN',
    shares: 2,
    purchasePrice: 3200.00,
    currentPrice: 3050.50,
    changePercent: -4.7
  },
  {
    id: '4',
    name: 'Tesla Inc.',
    symbol: 'TSLA',
    shares: 4,
    purchasePrice: 800.00,
    currentPrice: 950.25,
    changePercent: 18.8
  }
];

const PortfolioScreen = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const portfolioConnected = user?.portfolioConnected || false;

  const renderHolding = (holding) => {
    const totalValue = holding.currentPrice * holding.shares;
    const purchaseValue = holding.purchasePrice * holding.shares;
    const profitLoss = totalValue - purchaseValue;
    const isPositive = holding.changePercent > 0;

    return (
      <Box key={holding.id} bg="dark.500" p={4} rounded="xl" mb={4}>
        <HStack justifyContent="space-between" alignItems="center" mb={2}>
          <VStack>
            <Text color="light.100" bold>{holding.name}</Text>
            <Text color="light.300">{holding.symbol} • {holding.shares} shares</Text>
          </VStack>
          <VStack alignItems="flex-end">
            <Text color="light.100" bold>${totalValue.toFixed(2)}</Text>
            <Text color={isPositive ? "success.500" : "error.500"}>
              {isPositive ? "+" : ""}{holding.changePercent}%
            </Text>
          </VStack>
        </HStack>
        <Progress 
          value={holding.changePercent + 10} 
          max={20} 
          colorScheme={isPositive ? "success" : "error"}
          size="xs"
        />
      </Box>
    );
  };

  if (!portfolioConnected) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
        <Box flex={1} p={4}>
          <Heading color="light.100" size="lg" mb={6}>Portfolio</Heading>
          
          <Center flex={1}>
            <Icon as={Feather} name="bar-chart-2" size="5xl" color="dark.500" mb={4} />
            <Heading color="light.100" size="md" mb={2}>Connect Your Portfolio</Heading>
            <Text color="light.300" textAlign="center" mb={6}>
              Link your investment portfolio to track your performance and see how you rank.
            </Text>
            <Button size="lg" colorScheme="primary">
              Connect Portfolio
            </Button>
          </Center>
        </Box>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
      <Box flex={1} p={4}>
        <Heading color="light.100" size="lg" mb={6}>Portfolio</Heading>
        
        <Box bg="dark.500" p={4} rounded="xl" mb={6}>
          <HStack justifyContent="space-between" alignItems="center" mb={4}>
            <VStack>
              <Text color="light.300">Total Value</Text>
              <Text color="light.100" fontSize="2xl" fontWeight="bold">$24,561.78</Text>
              <Text color="success.500">+$345.25 (1.4%)</Text>
            </VStack>
            <Button size="sm" colorScheme="primary" variant="outline" leftIcon={<Icon as={Feather} name="refresh-cw" size="xs" />}>
              Refresh
            </Button>
          </HStack>
          
          <Divider bg="dark.400" my={2} />
          
          <HStack justifyContent="space-between" mt={2}>
            <VStack>
              <Text color="light.300">Invested</Text>
              <Text color="light.100">$21,250.00</Text>
            </VStack>
            <VStack alignItems="flex-end">
              <Text color="light.300">Profit/Loss</Text>
              <Text color="success.500">+$3,311.78</Text>
            </VStack>
          </HStack>
        </Box>
        
        <Heading color="light.100" size="md" mb={4}>Holdings</Heading>
        
        {mockHoldings.map(renderHolding)}
      </Box>
    </SafeAreaView>
  );
};

export default PortfolioScreen;