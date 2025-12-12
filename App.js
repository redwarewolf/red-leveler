import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useAccelerometer } from './src/hooks/useAccelerometer';
import { useOrientation } from './src/hooks/useOrientation';
import { useBubbleAnimation } from './src/hooks/useBubbleAnimation';
import LevelCircle from './src/components/LevelCircle';
import LinearLevel from './src/components/LinearLevel';
import InfoPanel from './src/components/InfoPanel';
import OrientationLockButton from './src/components/OrientationLockButton';

export default function App() {
  const { angles, isLevel } = useAccelerometer();
  const { isLandscape, orientationLocked, toggleOrientationLock } = useOrientation();
  const { bubbleAnimX, bubbleAnimY } = useBubbleAnimation(angles);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <OrientationLockButton 
        orientationLocked={orientationLocked}
        onToggle={toggleOrientationLock}
      />
      
      {!isLandscape ? (
        <>
          <Text style={styles.title}>Red Leveler</Text>
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
  title: {
    fontSize: 28,
    fontWeight: '300',
    color: '#4A90E2',
    marginBottom: 30,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
});
