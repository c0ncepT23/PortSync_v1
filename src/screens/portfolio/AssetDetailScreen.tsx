import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

// Mock price history data
const MOCK_PRICE_HISTORY = {
  '1d': [42000, 41800, 42200, 42500, 42300, 42800, 43000],
  '1w': [40000, 41000, 42000, 41500, 42500, 43000, 42800],
  '1m': [38000, 39500, 41000, 40000, 42000, 41500, 43000],
  '3m': [35000, 38000, 40000, 39000, 41000, 42000, 43000],
  '1y': [20000, 25000, 30000, 35000, 40000, 38000, 43000],
  'All': [5000, 10000, 15000, 20000, 30000, 35000, 43000],
};

const AssetDetailScreen = ({ route, navigation }) => {
  const { asset } = route.params;
  const { theme } = useTheme();
  const [timeframe, setTimeframe] = useState('1d');
  const [loading, setLoading] = useState(true);
  const [priceData, setPriceData] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPriceData(MOCK_PRICE_HISTORY);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.loadingText, { color: theme.colors.text }]}>Loading asset data...</Text>
      </View>
    );
  }

  const chartData = {
    labels: ['', '', '', '', '', ''],
    datasets: [
      {
        data: priceData[timeframe],
        color: (opacity = 1) => asset.color,
        strokeWidth: 2
      }
    ],
    legend: [`${asset.name} Price`]
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>{asset.name}</Text>
        <TouchableOpacity>
          <Icon name="star-outline" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
      
      <View style={[styles.assetInfoCard, { backgroundColor: theme.colors.card }]}>
        <View style={styles.assetInfoHeader}>
          <View style={[styles.assetIconPlaceholder, { backgroundColor: asset.color }]}>
            <Text style={styles.assetIconText}>{asset.symbol.charAt(0)}</Text>
          </View>
          <View style={styles.assetInfoHeaderText}>
            <Text style={[styles.assetSymbol, { color: theme.colors.text }]}>{asset.symbol}</Text>
            <Text style={[styles.assetName, { color: theme.colors.textSecondary }]}>{asset.name}</Text>
          </View>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={[styles.currentPrice, { color: theme.colors.text }]}>
            ${(priceData[timeframe][priceData[timeframe].length - 1]).toLocaleString()}
          </Text>
          <View style={styles.changeContainer}>
            <Icon 
              name={asset.change24h >= 0 ? "trending-up-outline" : "trending-down-outline"} 
              size={16} 
              color={asset.change24h >= 0 ? '#4CAF50' : '#F44336'} 
            />
            <Text 
              style={[
                styles.changeText, 
                { color: asset.change24h >= 0 ? '#4CAF50' : '#F44336' }
              ]}
            >
              {asset.change24h >= 0 ? '+' : ''}{asset.change24h}% (24h)
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.timeframeContainer}>
        {['1d', '1w', '1m', '3m', '1y', 'All'].map(tf => (
          <TouchableOpacity
            key={tf}
            style={[
              styles.timeframeButton,
              timeframe === tf && { backgroundColor: theme.colors.primary }
            ]}
            onPress={() => setTimeframe(tf)}
          >
            <Text 
              style={[
                styles.timeframeText,
                { color: timeframe === tf ? 'white' : theme.colors.text }
              ]}
            >
              {tf}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            backgroundColor: theme.colors.card,
            backgroundGradientFrom: theme.colors.card,
            backgroundGradientTo: theme.colors.card,
            decimalPlaces: 0,
            color: (opacity = 1) => asset.color,
            labelColor: (opacity = 1) => theme.colors.text,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: asset.color
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
      
      <View style={[styles.holdingsCard, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.holdingsTitle, { color: theme.colors.text }]}>Your Holdings</Text>
        
        <View style={styles.holdingsRow}>
          <Text style={[styles.holdingsLabel, { color: theme.colors.textSecondary }]}>Amount</Text>
          <Text style={[styles.holdingsValue, { color: theme.colors.text }]}>
            {asset.amount} {asset.symbol}
          </Text>
        </View>
        
        <View style={styles.holdingsRow}>
          <Text style={[styles.holdingsLabel, { color: theme.colors.textSecondary }]}>Value</Text>
          <Text style={[styles.holdingsValue, { color: theme.colors.text }]}>
            ${asset.value.toLocaleString()}
          </Text>
        </View>
        
        <View style={styles.holdingsRow}>
          <Text style={[styles.holdingsLabel, { color: theme.colors.textSecondary }]}>Profit/Loss</Text>
          <Text 
            style={[
              styles.holdingsValue, 
              { color: asset.change24h >= 0 ? '#4CAF50' : '#F44336' }
            ]}
          >
            {asset.change24h >= 0 ? '+' : '-'}${(asset.value * Math.abs(asset.change24h) / 100).toFixed(2)}
          </Text>
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}>
          <Icon name="arrow-up" size={20} color="white" />
          <Text style={styles.actionButtonText}>Buy</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#F44336' }]}>
          <Icon name="arrow-down" size={20} color="white" />
          <Text style={styles.actionButtonText}>Sell</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}>
          <Icon name="swap-horizontal" size={20} color="white" />
          <Text style={styles.actionButtonText}>Swap</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  assetInfoCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  assetInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  assetIconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assetIconText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  assetInfoHeaderText: {
    marginLeft: 12,
  },
  assetSymbol: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  assetName: {
    fontSize: 14,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  currentPrice: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    marginLeft: 4,
    fontWeight: '500',
  },
  timeframeContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  timeframeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  timeframeText: {
    fontWeight: '500',
  },
  chartContainer: {
    marginBottom: 24,
  },
  holdingsCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  holdingsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  holdingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  holdingsLabel: {
    fontSize: 16,
  },
  holdingsValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default AssetDetailScreen; 