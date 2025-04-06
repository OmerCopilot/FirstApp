import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from '../CommonImports';
import Joystick from '../Components/Joystick';

const { width, height } = Dimensions.get('window');

export default function SecondScreen() {
  const [characterPosition, setCharacterPosition] = useState({ x: width / 2, y: height / 2 });
  const [isMoving, setIsMoving] = useState(false);

  const handleJoystickMove = (dx, dy) => {
    setIsMoving(true);
    setCharacterPosition((prev) => {
      const moveX = dx / 10; // Adjust sensitivity
      const moveY = dy / 10;
      return {
        x: Math.min(Math.max(0, prev.x + moveX), width - 50),
        y: Math.min(Math.max(0, prev.y + moveY), height - 50),
      };
    });
  };

  const handleJoystickRelease = () => {
    setIsMoving(false);
  };

  return (
    <View style={styles.container}>
      {/* Map */}
      <View style={styles.map}>
        {/* Character */}
        <View
          style={[
            styles.character,
            { top: characterPosition.y, left: characterPosition.x },
          ]}
        />
      </View>

      {/* Joystick */}
      <Joystick onMove={handleJoystickMove} onRelease={handleJoystickRelease} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB', // Sky blue background
  },
  map: {
    flex: 1,
    backgroundColor: '#228B22', // Green map
    position: 'relative',
  },
  character: {
    width: 50,
    height: 50,
    backgroundColor: 'red', // Character color
    position: 'absolute',
    borderRadius: 25,
  },
});