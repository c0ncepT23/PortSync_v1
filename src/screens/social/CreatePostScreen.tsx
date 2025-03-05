import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Box, Text, VStack, HStack, TextArea, Button, Icon, Heading, Divider, useToast, Spinner } from 'native-base';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CreatePostScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const toast = useToast();
  
  const [postContent, setPostContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postType, setPostType] = useState('text'); // 'text' or 'poll'
  
  const handleSubmit = () => {
    if (!postContent.trim()) {
      toast.show({
        title: "Post cannot be empty",
        status: "warning",
        placement: "top"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.show({
        title: "Post created successfully",
        status: "success",
        placement: "top"
      });
      navigation.goBack();
    }, 1000);
  };
  
  const handleCancel = () => {
    navigation.goBack();
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Box flex={1} bg={theme.colors.background} safeArea>
        <VStack space={4} p={4} flex={1}>
          <HStack justifyContent="space-between" alignItems="center">
            <TouchableOpacity onPress={handleCancel}>
              <Icon as={Ionicons} name="close" size="md" color={theme.colors.text} />
            </TouchableOpacity>
            <Heading size="md" color={theme.colors.text}>Create Post</Heading>
            <Box width={8} /> {/* Spacer for alignment */}
          </HStack>
          
          <Divider bg={theme.colors.border} />
          
          <HStack space={4} mb={2}>
            <Button 
              variant={postType === 'text' ? "solid" : "outline"}
              colorScheme="primary"
              onPress={() => setPostType('text')}
              leftIcon={<Icon as={Ionicons} name="document-text-outline" size="sm" />}
              flex={1}
            >
              Text
            </Button>
            <Button 
              variant={postType === 'poll' ? "solid" : "outline"}
              colorScheme="primary"
              onPress={() => setPostType('poll')}
              leftIcon={<Icon as={Ionicons} name="bar-chart-outline" size="sm" />}
              flex={1}
            >
              Poll
            </Button>
          </HStack>
          
          {postType === 'text' ? (
            <TextArea
              h={40}
              placeholder="What's on your mind about the markets today?"
              value={postContent}
              onChangeText={setPostContent}
              autoCompleteType="off"
              fontSize="md"
              color={theme.colors.text}
              borderColor={theme.colors.border}
              _focus={{
                borderColor: theme.colors.primary,
              }}
            />
          ) : (
            <VStack space={4}>
              <TextArea
                h={20}
                placeholder="Ask a question for your poll..."
                value={postContent}
                onChangeText={setPostContent}
                autoCompleteType="off"
                fontSize="md"
                color={theme.colors.text}
                borderColor={theme.colors.border}
                _focus={{
                  borderColor: theme.colors.primary,
                }}
              />
              
              {/* Poll options */}
              <VStack space={2}>
                <HStack space={2} alignItems="center">
                  <Box flex={1}>
                    <TextArea
                      placeholder="Option 1"
                      fontSize="md"
                      color={theme.colors.text}
                      borderColor={theme.colors.border}
                      h={10}
                    />
                  </Box>
                  <Icon as={Ionicons} name="close-circle" size="sm" color={theme.colors.textSecondary} />
                </HStack>
                
                <HStack space={2} alignItems="center">
                  <Box flex={1}>
                    <TextArea
                      placeholder="Option 2"
                      fontSize="md"
                      color={theme.colors.text}
                      borderColor={theme.colors.border}
                      h={10}
                    />
                  </Box>
                  <Icon as={Ionicons} name="close-circle" size="sm" color={theme.colors.textSecondary} />
                </HStack>
                
                <Button 
                  variant="ghost" 
                  leftIcon={<Icon as={Ionicons} name="add-circle-outline" size="sm" />}
                  alignSelf="flex-start"
                  _text={{ color: theme.colors.primary }}
                >
                  Add Option
                </Button>
              </VStack>
            </VStack>
          )}
          
          <Box flex={1} />
          
          <Button
            colorScheme="primary"
            isLoading={isSubmitting}
            onPress={handleSubmit}
            isDisabled={!postContent.trim()}
          >
            Post
          </Button>
        </VStack>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default CreatePostScreen; 