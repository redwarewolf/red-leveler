import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export function useBubbleAnimation(angles) {
  const bubbleAnimX = useRef(new Animated.Value(0)).current;
  const bubbleAnimY = useRef(new Animated.Value(0)).current;

  const maxOffset = 100;
  const targetBubbleX = Math.max(-maxOffset, Math.min(maxOffset, angles.pitch * 5));
  const targetBubbleY = Math.max(-maxOffset, Math.min(maxOffset, angles.roll * 5));
  
  useEffect(() => {
    Animated.parallel([
      Animated.spring(bubbleAnimX, {
        toValue: targetBubbleX,
        useNativeDriver: true,
        damping: 15,
        stiffness: 100,
      }),
      Animated.spring(bubbleAnimY, {
        toValue: targetBubbleY,
        useNativeDriver: true,
        damping: 15,
        stiffness: 100,
      })
    ]).start();
  }, [targetBubbleX, targetBubbleY]);

  return {
    bubbleAnimX,
    bubbleAnimY
  };
}
