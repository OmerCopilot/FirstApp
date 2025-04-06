import React, { useEffect } from 'react';
import { StyleSheet, View, PanResponder, Animated } from 'react-native';

export default function Joystick({ onMove, onRelease }) {
  const joystickPosition = new Animated.ValueXY({ x: 0, y: 0 });

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      // Update joystick position
      Animated.event(
        [
          null,
          { dx: joystickPosition.x, dy: joystickPosition.y },
        ],
        { useNativeDriver: false }
      )(e, gestureState);

      // Notify parent about movement
      if (onMove) {
        onMove(gestureState.dx, gestureState.dy);
      }
    },
    onPanResponderRelease: () => {
      // Reset joystick position
      Animated.spring(joystickPosition, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }).start();

      // Notify parent about release
      if (onRelease) {
        onRelease();
      }
    },
  });

  return (
    <View style={styles.joystickContainer}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.joystick,
          {
            transform: [
              { translateX: joystickPosition.x },
              { translateY: joystickPosition.y },
            ],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  joystickContainer: {
    position: 'absolute',
    bottom: 50, // Distance from the bottom
    right: 50, // Distance from the right
    width: 100,
    height: 100,
    backgroundColor: '#ccc',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  joystick: {
    width: 50,
    height: 50,
    backgroundColor: '#888',
    borderRadius: 25,
  },
});