import React from 'react';
import { Icon, Box, Text } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RankingsTabIcon = ({ focused, color, size }) => {
  return (
    <Box position="relative">
      <Icon 
        as={Ionicons} 
        name={focused ? 'trophy' : 'trophy-outline'} 
        size={size} 
        color={color} 
      />
      <Box 
        position="absolute" 
        top={-3}
        right={-3}
        bg="primary.500" 
        borderRadius="full" 
        px={1} 
        py={0}
        minWidth={4}
        minHeight={4}
        justifyContent="center"
        alignItems="center"
      >
        <Text color="white" fontSize="2xs" fontWeight="bold">
          NEW
        </Text>
      </Box>
    </Box>
  );
};

export default RankingsTabIcon; 