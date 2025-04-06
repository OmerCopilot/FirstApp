import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function MainCharacter({ position }) {
  return (
    <View
      style={[
        styles.character,
        { top: position.y, left: position.x },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  character: {
    width: 50,
    height: 50,
    backgroundColor: 'red', // Character color
    position: 'absolute',
    borderRadius: 25,
  },
});