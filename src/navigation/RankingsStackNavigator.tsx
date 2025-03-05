import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RankingsScreen from '../screens/rankings/RankingsScreen';
import OrganizationRankingsScreen from '../screens/rankings/OrganizationRankingsScreen';

const RankingsStack = createStackNavigator();

const RankingsStackNavigator = () => {
  return (
    <RankingsStack.Navigator screenOptions={{ headerShown: false }}>
      <RankingsStack.Screen name="GlobalRankings" component={RankingsScreen} />
      <RankingsStack.Screen name="OrganizationRankings" component={OrganizationRankingsScreen} />
    </RankingsStack.Navigator>
  );
};

export default RankingsStackNavigator; 