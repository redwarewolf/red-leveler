import { View, Animated, StyleSheet } from 'react-native';

const BUBBLE_SIZE = 60;

export default function LevelCircle({ bubbleAnimX, bubbleAnimY, isLevel }) {
  return (
    <View style={styles.levelContainer}>
      <View style={styles.outerCircle}>
        <View style={styles.horizontalLine} />
        <View style={styles.verticalLine} />
        <View style={styles.centerCircle} />
        <Animated.View 
          style={[
            styles.bubble,
            {
              transform: [
                { translateX: bubbleAnimX },
                { translateY: bubbleAnimY }
              ],
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
  levelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  outerCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#1a1a1a',
    borderWidth: 8,
    borderTopColor: '#0d0d0d',
    borderLeftColor: '#0d0d0d',
    borderRightColor: '#2d2d2d',
    borderBottomColor: '#2d2d2d',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.9,
    shadowRadius: 15,
    elevation: 20,
  },
  horizontalLine: {
    position: 'absolute',
    width: '70%',
    height: 1,
    backgroundColor: '#555',
    opacity: 0.6,
  },
  verticalLine: {
    position: 'absolute',
    width: 1,
    height: '70%',
    backgroundColor: '#555',
    opacity: 0.6,
  },
  centerCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#555',
    position: 'absolute',
    opacity: 0.5,
  },
  bubble: {
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    borderRadius: BUBBLE_SIZE / 2,
    position: 'absolute',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 15,
    borderWidth: 4,
    borderColor: '#0a0a0a',
  },
});
