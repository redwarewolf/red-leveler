import { View, Text, StyleSheet } from 'react-native';
import { formatAngle } from '../utils/formatters';

export default function InfoPanel({ isLevel, angles, isLandscape }) {
  return (
    <View style={[
      styles.infoContainer,
      isLandscape && styles.infoContainerLandscape
    ]}>
      <View style={[
        styles.infoContent,
        isLandscape && styles.infoContentLandscape
      ]}>
        <View style={[
          styles.ledContainer,
          isLandscape && styles.ledContainerLandscape
        ]}>
          <View style={[
            styles.led,
            isLandscape && styles.ledLandscape,
            {
              backgroundColor: isLevel ? '#39FF14' : '#FF0000',
              shadowColor: isLevel ? '#39FF14' : '#FF0000',
            }
          ]} />
        </View>
        <View style={[
          styles.dataContainer,
          isLandscape && styles.dataContainerLandscape
        ]}>
          {isLandscape ? (
            <Text style={[styles.dataText, styles.dataTextLandscape]}>
              X:{formatAngle(angles.pitch)}
            </Text>
          ) : (
            <>
              <Text style={styles.dataText}>X:{formatAngle(angles.pitch)}</Text>
              <Text style={styles.dataText}>Y:{formatAngle(angles.roll)}</Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginHorizontal: 20,
    backgroundColor: '#2a2a2a',
    padding: 4,
    borderRadius: 16,
    borderWidth: 6,
    borderTopColor: '#404040',
    borderLeftColor: '#404040',
    borderRightColor: '#1a1a1a',
    borderBottomColor: '#1a1a1a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.9,
    shadowRadius: 12,
    elevation: 15,
    maxWidth: '90%',
  },
  infoContainerLandscape: {
    marginTop: 20,
    padding: 3,
    borderWidth: 4,
    borderRadius: 12,
    maxWidth: 300,
    alignSelf: 'center',
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0d0d0d',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    gap: 12,
    maxWidth: '100%',
  },
  infoContentLandscape: {
    padding: 6,
    gap: 8,
    borderRadius: 8,
  },
  ledContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    padding: 8,
    borderRadius: 30,
    borderWidth: 3,
    borderTopColor: '#0a0a0a',
    borderLeftColor: '#0a0a0a',
    borderRightColor: '#2a2a2a',
    borderBottomColor: '#2a2a2a',
  },
  ledContainerLandscape: {
    padding: 5,
    borderWidth: 2,
    borderRadius: 20,
  },
  led: {
    width: 32,
    height: 32,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 3,
    borderColor: '#0a0a0a',
  },
  ledLandscape: {
    width: 22,
    height: 22,
    borderRadius: 11,
    shadowRadius: 12,
    borderWidth: 2,
  },
  dataContainer: {
    flexDirection: 'row',
    gap: 4,
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 10,
    borderWidth: 3,
    borderTopColor: '#0a0a0a',
    borderLeftColor: '#0a0a0a',
    borderRightColor: '#1a1a1a',
    borderBottomColor: '#1a1a1a',
    flex: 1,
    justifyContent: 'center',
  },
  dataContainerLandscape: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    flex: 0,
    minWidth: 140,
  },
  dataText: {
    fontSize: 20,
    color: '#39FF14',
    fontWeight: '700',
    letterSpacing: 2,
    textShadowColor: '#39FF14',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    width: 115,
    textAlign: 'center',
  },
  dataTextLandscape: {
    width: 'auto',
    minWidth: 120,
  },
});
