import { React, StyleSheet, Text, View } from '../CommonImports';

export default function SecondScreen() {
  return (
    <View style={styles.container}>
      <Text>This is the second screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
});