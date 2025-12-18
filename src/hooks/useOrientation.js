import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

export function useOrientation() {
  const [orientationLocked, setOrientationLocked] = useState(false);
  const [lockedOrientation, setLockedOrientation] = useState(null);
  const [orientation, setOrientation] = useState(ScreenOrientation.Orientation.PORTRAIT_UP);
  const { width, height } = useWindowDimensions();

  // Initial check and listener
  useState(() => {
    const checkOrientation = async () => {
      const current = await ScreenOrientation.getOrientationAsync();
      setOrientation(current);
    };
    checkOrientation();

    const subscription = ScreenOrientation.addOrientationChangeListener(evt => {
      setOrientation(evt.orientationInfo.orientation);
    });

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  const currentIsLandscape = width > height;
  const isLandscape = orientationLocked ? lockedOrientation : currentIsLandscape; // simplified check

  const toggleOrientationLock = async () => {
    if (orientationLocked) {
      // Desbloquear - permitir todas las orientaciones
      await ScreenOrientation.unlockAsync();
      setOrientationLocked(false);
      setLockedOrientation(null);
    } else {
      // Bloquear en la orientación actual
      if (currentIsLandscape) {
        // Landscape
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      } else {
        // Portrait
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      }
      setOrientationLocked(true);
      setLockedOrientation(currentIsLandscape);
    }
  };

  return {
    isLandscape,
    orientation,
    orientationLocked,
    toggleOrientationLock
  };
}
