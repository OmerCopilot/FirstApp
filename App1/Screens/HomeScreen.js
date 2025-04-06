import { React, StyleSheet, Text, View, Button, StatusBar } from '../CommonImports';
import { PanResponder } from 'react-native';

export default function HomeScreen({ navigation }) {
  // Create a PanResponder to detect swipe gestures
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      // Detect horizontal swipe
      return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx < -50) {
        // Swipe left: Navigate to the second screen
        navigation.navigate('Second');
      }
    },
  });

  return (
    <View
      style={styles.container}
      {...panResponder.panHandlers} // Attach gesture handlers to the View
    >
      <Text>This is the home screen!</Text>
      <Button title="Go to Second Screen" onPress={() => navigation.navigate('Second')} />
      <StatusBar style="auto" />
    </View>
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