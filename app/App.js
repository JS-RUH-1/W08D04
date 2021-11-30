import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthScreen from './AuthScreen';
import DetailsScreen from './DetailsScreen';
import AuthorScreen from './AuthorScreen';
import BooksScreen from './booksScreen';
import profileScreen from './profileScreen';
import publishModel from './publishModel';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Home() {
  return (
      <Stack.Navigator initialRouteName="DetailsScreen"   barStyle={{ backgroundColor: '#000' }}>
        <Stack.Group>
          <Stack.Screen name="AuthScreen" component={AuthScreen} options={{headerShown: false, title: 'Login' }}/> 
          <Stack.Screen name="profileScreen" component={profileScreen} options={{headerShown: false, title: 'profile' }}/>
       </Stack.Group>
       <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="publishModel" component={publishModel} options={{ title: 'Publish' }}/> 
       </Stack.Group>
      </Stack.Navigator>
  );
}

function Authors() {
  return (
      <Stack.Navigator initialRouteName="DetailsScreen"   barStyle={{ backgroundColor: '#000' }}>
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{headerShown: false, title: 'Authors' }}/>
        <Stack.Screen name="AuthorScreen" component={AuthorScreen} options={{ title: 'Author Details' }}/>
      </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="DetailsScreen"   barStyle={{ backgroundColor: '#000' }}>
        <Tab.Screen name="Home" component={Home} options={{headerShown: false, title: 'Home' }}/> 
        <Tab.Screen name="Authors" component={Authors} options={{headerShown: false, title: 'Authors' }}/>
        <Tab.Screen name="BooksScreen" component={BooksScreen} options={{headerShown: false, title: 'All Books'}}/> 
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
