// src/screens/auth/SignUpScreen.tsx

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
  Select,
  useToast,
  Center,
} from 'native-base';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import OtpInput from '../../components/auth/OtpInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

enum SignUpStep {
  PHONE_NUMBER,
  PHONE_OTP_VERIFICATION,
  WORK_EMAIL,
  EMAIL_OTP_VERIFICATION,
  USER_DETAILS,
}

// Mock organizations for demo
const ORGANIZATIONS = [
  { label: 'Acme Corp', value: 'acme' },
  { label: 'Globex Industries', value: 'globex' },
  { label: 'Initech', value: 'initech' },
  { label: 'Massive Dynamic', value: 'massive' },
  { label: 'Stark Industries', value: 'stark' },
];

const SignUpScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const toast = useToast();
  
  const [step, setStep] = useState<SignUpStep>(SignUpStep.PHONE_NUMBER);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [username, setUsername] = useState('');
  const [designation, setDesignation] = useState('');
  const [organization, setOrganization] = useState('');
  
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  
  const [loading, setLoading] = useState(false);

  // Validation functions
  const validatePhone = (phone: string) => phone.length >= 10;
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateUsername = (name: string) => name.length >= 3;

  // Handle request phone OTP
  const handleRequestPhoneOtp = () => {
    if (!validatePhone(phoneNumber)) {
      setIsPhoneValid(false);
      return;
    }
    
    // For testing without a backend, just show a mock OTP
    Alert.alert("OTP Sent", "For testing, your OTP is: 123456");
    setStep(SignUpStep.PHONE_OTP_VERIFICATION);
  };

  // Handle phone OTP verification
  const handlePhoneOtpComplete = (otp: string) => {
    // For testing, just proceed to next step
    setStep(SignUpStep.WORK_EMAIL);
  };

  // Handle request email OTP
  const handleRequestEmailOtp = () => {
    if (!validateEmail(workEmail)) {
      setIsEmailValid(false);
      return;
    }
    
    // For testing without a backend, just show a mock OTP
    Alert.alert("OTP Sent", "For testing, your email OTP is: 654321");
    setStep(SignUpStep.EMAIL_OTP_VERIFICATION);
  };

  // Handle email OTP verification
  const handleEmailOtpComplete = (otp: string) => {
    // For testing, just proceed to next step
    setStep(SignUpStep.USER_DETAILS);
  };

  // Handle final signup
  const handleSignUp = async () => {
    if (!validateUsername(username)) {
      setIsUsernameValid(false);
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store user data (in a real app, this would be done server-side)
      const userData = {
        phoneNumber,
        workEmail,
        username,
        designation,
        organization,
        profileCompleted: true,
        portfolioConnected: false,
      };
      
      // Store auth token
      await AsyncStorage.setItem('userToken', 'dummy-auth-token');
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      
      // Call the global refresh function if available
      // @ts-ignore
      if (global.refreshAuthStatus) {
        // @ts-ignore
        global.refreshAuthStatus();
      }
      
      toast.show({
        title: "Account created successfully!",
        placement: "top",
      });
      
    } catch (error) {
      console.log('Sign up error:', error);
      Alert.alert('Error', 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const navigateToSignIn = () => {
    navigation.navigate('SignIn');
  };

  // Render different steps based on current step
  const renderStep = () => {
    switch (step) {
      case SignUpStep.PHONE_NUMBER:
        return (
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
              onPress={handleRequestPhoneOtp}
              size="lg"
              w="100%"
              colorScheme="primary"
              mt={2}
            >
              Send OTP
            </Button>
          </VStack>
        );
        
      case SignUpStep.PHONE_OTP_VERIFICATION:
        return (
          <VStack space={4} w="100%">
            <Heading size="md" color="light.100" textAlign="center">
              Verify Your Phone
            </Heading>
            <Text color="light.100" textAlign="center">
              We've sent a 6-digit code to {phoneNumber}
            </Text>

            <OtpInput
              length={6}
              onOtpComplete={handlePhoneOtpComplete}
              isError={false}
              errorMessage="Invalid OTP. Please try again."
            />

            <HStack justifyContent="center" space={2} mt={4}>
              <Text color="light.100">Didn't receive the code?</Text>
              <Pressable onPress={handleRequestPhoneOtp}>
                <Text color="primary.500" fontWeight="bold">
                  Resend
                </Text>
              </Pressable>
            </HStack>

            <Button
              onPress={() => setStep(SignUpStep.PHONE_NUMBER)}
              variant="ghost"
              size="sm"
              mt={2}
              _text={{ color: "light.100" }}
            >
              Change Phone Number
            </Button>
          </VStack>
        );
        
      case SignUpStep.WORK_EMAIL:
        return (
          <VStack space={4} w="100%">
            <FormControl isInvalid={!isEmailValid}>
              <FormControl.Label _text={{ color: "light.100" }}>Work Email</FormControl.Label>
              <Input
                size="lg"
                color="light.100"
                keyboardType="email-address"
                value={workEmail}
                onChangeText={(value) => {
                  setWorkEmail(value);
                  setIsEmailValid(true);
                }}
                placeholder="Enter your work email"
              />
              <FormControl.ErrorMessage>
                Please enter a valid work email
              </FormControl.ErrorMessage>
              <FormControl.HelperText _text={{ color: "light.300" }}>
                This helps us verify your organization
              </FormControl.HelperText>
            </FormControl>

            <Button
              onPress={handleRequestEmailOtp}
              size="lg"
              w="100%"
              colorScheme="primary"
              mt={2}
            >
              Verify Email
            </Button>
            
            <Button
              onPress={() => setStep(SignUpStep.PHONE_NUMBER)}
              variant="ghost"
              size="sm"
              mt={2}
              _text={{ color: "light.100" }}
            >
              Back to Phone Verification
            </Button>
          </VStack>
        );
        
      case SignUpStep.EMAIL_OTP_VERIFICATION:
        return (
          <VStack space={4} w="100%">
            <Heading size="md" color="light.100" textAlign="center">
              Verify Your Email
            </Heading>
            <Text color="light.100" textAlign="center">
              We've sent a 6-digit code to {workEmail}
            </Text>

            <OtpInput
              length={6}
              onOtpComplete={handleEmailOtpComplete}
              isError={false}
              errorMessage="Invalid OTP. Please try again."
            />

            <HStack justifyContent="center" space={2} mt={4}>
              <Text color="light.100">Didn't receive the code?</Text>
              <Pressable onPress={handleRequestEmailOtp}>
                <Text color="primary.500" fontWeight="bold">
                  Resend
                </Text>
              </Pressable>
            </HStack>

            <Button
              onPress={() => setStep(SignUpStep.WORK_EMAIL)}
              variant="ghost"
              size="sm"
              mt={2}
              _text={{ color: "light.100" }}
            >
              Change Email
            </Button>
          </VStack>
        );
        
      case SignUpStep.USER_DETAILS:
        return (
          <VStack space={4} w="100%">
            <Heading size="md" color="light.100" textAlign="center">
              Create Your Profile
            </Heading>
            
            <FormControl isInvalid={!isUsernameValid}>
              <FormControl.Label _text={{ color: "light.100" }}>Username</FormControl.Label>
              <Input
                size="lg"
                color="light.100"
                value={username}
                onChangeText={(value) => {
                  setUsername(value);
                  setIsUsernameValid(true);
                }}
                placeholder="Choose a username"
              />
              <FormControl.ErrorMessage>
                Username must be at least 3 characters
              </FormControl.ErrorMessage>
              <FormControl.HelperText _text={{ color: "light.300" }}>
                This will be your anonymous identity
              </FormControl.HelperText>
            </FormControl>
            
            <FormControl>
              <FormControl.Label _text={{ color: "light.100" }}>Professional Designation</FormControl.Label>
              <Input
                size="lg"
                color="light.100"
                value={designation}
                onChangeText={setDesignation}
                placeholder="e.g. Software Engineer, Marketing Director"
              />
            </FormControl>
            
            <FormControl>
              <FormControl.Label _text={{ color: "light.100" }}>Organization</FormControl.Label>
              <Select
                selectedValue={organization}
                minWidth="200"
                color="light.100"
                placeholder="Select your organization"
                _selectedItem={{
                  bg: "primary.500",
                }}
                onValueChange={itemValue => setOrganization(itemValue)}
              >
                {ORGANIZATIONS.map(org => (
                  <Select.Item key={org.value} label={org.label} value={org.value} />
                ))}
              </Select>
              <FormControl.HelperText _text={{ color: "light.300" }}>
                We've detected these organizations from your email domain
              </FormControl.HelperText>
            </FormControl>

            <Button
              onPress={handleSignUp}
              size="lg"
              w="100%"
              colorScheme="primary"
              mt={4}
              isLoading={loading}
            >
              Create Account
            </Button>
          </VStack>
        );
        
      default:
        return null;
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
          <Text color="light.100" textAlign="center" mb={4}>
            Your anonymous social portfolio platform
          </Text>

          {renderStep()}

          {/* Sign in link */}
          <HStack mt={6} justifyContent="center">
            <Text color="light.100">Already have an account?</Text>
            <Pressable onPress={navigateToSignIn}>
              <Text ml={1} color="primary.500" fontWeight="bold">
                Sign In
              </Text>
            </Pressable>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default SignUpScreen;