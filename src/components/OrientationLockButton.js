import { View, StyleSheet, TouchableOpacity } from 'react-native';

const LockIcon = ({ locked }) => {
  if (locked) {
    // Cuando está bloqueado: mostrar candado CERRADO (arco completo)
    return (
      <View style={styles.lockIconContainer}>
        {/* Arco del candado completo (cerrado) */}
        <View style={styles.lockShackle} />
        {/* Cuerpo del candado */}
        <View style={styles.lockBody}>
          <View style={styles.lockKeyhole} />
        </View>
      </View>
    );
  }
  
  // Cuando NO está bloqueado: mostrar candado ABIERTO (arco partido)
  return (
    <View style={styles.unlockIconContainer}>
      {/* Arco del candado abierto (sin lado izquierdo, desplazado) */}
      <View style={styles.unlockShackle} />
      {/* Cuerpo del candado */}
      <View style={styles.lockBody}>
        <View style={styles.lockKeyhole} />
      </View>
    </View>
  );
};

export default function OrientationLockButton({ orientationLocked, onToggle }) {
  return (
    <TouchableOpacity 
      style={styles.lockButtonContainer}
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View style={[
        styles.lockButton,
        orientationLocked && styles.lockButtonActive
      ]}>
        <LockIcon locked={orientationLocked} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  lockButtonContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  lockButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#2a2a2a',
    borderWidth: 3,
    borderTopColor: '#404040',
    borderLeftColor: '#404040',
    borderRightColor: '#1a1a1a',
    borderBottomColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 8,
  },
  lockButtonActive: {
    backgroundColor: '#1a1a1a',
    borderTopColor: '#0d0d0d',
    borderLeftColor: '#0d0d0d',
    borderRightColor: '#2a2a2a',
    borderBottomColor: '#2a2a2a',
  },
  lockIconContainer: {
    width: 24,
    height: 24,
    position: 'relative',
    alignItems: 'center',
  },
  unlockIconContainer: {
    width: 24,
    height: 24,
    position: 'relative',
    alignItems: 'center',
  },
  unlockShackle: {
    width: 12,
    height: 10,
    borderTopWidth: 2.5,
    borderRightWidth: 2.5,
    borderWidth: 2.5,
    borderColor: '#888',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 0,
    position: 'absolute',
    top: 0,
    left: 6,
  },
  lockShackle: {
    width: 12,
    height: 10,
    borderTopWidth: 2.5,
    borderRightWidth: 2.5,
    borderBottomWidth: 0,
    borderLeftWidth: 2.5,
    borderColor: '#888',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 0,
    position: 'absolute',
    top: 0,
    left: 6,
  },
  lockBody: {
    width: 16,
    height: 12,
    backgroundColor: '#888',
    borderRadius: 3,
    position: 'absolute',
    bottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockKeyhole: {
    width: 3,
    height: 5,
    backgroundColor: '#2a2a2a',
    borderRadius: 1.5,
  },
});
