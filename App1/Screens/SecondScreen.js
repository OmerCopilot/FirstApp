import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Joystick from '../Components/Joystick';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainMap from '../Maps/MainMap';
import MainCharacter from '../Characters/MainCharacter';

const { width, height } = Dimensions.get('window');

const SecondScreen = () => {
    const [characterPosition, setCharacterPosition] = useState({ x: width / 2 - 25, y: height / 2 - 25});

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
                <MainCharacter position={characterPosition} />
                <Joystick onMove={handleJoystickMove} />
            </MainMap>
        </View>
        );
    };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default SecondScreen;
