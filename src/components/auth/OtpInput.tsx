// src/components/auth/OtpInput.tsx

import React, { useState } from 'react';
import { 
  HStack, 
  Input, 
  FormControl 
} from 'native-base';

interface OtpInputProps {
  length?: number;
  onOtpComplete: (otp: string) => void;
  isError?: boolean;
  errorMessage?: string;
}

const OtpInput = ({ 
  length = 6, 
  onOtpComplete, 
  isError = false,
  errorMessage = "Invalid OTP" 
}: OtpInputProps) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = React.useRef<any[]>([]);
  
  // Handle input change
  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    // Ensure only one character and it's a number
    newOtp[index] = value.replace(/[^0-9]/g, '').substring(0, 1);
    setOtp(newOtp);
    
    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
    
    // Check if OTP is complete
    const otpString = newOtp.join('');
    if (otpString.length === length) {
      onOtpComplete(otpString);
    }
  };

  // Handle backspace
  const handleKeyPress = (e: any, index: number) => {
    // Move to previous input on backspace with empty value
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <FormControl isInvalid={isError}>
      <HStack space={2} justifyContent="center">
        {Array(length)
          .fill(0)
          .map((_, index) => (
            <Input
              key={index}
              ref={(ref) => {
                if (ref) {
                  inputRefs.current[index] = ref;
                }
              }}
              width={12}
              height={12}
              fontSize="xl"
              textAlign="center"
              keyboardType="number-pad"
              maxLength={1}
              value={otp[index]}
              onChangeText={(value) => handleChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
      </HStack>
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
};

export default OtpInput;