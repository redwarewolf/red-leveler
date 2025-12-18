import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const Icons = {
    Calibrate: () => (
        <View style={styles.iconBox}>
            <View style={styles.crosshairV} />
            <View style={styles.crosshairH} />
            <View style={styles.crosshairCircle} />
        </View>
    ),
    Reset: () => (
        <View style={styles.iconBox}>
            <View style={styles.resetArrow} />
            <View style={styles.resetTip} />
        </View>
    ),
    Target: () => (
        <View style={styles.iconBox}>
            <View style={styles.targetOuter} />
            <View style={styles.targetInner} />
            <View style={styles.targetDot} />
        </View>
    ),
    Lock: ({ locked }) => {
        if (locked) {
            return (
                <View style={styles.lockIconContainer}>
                    <View style={styles.lockShackleDetailed} />
                    <View style={styles.lockBodyDetailed}>
                        <View style={styles.lockKeyhole} />
                    </View>
                </View>
            );
        }
        return (
            <View style={styles.unlockIconContainer}>
                {/* The lifted shackle */}
                <View style={styles.unlockShackleDetailed} />
                {/* The extension line to connect the left leg */}
                <View style={styles.unlockShackleExtension} />
                <View style={styles.lockBodyDetailed}>
                    <View style={styles.lockKeyhole} />
                </View>
            </View>
        );
    }
};

export default function ControlPanel({
    onCalibrate,
    onResetCalibration,
    onOpenTarget,
    isLocked,
    onToggleLock,
    isLandscape
}) {
    return (
        <View style={styles.container}>
            <View style={[styles.buttonRow, isLandscape && styles.buttonRowLandscape]}>

                <TouchableOpacity style={styles.button} onPress={onCalibrate} activeOpacity={0.7}>
                    <Icons.Calibrate />
                    <Text style={styles.buttonLabel}>SET 0°</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={onResetCalibration} activeOpacity={0.7}>
                    <Icons.Reset />
                    <Text style={[styles.buttonLabel, { color: '#eb4034' }]}>RESET</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={onOpenTarget} activeOpacity={0.7}>
                    <Icons.Target />
                    <Text style={styles.buttonLabel}>TARGET</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, isLocked && styles.activeButton]}
                    onPress={onToggleLock}
                    activeOpacity={0.7}
                >
                    <Icons.Lock locked={isLocked} />
                    <Text style={[styles.buttonLabel, isLocked && styles.activeLabel]}>
                        {isLocked ? 'LOCKED' : 'LOCK'}
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 20,
        alignItems: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 16,
    },
    buttonRowLandscape: {
        paddingHorizontal: 120, // Substantial padding for landscape
    },
    button: {
        flex: 1,
        height: 80,
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        borderWidth: 2,
        borderTopColor: '#333',
        borderLeftColor: '#333',
        borderRightColor: '#0d0d0d',
        borderBottomColor: '#0d0d0d',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    activeButton: {
        backgroundColor: '#0d0d0d',
        borderTopColor: '#000',
        borderLeftColor: '#000',
        borderRightColor: '#333',
        borderBottomColor: '#333',
        borderColor: '#FFD700',
        borderWidth: 1,
    },
    buttonLabel: {
        color: '#666',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1,
    },
    activeLabel: {
        color: '#FFD700',
    },
    iconBox: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    // Calibrate Icon
    crosshairV: { width: 2, height: 16, backgroundColor: '#888', position: 'absolute' },
    crosshairH: { width: 16, height: 2, backgroundColor: '#888', position: 'absolute' },
    crosshairCircle: { width: 8, height: 8, borderRadius: 4, borderWidth: 1, borderColor: '#888', position: 'absolute' },

    // Reset Icon
    resetArrow: {
        width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: '#eb4034',
        borderTopColor: 'transparent', transform: [{ rotate: '45deg' }]
    },
    resetTip: {
        width: 0, height: 0,
        borderTopWidth: 4, borderTopColor: '#eb4034',
        borderLeftWidth: 3, borderLeftColor: 'transparent',
        borderRightWidth: 3, borderRightColor: 'transparent',
        position: 'absolute', top: 3, right: 3, transform: [{ rotate: '45deg' }]
    },

    // Target Icon
    targetOuter: { width: 20, height: 20, borderRadius: 10, borderWidth: 1.5, borderColor: '#888' },
    targetInner: { width: 12, height: 12, borderRadius: 6, borderWidth: 1.5, borderColor: '#888', position: 'absolute' },
    targetDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#888', position: 'absolute' },

    // Lock Icon (Detailed)
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
    unlockShackleDetailed: {
        width: 12,
        height: 10,
        borderTopWidth: 2.5,
        borderRightWidth: 2.5,
        borderBottomWidth: 0,
        borderLeftWidth: 2.5,
        borderColor: '#888',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        position: 'absolute',
        top: -5, // Lifted
        left: 6,
    },
    unlockShackleExtension: {
        width: 2.5,
        height: 6, // 5px gap + 1px overlap 
        backgroundColor: '#888',
        position: 'absolute',
        top: 5, // Directly below the shackle's lifted bottom edge (-5 top + 10 height = 5)
        left: 6,
    },
    lockShackleDetailed: {
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
    lockBodyDetailed: {
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
