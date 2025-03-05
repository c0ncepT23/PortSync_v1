import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

// Mock data
const MOCK_MARKET_DATA = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', price: 43000, change24h: 2.1, volume: '24.5B', marketCap: '820.1B' },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', price: 2000, change24h: 5.3, volume: '12.3B', marketCap: '240.5B' },
  { id: 'sol', name: 'Solana', symbol: 'SOL', price: 71.2, change24h: -1.2, volume: '2.1B', marketCap: '28.4B' },
  { id: 'ada', name: 'Cardano', symbol: 'ADA', price: 0.7, change24h: 0.8, volume: '1.2B', marketCap: '24.6B' },
  { id: 'dot', name: 'Polkadot', symbol: 'DOT', price: 8.03, change24h: -2.5, volume: '0.8B', marketCap: '9.4B' },
  { id: 'doge', name: 'Dogecoin', symbol: 'DOGE', price: 0.12, change24h: 3.7, volume: '1.5B', marketCap: '16.2B' },
  { id: 'avax', name: 'Avalanche', symbol: 'AVAX', price: 35.6, change24h: 1.9, volume: '0.9B', marketCap: '12.1B' },
  { id: 'link', name: 'Chainlink', symbol: 'LINK', price: 14.2, change24h: -0.5, volume: '0.7B', marketCap: '7.3B' },
];

const MarketScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('marketCap');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMarketData(MOCK_MARKET_DATA);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSort = (criteria) => {
    if (sortBy === criteria) {
      // Toggle sort order if clicking the same criteria
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Default to descending for new criteria
      setSortBy(criteria);
      setSortOrder('desc');
    }
  };

  const sortedData = [...marketData].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'price') {
      comparison = a.price - b.price;
    } else if (sortBy === 'change24h') {
      comparison = a.change24h - b.change24h;
    } else if (sortBy === 'marketCap') {
      const aValue = parseFloat(a.marketCap.replace('B', ''));
      const bValue = parseFloat(b.marketCap.replace('B', ''));
      comparison = aValue - bValue;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const renderCoinItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.coinItem, { backgroundColor: theme.colors.card }]}
      onPress={() => navigation.navigate('CoinDetail', { coin: item })}
    >
      <View style={styles.coinInfo}>
        <Text style={[styles.coinSymbol, { color: theme.colors.text }]}>{item.symbol}</Text>
        <Text style={[styles.coinName, { color: theme.colors.textSecondary }]}>{item.name}</Text>
      </View>
      
      <View style={styles.priceContainer}>
        <Text style={[styles.coinPrice, { color: theme.colors.text }]}>${item.price.toLocaleString()}</Text>
        <Text 
          style={[
            styles.coinChange, 
            { color: item.change24h >= 0 ? '#4CAF50' : '#F44336' }
          ]}
        >
          {item.change24h >= 0 ? '+' : ''}{item.change24h}%
        </Text>
      </View>
      
      <View style={styles.marketInfo}>
        <Text style={[styles.marketInfoText, { color: theme.colors.textSecondary }]}>{item.marketCap}</Text>
        <Text style={[styles.marketInfoText, { color: theme.colors.textSecondary }]}>{item.volume}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Market</Text>
        <TouchableOpacity>
          <Icon name="search-outline" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.text }]}>Loading market data...</Text>
        </View>
      ) : (
        <>
          <View style={[styles.tableHeader, { borderBottomColor: theme.colors.border }]}>
            <TouchableOpacity style={styles.nameHeader} onPress={() => handleSort('name')}>
              <Text style={[styles.tableHeaderText, { color: theme.colors.text }]}>Name</Text>
              {sortBy === 'name' && (
                <Icon 
                  name={sortOrder === 'asc' ? 'chevron-up' : 'chevron-down'} 
                  size={16} 
                  color={theme.colors.text} 
                />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.priceHeader} onPress={() => handleSort('price')}>
              <Text style={[styles.tableHeaderText, { color: theme.colors.text }]}>Price</Text>
              {sortBy === 'price' && (
                <Icon 
                  name={sortOrder === 'asc' ? 'chevron-up' : 'chevron-down'} 
                  size={16} 
                  color={theme.colors.text} 
                />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.changeHeader} onPress={() => handleSort('change24h')}>
              <Text style={[styles.tableHeaderText, { color: theme.colors.text }]}>24h</Text>
              {sortBy === 'change24h' && (
                <Icon 
                  name={sortOrder === 'asc' ? 'chevron-up' : 'chevron-down'} 
                  size={16} 
                  color={theme.colors.text} 
                />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.marketCapHeader} onPress={() => handleSort('marketCap')}>
              <Text style={[styles.tableHeaderText, { color: theme.colors.text }]}>Market Cap</Text>
              {sortBy === 'marketCap' && (
                <Icon 
                  name={sortOrder === 'asc' ? 'chevron-up' : 'chevron-down'} 
                  size={16} 
                  color={theme.colors.text} 
                />
              )}
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={sortedData}
            renderItem={renderCoinItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        </>
      )}
    </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  tableHeaderText: {
    fontWeight: '600',
    marginRight: 4,
  },
  nameHeader: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  changeHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  marketCapHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  listContainer: {
    paddingBottom: 20,
  },
  coinItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  coinInfo: {
    flex: 2,
  },
  coinSymbol: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  coinName: {
    fontSize: 14,
  },
  priceContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  coinPrice: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  coinChange: {
    fontSize: 14,
    fontWeight: '500',
  },
  marketInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  marketInfoText: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default MarketScreen; 