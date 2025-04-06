import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Joystick from '../Components/Joystick';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainMap from '../Maps/MainMap';
import MainCharacter from '../Characters/MainCharacter';
const SecondScreen = () => {
  const [characterPosition, setCharacterPosition] = useState({ x: 150, y: 150 });

  const handleJoystickMove = (dx, dy) => {
    // Move the character continuously based on joystick direction
    setCharacterPosition((prevPosition) => ({
        x: prevPosition.x + dx,
        y: prevPosition.y + dy,
      }));
    };

    return (
        <View style={styles.container}>
            <MainMap>
            {/* Use MainCharacter to render the character */}
                <MainCharacter position={characterPosition} />
            </MainMap>
            <Joystick onMove={handleJoystickMove} />
            <Text>Use the joystick to move the character continuously!</Text>
        </View>
        );
    };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  character: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 25,
  },
});

export default SecondScreen;
