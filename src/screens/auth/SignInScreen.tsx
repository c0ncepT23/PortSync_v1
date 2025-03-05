// src/screens/auth/SignInScreen.tsx

import React, { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  HStack,
  Pressable,
  useToast,
  Center,
} from 'native-base';
import { Alert, AppState } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import OtpInput from '../../components/auth/OtpInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SignInScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'SignIn'>;

enum SignInStep {
  PHONE_NUMBER,
  OTP_VERIFICATION,
}

const SignInScreen = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const toast = useToast();
  
  const [step, setStep] = useState<SignInStep>(SignInStep.PHONE_NUMBER);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [otpError, setOtpError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Validate phone number format
  const validatePhone = (phone: string) => {
    // Simple validation - can be enhanced based on requirements
    return phone.length >= 10;
  };

  // Handle request OTP button press
  const handleRequestOtp = () => {
    if (!validatePhone(phoneNumber)) {
      setIsPhoneValid(false);
      return;
    }
    
    // For testing without a backend, just show a mock OTP
    Alert.alert("OTP Sent", "For testing, your OTP is: 123456");
    
    // Skip the actual API call for now
    setStep(SignInStep.OTP_VERIFICATION);
  };

  // Handle OTP verification
  const handleOtpComplete = async (otp: string) => {
    // For testing, just sign in with any OTP
    handleSignIn();
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleSignIn = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store auth token
      await AsyncStorage.setItem('userToken', 'dummy-auth-token');
      
      // Call the global refresh function if available
      // @ts-ignore
      if (global.refreshAuthStatus) {
        // @ts-ignore
        global.refreshAuthStatus();
      }
      
      // Wait a moment to let the state update
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.log('Sign in error:', error);
      Alert.alert('Error', 'Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center flex={1} bg="dark.900" px={4}>
      <Box w="100%" maxW="400px">
        <VStack space={5} alignItems="center">
          {/* Logo placeholder */}
          <Heading size="xl" color="primary.500">
            PortSync
          </Heading>
          <Text color="light.100" textAlign="center" mb={8}>
            Your anonymous social portfolio platform
          </Text>

          {step === SignInStep.PHONE_NUMBER ? (
            <VStack space={4} w="100%">
              <FormControl isInvalid={!isPhoneValid}>
                <FormControl.Label _text={{ color: "light.100" }}>Phone Number</FormControl.Label>
                <Input
                  size="lg"
                  color="light.100"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={(value) => {
                    setPhoneNumber(value);
                    setIsPhoneValid(true);
                  }}
                  placeholder="Enter your phone number"
                />
                <FormControl.ErrorMessage>
                  Please enter a valid phone number
                </FormControl.ErrorMessage>
              </FormControl>

              <Button
                onPress={handleRequestOtp}
                size="lg"
                w="100%"
                colorScheme="primary"
                mt={2}
              >
                Send OTP
              </Button>
            </VStack>
          ) : (
            <VStack space={4} w="100%">
              <Heading size="md" color="light.100" textAlign="center">
                Enter Verification Code
              </Heading>
              <Text color="light.100" textAlign="center">
                We've sent a 6-digit code to {phoneNumber}
              </Text>

              <OtpInput
                length={6}
                onOtpComplete={handleOtpComplete}
                isError={otpError}
                errorMessage="Invalid OTP. Please try again."
              />

              <HStack justifyContent="center" space={2} mt={4}>
                <Text color="light.100">Didn't receive the code?</Text>
                <Pressable onPress={handleRequestOtp}>
                  <Text color="primary.500" fontWeight="bold">
                    Resend
                  </Text>
                </Pressable>
              </HStack>

              <Button
                onPress={() => setStep(SignInStep.PHONE_NUMBER)}
                variant="ghost"
                size="sm"
                mt={2}
                _text={{ color: "light.100" }}
              >
                Change Phone Number
              </Button>
            </VStack>
          )}

          {/* Sign up link */}
          <HStack mt={6} justifyContent="center">
            <Text color="light.100">Don't have an account?</Text>
            <Pressable onPress={navigateToSignUp}>
              <Text ml={1} color="primary.500" fontWeight="bold">
                Sign Up
              </Text>
            </Pressable>
          </HStack>

          <Button
            onPress={handleSignIn}
            size="lg"
            w="100%"
            colorScheme="secondary"
            mt={4}
            isLoading={loading}
          >
            Quick Login (Testing)
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default SignInScreen;