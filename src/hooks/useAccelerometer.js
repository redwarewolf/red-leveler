import { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';

const LEVEL_THRESHOLD_DEGREES = 1;

export function useAccelerometer() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [angles, setAngles] = useState({ pitch: 0, roll: 0 });
  const [isLevel, setIsLevel] = useState(false);
  const [isHorizontalMode, setIsHorizontalMode] = useState(false);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData);
        
        let pitch, roll;
        
        // Detectar orientación basado en qué eje tiene más gravedad
        const isHorizontal = Math.abs(accelerometerData.x) > Math.abs(accelerometerData.y);
        setIsHorizontalMode(isHorizontal);
        
        if (isHorizontal) {
          // Modo horizontal: medir inclinación del borde largo respecto al suelo
          pitch = Math.atan2(accelerometerData.y, accelerometerData.x) * 180 / Math.PI;
          roll = 0;
        } else {
          // Modo vertical: calcular ambos ángulos
          pitch = Math.atan2(accelerometerData.x, accelerometerData.y) * 180 / Math.PI;
          roll = Math.atan2(accelerometerData.z, accelerometerData.y) * 180 / Math.PI;
        }
        
        setAngles({ pitch, roll });
        
        // Verificar si está nivelado
        const level = isHorizontal
          ? Math.abs(pitch) <= LEVEL_THRESHOLD_DEGREES
          : Math.abs(pitch) <= LEVEL_THRESHOLD_DEGREES && Math.abs(roll) <= LEVEL_THRESHOLD_DEGREES;
        setIsLevel(level);
      })
    );
    Accelerometer.setUpdateInterval(100);
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  return {
    data,
    angles,
    isLevel,
    isHorizontalMode
  };
}
