import { View, Animated, StyleSheet } from 'react-native';
import { useEffect } from 'react';

const LINEAR_BUBBLE_SIZE = 50;

export default function LinearLevel({ bubbleAnimX, angles, isLevel }) {
  const maxLinearOffset = 150;
  const targetPosition = Math.max(-maxLinearOffset, Math.min(maxLinearOffset, angles.pitch * 8));
  
  useEffect(() => {
    Animated.spring(bubbleAnimX, {
      toValue: targetPosition,
      useNativeDriver: true,
      damping: 15,
      stiffness: 100,
    }).start();
  }, [targetPosition]);
  
  return (
    <View style={styles.linearLevelContainer}>
      <View style={styles.linearTrack}>
        <View style={styles.centerMark} />
        <Animated.View 
          style={[
            styles.linearBubble,
            {
              transform: [{ translateX: bubbleAnimX }],
              backgroundColor: isLevel ? '#39FF14' : '#FF3030',
              shadowColor: isLevel ? '#39FF14' : '#FF3030',
            }
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  linearLevelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
    width: '80%',
  },
  linearTrack: {
    width: '100%',
    height: 80,
    backgroundColor: '#1a1a1a',
    borderRadius: 40,
    borderWidth: 8,
    borderTopColor: '#0d0d0d',
    borderLeftColor: '#0d0d0d',
    borderRightColor: '#2d2d2d',
    borderBottomColor: '#2d2d2d',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.9,
    shadowRadius: 15,
    elevation: 20,
  },
  centerMark: {
    position: 'absolute',
    width: 3,
    height: '80%',
    backgroundColor: '#555',
    opacity: 0.6,
  },
  linearBubble: {
    width: LINEAR_BUBBLE_SIZE,
    height: LINEAR_BUBBLE_SIZE,
    borderRadius: LINEAR_BUBBLE_SIZE / 2,
    position: 'absolute',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 15,
    borderWidth: 4,
    borderColor: '#0a0a0a',
  },
});
