import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { Box, Text, VStack, HStack, Icon, Pressable, Spinner, Heading, Button, Divider } from 'native-base';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LineChart } from 'react-native-chart-kit';

// Mock data for portfolio
const MOCK_PORTFOLIO = {
  totalValue: 45678.90,
  dailyChange: 2.5,
  weeklyChange: 5.8,
  monthlyChange: -1.2,
  yearlyChange: 12.4,
  assets: [
    {
      id: '1',
      name: 'Bitcoin',
      symbol: 'BTC',
      amount: 0.75,
      value: 22500.00,
      price: 30000.00,
      change: 3.2,
      color: '#F7931A',
    },
    {
      id: '2',
      name: 'Ethereum',
      symbol: 'ETH',
      amount: 5.5,
      value: 11000.00,
      price: 2000.00,
      change: 1.8,
      color: '#627EEA',
    },
    {
      id: '3',
      name: 'Apple Inc.',
      symbol: 'AAPL',
      amount: 15,
      value: 2625.00,
      price: 175.00,
      change: -0.5,
      color: '#A2AAAD',
    },
    {
      id: '4',
      name: 'Tesla Inc.',
      symbol: 'TSLA',
      amount: 8,
      value: 2400.00,
      price: 300.00,
      change: 4.2,
      color: '#CC0000',
    },
    {
      id: '5',
      name: 'Amazon.com Inc.',
      symbol: 'AMZN',
      amount: 5,
      value: 1750.00,
      price: 350.00,
      change: -1.3,
      color: '#FF9900',
    },
  ],
  chartData: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [30000, 32000, 28000, 35000, 40000, 45678.90],
        color: (opacity = 1) => `rgba(0, 229, 204, ${opacity})`,
        strokeWidth: 2
      }
    ]
  }
};

const PortfolioOverviewScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [timeFrame, setTimeFrame] = useState('1D'); // 1D, 1W, 1M, 3M, 1Y, ALL
  
  useEffect(() => {
    fetchPortfolio();
  }, []);
  
  const fetchPortfolio = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPortfolio(MOCK_PORTFOLIO);
      setLoading(false);
    }, 1000);
  };
  
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPortfolio();
    setRefreshing(false);
  };
  
  const navigateToConnectPortfolio = () => {
    navigation.navigate('ConnectPortfolio');
  };
  
  const navigateToAssetDetail = (asset) => {
    navigation.navigate('AssetDetail', { asset });
  };
  
  const renderAssetItem = (asset, index) => {
    return (
      <Pressable key={asset.id} onPress={() => navigateToAssetDetail(asset)}>
        <HStack 
          space={3} 
          alignItems="center" 
          py={3}
          borderBottomWidth={index < portfolio.assets.length - 1 ? 1 : 0}
          borderBottomColor={theme.colors.border}
        >
          <Box 
            width={10} 
            height={10} 
            borderRadius="full" 
            bg={asset.color}
            justifyContent="center"
            alignItems="center"
          >
            <Text color="white" fontWeight="bold">
              {asset.symbol.charAt(0)}
            </Text>
          </Box>
          
          <VStack flex={1}>
            <Text color={theme.colors.text} fontWeight="bold">
              {asset.name}
            </Text>
            <Text color={theme.colors.textSecondary} fontSize="xs">
              {asset.amount} {asset.symbol}
            </Text>
          </VStack>
          
          <VStack alignItems="flex-end">
            <Text color={theme.colors.text} fontWeight="bold">
              ${asset.value.toLocaleString()}
            </Text>
            <Text 
              color={asset.change >= 0 ? "green.500" : "red.500"} 
              fontSize="xs"
            >
              {asset.change >= 0 ? "+" : ""}{asset.change}%
            </Text>
          </VStack>
          
          <Icon as={Ionicons} name="chevron-forward" size="sm" color={theme.colors.textSecondary} />
        </HStack>
      </Pressable>
    );
  };
  
  const chartConfig = {
    backgroundGradientFrom: theme.colors.card,
    backgroundGradientTo: theme.colors.card,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 229, 204, ${opacity})`,
    labelColor: (opacity = 1) => theme.colors.text,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: theme.colors.primary
    }
  };
  
  if (loading && !refreshing) {
    return (
      <Box flex={1} bg={theme.colors.background} justifyContent="center" alignItems="center" safeArea>
        <Spinner size="lg" color="primary.500" />
      </Box>
    );
  }
  
  if (!portfolio) {
    return (
      <Box flex={1} bg={theme.colors.background} p={4} justifyContent="center" alignItems="center" safeArea>
        <VStack space={4} alignItems="center">
          <Icon as={Ionicons} name="wallet-outline" size="6xl" color={theme.colors.primary} />
          <Heading color={theme.colors.text} textAlign="center">
            Connect Your Portfolio
          </Heading>
          <Text color={theme.colors.textSecondary} textAlign="center">
            Connect your exchange accounts or wallets to track your portfolio performance
          </Text>
          <Button 
            colorScheme="primary" 
            onPress={navigateToConnectPortfolio}
            leftIcon={<Icon as={Ionicons} name="link-outline" size="sm" />}
          >
            Connect Portfolio
          </Button>
        </VStack>
      </Box>
    );
  }
  
  return (
    <Box flex={1} bg={theme.colors.background} safeArea>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <VStack space={6}>
          {/* Portfolio Header */}
          <VStack space={1} px={4}>
            <Text color={theme.colors.textSecondary}>Total Portfolio Value</Text>
            <HStack alignItems="baseline" space={2}>
              <Heading size="xl" color={theme.colors.text}>
                ${portfolio.totalValue.toLocaleString()}
              </Heading>
              <HStack space={1} alignItems="center">
                <Icon 
                  as={Ionicons} 
                  name={portfolio.dailyChange >= 0 ? "arrow-up" : "arrow-down"} 
                  size="sm" 
                  color={portfolio.dailyChange >= 0 ? "green.500" : "red.500"} 
                />
                <Text 
                  color={portfolio.dailyChange >= 0 ? "green.500" : "red.500"} 
                  fontWeight="bold"
                >
                  {portfolio.dailyChange >= 0 ? "+" : ""}{portfolio.dailyChange}%
                </Text>
              </HStack>
            </HStack>
          </VStack>
          
          {/* Chart */}
          <VStack>
            <LineChart
              data={portfolio.chartData}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              withDots={false}
              withShadow={false}
              withInnerLines={false}
              withOuterLines={false}
              withVerticalLines={false}
              withHorizontalLines={false}
            />
            
            <HStack justifyContent="space-between" px={4}>
              {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((frame) => (
                <Button 
                  key={frame}
                  size="sm" 
                  variant={timeFrame === frame ? "solid" : "outline"}
                  colorScheme="primary"
                  onPress={() => setTimeFrame(frame)}
                >
                  {frame}
                </Button>
              ))}
            </HStack>
          </VStack>
          
          {/* Performance Stats */}
          <HStack px={4} justifyContent="space-between">
            <VStack alignItems="center" space={1}>
              <Text color={theme.colors.textSecondary} fontSize="xs">Daily</Text>
              <Text 
                color={portfolio.dailyChange >= 0 ? "green.500" : "red.500"} 
                fontWeight="bold"
              >
                {portfolio.dailyChange >= 0 ? "+" : ""}{portfolio.dailyChange}%
              </Text>
            </VStack>
            
            <VStack alignItems="center" space={1}>
              <Text color={theme.colors.textSecondary} fontSize="xs">Weekly</Text>
              <Text 
                color={portfolio.weeklyChange >= 0 ? "green.500" : "red.500"} 
                fontWeight="bold"
              >
                {portfolio.weeklyChange >= 0 ? "+" : ""}{portfolio.weeklyChange}%
              </Text>
            </VStack>
            
            <VStack alignItems="center" space={1}>
              <Text color={theme.colors.textSecondary} fontSize="xs">Monthly</Text>
              <Text 
                color={portfolio.monthlyChange >= 0 ? "green.500" : "red.500"} 
                fontWeight="bold"
              >
                {portfolio.monthlyChange >= 0 ? "+" : ""}{portfolio.monthlyChange}%
              </Text>
            </VStack>
            
            <VStack alignItems="center" space={1}>
              <Text color={theme.colors.textSecondary} fontSize="xs">Yearly</Text>
              <Text 
                color={portfolio.yearlyChange >= 0 ? "green.500" : "red.500"} 
                fontWeight="bold"
              >
                {portfolio.yearlyChange >= 0 ? "+" : ""}{portfolio.yearlyChange}%
              </Text>
            </VStack>
          </HStack>
          
          <Divider bg={theme.colors.border} />
          
          {/* Assets List */}
          <VStack px={4} space={3}>
            <HStack justifyContent="space-between" alignItems="center">
              <Heading size="md" color={theme.colors.text}>Assets</Heading>
              <Button 
                variant="ghost" 
                size="sm" 
                leftIcon={<Icon as={Ionicons} name="add-circle-outline" size="sm" />}
                onPress={navigateToConnectPortfolio}
              >
                Add
              </Button>
            </HStack>
            
            {portfolio.assets.map((asset, index) => renderAssetItem(asset, index))}
          </VStack>
        </VStack>
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});

export default PortfolioOverviewScreen; 