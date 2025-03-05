import React from 'react';
import { Box, VStack, Heading, Text, Button, Image, Center, HStack, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WelcomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();

  const navigateToSignIn = () => {
    navigation.navigate('SignIn');
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <Center flex={1} bg="dark.900" px={4}>
      <Box w="100%" maxW="400px">
        <VStack space={10} alignItems="center">
          {/* Logo and App Name */}
          <VStack space={2} alignItems="center">
            <Box 
              width={100} 
              height={100} 
              borderRadius="full" 
              bg="primary.500" 
              justifyContent="center" 
              alignItems="center"
              mb={4}
            >
              <Icon 
                as={Ionicons} 
                name="bar-chart" 
                size="4xl" 
                color="white" 
              />
            </Box>
            <Heading size="2xl" color="primary.500" textAlign="center">
              PortSync
            </Heading>
            <Text color="light.100" fontSize="md" textAlign="center">
              Your anonymous social portfolio platform
            </Text>
          </VStack>

          {/* Features */}
          <VStack space={4} width="100%">
            <HStack space={3} alignItems="center">
              <Box 
                bg="primary.500:alpha.20" 
                borderRadius="full" 
                p={2}
              >
                <Text fontSize="lg" color="primary.500">🔒</Text>
              </Box>
              <VStack>
                <Text color="light.100" fontWeight="bold">Anonymous Interactions</Text>
                <Text color="light.300" fontSize="xs">
                  Connect with others without revealing your identity
                </Text>
              </VStack>
            </HStack>

            <HStack space={3} alignItems="center">
              <Box 
                bg="primary.500:alpha.20" 
                borderRadius="full" 
                p={2}
              >
                <Text fontSize="lg" color="primary.500">📊</Text>
              </Box>
              <VStack>
                <Text color="light.100" fontWeight="bold">Portfolio Rankings</Text>
                <Text color="light.300" fontSize="xs">
                  Compare your performance with peers and organizations
                </Text>
              </VStack>
            </HStack>

            <HStack space={3} alignItems="center">
              <Box 
                bg="primary.500:alpha.20" 
                borderRadius="full" 
                p={2}
              >
                <Text fontSize="lg" color="primary.500">🏢</Text>
              </Box>
              <VStack>
                <Text color="light.100" fontWeight="bold">Organization Insights</Text>
                <Text color="light.300" fontSize="xs">
                  See how your organization performs collectively
                </Text>
              </VStack>
            </HStack>
          </VStack>

          {/* Action Buttons */}
          <VStack space={4} width="100%">
            <Button 
              size="lg" 
              colorScheme="primary" 
              onPress={navigateToSignUp}
            >
              Create Account
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              colorScheme="primary"
              onPress={navigateToSignIn}
            >
              Sign In
            </Button>
          </VStack>

          {/* Terms and Privacy */}
          <Text color="light.400" fontSize="xs" textAlign="center">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </VStack>
      </Box>
    </Center>
  );
};

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
});

export default WelcomeScreen; 