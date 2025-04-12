import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../utils';

const FabButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Text style={styles.fabText}>{"+"}</Text> 
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 40,
    backgroundColor: colors.baseBlack, // Green background
    width: 60,
    height: 60,
    borderRadius: 30, // Circular shape
    justifyContent: 'center',
    alignItems: 'center',
    overflow:'hidden',
    elevation:10
  },
  fabText: {
    color: '#fff',
    fontSize: 30, // Large plus sign
    fontWeight: 'bold',
  },
});

export default FabButton;
