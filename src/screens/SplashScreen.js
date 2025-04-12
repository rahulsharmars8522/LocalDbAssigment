import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = () => {

  const navigation = useNavigation();

  useEffect(() => {
    // Simulate loading and navigate to Home Screen after 3 seconds
    setTimeout(() => {
      navigation.navigate('Home');

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: "Home" },  // Passing isLoggedIn here
          ],
        })
      );

    }, 1000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the App!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
