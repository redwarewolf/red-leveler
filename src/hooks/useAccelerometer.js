import { useState, useEffect, useRef } from 'react';
import { Accelerometer } from 'expo-sensors';

const LEVEL_THRESHOLD_DEGREES = 1;

export function useAccelerometer(externalIsLandscape, rawOrientation) {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [angles, setAngles] = useState({ pitch: 0, roll: 0 }); // This will be the "Reported" angle (Calibrated)
  const [isLevel, setIsLevel] = useState(false);
  const [isHorizontalMode, setIsHorizontalMode] = useState(false);
  const [subscription, setSubscription] = useState(null);

  // Calibration and Target State
  const [calibration, setCalibration] = useState({ pitch: 0, roll: 0 });
  const [targetAngles, setTargetAngles] = useState({ pitch: 0, roll: 0 });

  // Refs to access latest state inside listener without re-subscribing
  const calibrationRef = useRef({ pitch: 0, roll: 0 });
  const targetAnglesRef = useRef({ pitch: 0, roll: 0 });

  useEffect(() => {
    calibrationRef.current = calibration;
  }, [calibration]);

  useEffect(() => {
    targetAnglesRef.current = targetAngles;
  }, [targetAngles]);

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, [externalIsLandscape, rawOrientation]); // Re-subscribe when orientation changes

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData);

        let rawPitch, rawRoll;

        // Use the external orientation state to determine calculation mode
        // Fallback to gravity check if undefined (backward compatibility)
        const isHorizontal = externalIsLandscape !== undefined
          ? externalIsLandscape
          : Math.abs(accelerometerData.x) > Math.abs(accelerometerData.y);

        setIsHorizontalMode(isHorizontal);

        if (isHorizontal) {
          // Modo horizontal: medir inclinación del borde largo respecto al suelo
          // Using abs(x) normalizes both Landscape Left (x=1) and Right (x=-1) to 0 degrees center
          rawPitch = Math.atan2(accelerometerData.y, Math.abs(accelerometerData.x)) * 180 / Math.PI;
          rawRoll = 0;
        } else {
          // Modo vertical: calcular ambos ángulos
          rawPitch = Math.atan2(accelerometerData.x, accelerometerData.y) * 180 / Math.PI;
          rawRoll = Math.atan2(accelerometerData.z, accelerometerData.y) * 180 / Math.PI;
        }

        // Apply Calibration and Modulo 90 Wrapping
        // wrapping: 90 wraps to 0. 95 wraps to 5.
        const pitch = (rawPitch - calibrationRef.current.pitch) % 90;
        const roll = (rawRoll - calibrationRef.current.roll) % 90;

        setAngles({ pitch, roll });

        // Check Level against Target Angle
        const target = targetAnglesRef.current;
        const pitchDiff = Math.abs(pitch - target.pitch);
        const rollDiff = Math.abs(roll - target.roll);

        const level = isHorizontal
          ? pitchDiff <= LEVEL_THRESHOLD_DEGREES
          : pitchDiff <= LEVEL_THRESHOLD_DEGREES && rollDiff <= LEVEL_THRESHOLD_DEGREES;

        setIsLevel(level);
      })
    );
    Accelerometer.setUpdateInterval(50);
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const calibrate = () => {
    // Current raw is what we have right now.
    // Wait, we don't have access to "current raw" here easily unless we store it.
    // Actually, `angles` is currently Calculated. 
    // We can infer raw from angles + current calibration.
    // Raw = Angles + CurrentCalibration
    // NewCalibration = Raw.
    // So NewCalibration = Angles + CurrentCalibration.

    // However, `angles` state might be slightly delayed from the ref? 
    // It's safer to capture the *next* reading, but for UI responsiveness we can use the last calculated `angles` + `calibration`.
    // Let's rely on the fact that `angles` is updated every 100ms.

    const currentRawPitch = angles.pitch + calibration.pitch;
    const currentRawRoll = angles.roll + calibration.roll;

    setCalibration({
      pitch: currentRawPitch,
      roll: currentRawRoll
    });
  };

  const resetCalibration = () => {
    setCalibration({ pitch: 0, roll: 0 });
  };

  return {
    data,
    angles,
    isLevel,
    isHorizontalMode,
    calibrate,
    resetCalibration,
    targetAngles,
    setTargetAngles
  };
}
