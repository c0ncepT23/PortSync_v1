import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Box, Text, VStack, Button, HStack, Icon, Heading, Pressable, useToast } from 'native-base';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Mock portfolio providers
const PORTFOLIO_PROVIDERS = [
  {
    id: 'robinhood',
    name: 'Robinhood',
    icon: 'trending-up',
    color: '#00C805',
    description: 'Connect your Robinhood account to track your stocks and crypto.'
  },
  {
    id: 'coinbase',
    name: 'Coinbase',
    icon: 'logo-bitcoin',
    color: '#0052FF',
    description: 'Connect your Coinbase account to track your cryptocurrency investments.'
  },
  {
    id: 'etrade',
    name: 'E*TRADE',
    icon: 'bar-chart',
    color: '#6600CC',
    description: 'Connect your E*TRADE account to track your investment portfolio.'
  },
  {
    id: 'fidelity',
    name: 'Fidelity',
    icon: 'analytics',
    color: '#549F93',
    description: 'Connect your Fidelity account to track your investments and retirement accounts.'
  },
  {
    id: 'vanguard',
    name: 'Vanguard',
    icon: 'shield',
    color: '#C41230',
    description: 'Connect your Vanguard account to track your investments and retirement accounts.'
  },
  {
    id: 'manual',
    name: 'Manual Entry',
    icon: 'create',
    color: '#FF9500',
    description: 'Manually enter your portfolio holdings and track your investments.'
  }
];

const ConnectPortfolioScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const toast = useToast();
  const [connecting, setConnecting] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const handleConnect = (provider) => {
    setSelectedProvider(provider);
    setConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setConnecting(false);
      
      // Success message
      toast.show({
        title: `Connected to ${provider.name}`,
        status: "success",
        placement: "top"
      });
      
      // Navigate to portfolio overview
      navigation.navigate('PortfolioOverview');
    }, 2000);
  };

  const handleSkip = () => {
    Alert.alert(
      "Skip Portfolio Connection",
      "You can connect your portfolio later from your profile. Some features will be limited without a connected portfolio.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Skip",
          onPress: () => navigation.navigate('PortfolioOverview')
        }
      ]
    );
  };

  return (
    <Box flex={1} bg={theme.colors.background} safeArea>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <VStack space={6} width="90%" alignSelf="center" mt={6}>
          <Heading color={theme.colors.text} size="xl">Connect Your Portfolio</Heading>
          
          <Text color={theme.colors.textSecondary} fontSize="md">
            Connect your investment accounts to track performance and compare with others anonymously.
          </Text>
          
          <VStack space={4} mt={4}>
            {PORTFOLIO_PROVIDERS.map(provider => (
              <Pressable 
                key={provider.id}
                onPress={() => handleConnect(provider)}
                disabled={connecting}
              >
                <Box 
                  bg={theme.colors.card} 
                  borderRadius="lg" 
                  p={4}
                  borderWidth={1}
                  borderColor={selectedProvider?.id === provider.id ? provider.color : theme.colors.border}
                >
                  <HStack space={4} alignItems="center">
                    <Box 
                      bg={`${provider.color}20`} 
                      p={3} 
                      borderRadius="full"
                    >
                      <Icon 
                        as={Ionicons} 
                        name={provider.icon} 
                        size="md" 
                        color={provider.color} 
                      />
                    </Box>
                    <VStack flex={1}>
                      <Text color={theme.colors.text} fontWeight="bold" fontSize="md">
                        {provider.name}
                      </Text>
                      <Text color={theme.colors.textSecondary} fontSize="sm">
                        {provider.description}
                      </Text>
                    </VStack>
                    <Icon 
                      as={Ionicons} 
                      name="chevron-forward" 
                      size="sm" 
                      color={theme.colors.textSecondary} 
                    />
                  </HStack>
                </Box>
              </Pressable>
            ))}
          </VStack>
          
          <Button 
            variant="ghost" 
            onPress={handleSkip}
            mt={4}
          >
            Skip for now
          </Button>
        </VStack>
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20
  }
});

export default ConnectPortfolioScreen; 