import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

export function useOrientation() {
  const [orientationLocked, setOrientationLocked] = useState(false);
  const [lockedOrientation, setLockedOrientation] = useState(null);
  const { width, height } = useWindowDimensions();

  const currentOrientation = width > height;
  const isLandscape = orientationLocked ? lockedOrientation : currentOrientation;

  const toggleOrientationLock = async () => {
    if (orientationLocked) {
      // Desbloquear - permitir todas las orientaciones
      await ScreenOrientation.unlockAsync();
      setOrientationLocked(false);
      setLockedOrientation(null);
    } else {
      // Bloquear en la orientación actual
      if (currentOrientation) {
        // Landscape
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      } else {
        // Portrait
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      }
      setOrientationLocked(true);
      setLockedOrientation(currentOrientation);
    }
  };

  return {
    isLandscape,
    orientationLocked,
    toggleOrientationLock
  };
}
