import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

const Joystick = ({ onMove }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [dragging, setDragging] = useState(false);

  // Handle pan gesture update
  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: pan.x, translationY: pan.y } }],
    { useNativeDriver: false }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === 5) { // When gesture is released
      // Reset joystick position when gesture ends
      setDragging(false);
      pan.setValue({ x: 0, y: 0 });
      onMove(0, 0); // Stop character movement when released
    } else {
      setDragging(true);
    }
  };

  // Effect to move joystick and trigger continuous movement
  useEffect(() => {
    if (dragging) {
      const interval = setInterval(() => {
        // Get the values of pan.x and pan.y
        const dx = pan.x.__getValue();
        const dy = pan.y.__getValue();

        // If the joystick is moved significantly, call onMove to move the character
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
          // Normalize the joystick's position to limit its movement
          const magnitude = Math.sqrt(dx * dx + dy * dy);
          if (magnitude > 100) {
            const angle = Math.atan2(dy, dx);
            const speed = 5; // Adjust this for desired speed
            const velocityX = speed * Math.cos(angle);
            const velocityY = speed * Math.sin(angle);

            // Update position
            onMove(velocityX, velocityY);
          }
        }
      }, 16); // Roughly 60fps (16ms per frame)

      return () => clearInterval(interval);
    }
  }, [dragging, pan, onMove]);

  return (
    <View style={styles.joystickContainer}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View
          style={[
            styles.joystick,
            {
              transform: [{ translateX: pan.x }, { translateY: pan.y }],
            },
          ]}
        />
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  joystickContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  joystick: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default Joystick;
