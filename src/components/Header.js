import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// A reusable Header component
const Header  = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: "7%",
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
});

export default Header;
