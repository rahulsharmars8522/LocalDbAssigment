import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from '../Redux/store';  // Import the Redux store
import SplashScreen from '../screens/SplashScreen';  // Import your screens
import HomeScreen from '../screens/HomeScreen';
import AddEditScreen from '../screens/AddEditScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Provider store={store}>  
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          {/* Splash Screen */}
          <Stack.Screen 
            name="Splash" 
            component={SplashScreen} 
            options={{ headerShown: false }} 
          />
          
          {/* Home Screen */}
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }} 
          />

          {/* Add/Edit Screen */}
          <Stack.Screen 
            name="AddEditScreen" 
            component={AddEditScreen} 
            options={{ headerShown: false }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default AppNavigator;
