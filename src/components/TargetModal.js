import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput } from 'react-native';

export default function TargetModal({ visible, onClose, onSave, currentTargets, isLandscape }) {
    const [pitch, setPitch] = useState('0');
    const [roll, setRoll] = useState('0');

    useEffect(() => {
        if (visible) {
            setPitch(currentTargets.pitch.toString());
            setRoll(currentTargets.roll.toString());
        }
    }, [visible, currentTargets]);

    const handleSave = () => {
        const p = parseFloat(pitch) || 0;
        const r = parseFloat(roll) || 0;
        onSave({ pitch: p, roll: r });
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    {/* Branded Header */}
                    <View style={styles.headerRow}>
                        <Text style={styles.headerTitleRed}>TARGET</Text>
                        <Text style={styles.headerTitleWhite}>ANGLE</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>X (Pitch)</Text>
                            <TextInput
                                style={styles.input}
                                value={pitch}
                                onChangeText={setPitch}
                                keyboardType="numeric"
                                selectTextOnFocus
                            />
                        </View>

                        {!isLandscape && (
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Y (Roll)</Text>
                                <TextInput
                                    style={styles.input}
                                    value={roll}
                                    onChangeText={setRoll}
                                    keyboardType="numeric"
                                    selectTextOnFocus
                                />
                            </View>
                        )}
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.industrialButton} onPress={onClose}>
                            <Text style={styles.buttonText}>CANCEL</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.industrialButton} onPress={handleSave}>
                            <Text style={[styles.buttonText, styles.saveText]}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.85)', // Slightly darker overlay
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#151515', // Matches Header bg
        borderRadius: 12,
        padding: 24,
        borderWidth: 2,
        borderColor: '#333', // Border
        alignItems: 'center',
        // Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 8,
        marginBottom: 24,
    },
    headerTitleRed: {
        fontSize: 24,
        fontWeight: '900',
        color: '#e00', // Deep industrial red
        letterSpacing: 2,
        fontStyle: 'italic',
    },
    headerTitleWhite: {
        fontSize: 24,
        fontWeight: '300',
        color: '#ccc',
        letterSpacing: 2,
    },
    inputContainer: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 30,
    },
    inputGroup: {
        alignItems: 'center',
    },
    label: {
        color: '#666',
        fontSize: 12,
        marginBottom: 8,
        fontWeight: '700',
        letterSpacing: 1,
    },
    input: {
        backgroundColor: '#0a0a0a',
        color: '#39FF14', // Neon Green
        fontSize: 28,
        fontWeight: '700',
        width: 90,
        height: 70,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#333',
        textAlign: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        width: '100%',
        gap: 16,
    },
    industrialButton: {
        flex: 1,
        height: 50,
        backgroundColor: '#1a1a1a',
        borderRadius: 8,
        borderWidth: 2,
        borderTopColor: '#333',
        borderLeftColor: '#333',
        borderRightColor: '#0d0d0d',
        borderBottomColor: '#0d0d0d',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#888',
        fontWeight: '700',
        fontSize: 12,
        letterSpacing: 1,
    },
    saveText: {
        color: '#39FF14', // Neon Green
    },
});
