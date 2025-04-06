import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function MainMap({ children }) {
  return <View style={styles.map}>{children}</View>;
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    backgroundColor: '#228B22', // Green map
    position: 'relative',
    width: '100%', // Ensure it spans the full width
    height: '100%', // Ensure it spans the full height
  },
});