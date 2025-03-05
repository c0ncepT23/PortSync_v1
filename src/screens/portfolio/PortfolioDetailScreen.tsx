import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  Pressable,
  Divider,
  Spinner,
  useTheme,
  IconButton,
  Heading,
  FlatList,
  Progress,
  Badge,
  ScrollView,
  Button
} from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width - 40; // Account for padding

// Mock data for portfolio holdings
const mockHoldings = [
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    shares: 10,
    price: 175.25,
    value: 1752.50,
    change: 2.3,
    allocation: 25
  },
  {
    id: '2',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    shares: 5,
    price: 340.15,
    value: 1700.75,
    change: 1.1,
    allocation: 24
  },
  {
    id: '3',
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    shares: 2,
    price: 3250.00,
    value: 6500.00,
    change: -0.8,
    allocation: 20
  },
  {
    id: '4',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    shares: 4,
    price: 800.50,
    value: 3202.00,
    change: 3.5,
    allocation: 15
  },
  {
    id: '5',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    shares: 1,
    price: 2800.75,
    value: 2800.75,
    change: 0.5,
    allocation: 10
  },
  {
    id: '6',
    symbol: 'NFLX',
    name: 'Netflix Inc.',
    shares: 3,
    price: 550.25,
    value: 1650.75,
    change: -1.2,
    allocation: 6
  }
];

// Mock data for portfolio performance
const mockPerformanceData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [20000, 22500, 21800, 24000, 23500, 25000],
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2
    }
  ]
};

const PortfolioDetailScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [holdings, setHoldings] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [timeRange, setTimeRange] = useState('1M'); // 1D, 1W, 1M, 3M, 1Y, ALL
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setHoldings(mockHoldings);
      
      // Calculate total portfolio value
      const total = mockHoldings.reduce((sum, holding) => sum + holding.value, 0);
      setPortfolioValue(total);
      
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleBack = () => {
    navigation.goBack();
  };
  
  const handleRefresh = () => {
    setRefreshing(true);
    
    // Simulate refreshing data
    setTimeout(() => {
      // Update with slightly different values
      const updatedHoldings = mockHoldings.map(holding => ({
        ...holding,
        price: holding.price * (1 + (Math.random() * 0.04 - 0.02)),
        change: holding.change + (Math.random() * 1 - 0.5)
      }));
      
      setHoldings(updatedHoldings);
      
      // Recalculate total portfolio value
      const total = updatedHoldings.reduce((sum, holding) => {
        const updatedValue = holding.shares * holding.price;
        return sum + updatedValue;
      }, 0);
      
      setPortfolioValue(total);
      setRefreshing(false);
    }, 1500);
  };
  
  const renderHolding = ({ item }) => {
    return (
      <Pressable onPress={() => navigation.navigate('AssetDetail', { asset: item })}>
        <HStack justifyContent="space-between" alignItems="center" py={3}>
          <HStack space={3} alignItems="center" flex={1}>
            <Box 
              bg="primary.500" 
              p={2} 
              rounded="md"
              alignItems="center"
              justifyContent="center"
              width={10}
              height={10}
            >
              <Text color="white" fontWeight="bold">{item.symbol.charAt(0)}</Text>
            </Box>
            <VStack>
              <Text color="light.100" fontWeight="bold">{item.symbol}</Text>
              <Text color="light.400" fontSize="xs">{item.name}</Text>
            </VStack>
          </HStack>
          
          <VStack alignItems="flex-end" flex={1}>
            <Text color="light.100" fontWeight="bold">
              ${item.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Text>
            <HStack alignItems="center" space={1}>
              <Icon 
                as={Feather} 
                name={item.change > 0 ? "arrow-up" : "arrow-down"} 
                size="xs" 
                color={item.change > 0 ? "success.500" : "error.500"} 
              />
              <Text 
                color={item.change > 0 ? "success.500" : "error.500"}
                fontSize="xs"
              >
                {Math.abs(item.change)}%
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </Pressable>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.dark[900] }}>
        <Box flex={1} justifyContent="center" alignItems="center">
          <Spinner size="lg" color="primary.500" />
          <Text color="light.100" mt={4}>Loading portfolio...</Text>
        </Box>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.dark[900] }}>
      <Box flex={1} px={4}>
        {/* Header with back button */}
        <HStack alignItems="center" justifyContent="space-between" py={4}>
          <HStack alignItems="center">
            <IconButton
              icon={<Icon as={Feather} name="arrow-left" size="md" color="light.100" />}
              onPress={handleBack}
              variant="ghost"
              _pressed={{
                bg: "dark.700"
              }}
            />
            <Text color="light.100" fontSize="lg" fontWeight="bold" ml={2}>Portfolio</Text>
          </HStack>
          
          <IconButton
            icon={<Icon as={Feather} name="refresh-cw" size="sm" color="light.100" />}
            isLoading={refreshing}
            onPress={handleRefresh}
            variant="ghost"
            _pressed={{
              bg: "dark.700"
            }}
          />
        </HStack>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={6}>
            {/* Portfolio Value */}
            <Box bg="dark.700" p={4} rounded="xl">
              <Text color="light.400">Total Portfolio Value</Text>
              <Text color="light.100" fontSize="3xl" fontWeight="bold">
                ${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Text>
              <HStack alignItems="center" space={1}>
                <Icon as={Feather} name="arrow-up" size="xs" color="success.500" />
                <Text color="success.500">+$345.25 (1.4%) today</Text>
              </HStack>
            </Box>
            
            {/* Performance Chart */}
            <Box>
              <HStack justifyContent="space-between" alignItems="center" mb={2}>
                <Heading color="light.100" size="md">Performance</Heading>
                <HStack space={2}>
                  {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((range) => (
                    <Pressable 
                      key={range}
                      onPress={() => setTimeRange(range)}
                      bg={timeRange === range ? "primary.500" : "dark.700"}
                      px={2}
                      py={1}
                      rounded="md"
                    >
                      <Text 
                        color={timeRange === range ? "white" : "light.400"}
                        fontSize="xs"
                        fontWeight={timeRange === range ? "bold" : "normal"}
                      >
                        {range}
                      </Text>
                    </Pressable>
                  ))}
                </HStack>
              </HStack>
              
              <Box bg="dark.700" p={4} rounded="xl" alignItems="center">
                <LineChart
                  data={mockPerformanceData}
                  width={screenWidth - 40}
                  height={220}
                  chartConfig={{
                    backgroundColor: colors.dark[700],
                    backgroundGradientFrom: colors.dark[700],
                    backgroundGradientTo: colors.dark[700],
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16
                    },
                    propsForDots: {
                      r: "4",
                      strokeWidth: "2",
                      stroke: "#1affe0"
                    }
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16
                  }}
                />
              </Box>
            </Box>
            
            {/* Asset Allocation */}
            <Box>
              <Heading color="light.100" size="md" mb={4}>Asset Allocation</Heading>
              <Box bg="dark.700" p={4} rounded="xl">
                {holdings.map((holding) => (
                  <VStack key={holding.id} space={1} mb={3}>
                    <HStack justifyContent="space-between">
                      <Text color="light.100">{holding.symbol}</Text>
                      <Text color="light.100">{holding.allocation}%</Text>
                    </HStack>
                    <Progress 
                      value={holding.allocation} 
                      max={100}
                      colorScheme={
                        holding.id === '1' ? "primary" :
                        holding.id === '2' ? "info" :
                        holding.id === '3' ? "warning" :
                        holding.id === '4' ? "success" :
                        holding.id === '5' ? "error" : "secondary"
                      }
                      size="xs"
                    />
                  </VStack>
                ))}
              </Box>
            </Box>
            
            {/* Holdings */}
            <Box>
              <Heading color="light.100" size="md" mb={4}>Holdings</Heading>
              <Box bg="dark.700" p={4} rounded="xl">
                <FlatList
                  data={holdings}
                  keyExtractor={(item) => item.id}
                  renderItem={renderHolding}
                  ItemSeparatorComponent={() => <Divider bg="dark.600" />}
                  scrollEnabled={false}
                />
              </Box>
            </Box>
          </VStack>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};

export default PortfolioDetailScreen; 