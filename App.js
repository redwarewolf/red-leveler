import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useAccelerometer } from './src/hooks/useAccelerometer';
import { useOrientation } from './src/hooks/useOrientation';
import { useBubbleAnimation } from './src/hooks/useBubbleAnimation';
import LevelCircle from './src/components/LevelCircle';
import LinearLevel from './src/components/LinearLevel';
import InfoPanel from './src/components/InfoPanel';
import ControlPanel from './src/components/ControlPanel';
import TargetModal from './src/components/TargetModal';
import Header from './src/components/Header';
import { useState } from 'react';

export default function App() {
  const { isLandscape, orientation, orientationLocked, toggleOrientationLock } = useOrientation();
  const [modalVisible, setModalVisible] = useState(false);

  const {
    angles,
    isLevel,
    calibrate,
    resetCalibration,
    targetAngles,
    setTargetAngles
  } = useAccelerometer(isLandscape, orientation);

  // Calculate bubble animation target (center bubble when angle matches target)
  const bubbleInput = {
    pitch: angles.pitch - targetAngles.pitch,
    roll: angles.roll - targetAngles.roll
  };

  const { bubbleAnimX, bubbleAnimY } = useBubbleAnimation(bubbleInput);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {!isLandscape ? (
        <>
          <Header />
          <LevelCircle
            bubbleAnimX={bubbleAnimX}
            bubbleAnimY={bubbleAnimY}
            isLevel={isLevel}
          />
          <InfoPanel
            isLevel={isLevel}
            angles={angles}
            isLandscape={isLandscape}
          />
        </>
      ) : (
        <>
          <LinearLevel
            bubbleAnimX={bubbleAnimX}
            angles={angles}
            isLevel={isLevel}
          />
          <InfoPanel
            isLevel={isLevel}
            angles={angles}
            isLandscape={isLandscape}
          />
        </>
      )}

      <ControlPanel
        onCalibrate={calibrate}
        onResetCalibration={resetCalibration}
        onOpenTarget={() => setModalVisible(true)}
        isLocked={orientationLocked}
        onToggleLock={toggleOrientationLock}
        isLandscape={isLandscape}
      />

      <TargetModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={setTargetAngles}
        currentTargets={targetAngles}
        isLandscape={isLandscape}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
