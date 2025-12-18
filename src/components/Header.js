import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing } from 'react-native';

const Header = () => {
    const [taps, setTaps] = useState(0);
    const [message, setMessage] = useState(null);
    const scaleY = useRef(new Animated.Value(1)).current; // Animation value

    const messages = [
        "WHY are you pressing me?",
        "THIS really does nothing, you know?",
        "DON'T you have a level to check?",
        "STOP it, that tickles!",
        "ARE you bored?",
        "GO level something!",
        "WHERE'S your level?",
        "KEEP going, I'm sure nothing will happen",
        "I'M a teapot",
        "MAYBE if you press me enough times. The BlackJack minigame will start",
        "REMEMBER to drink enough water",
        "HELLO there!",
        "MADE IN Argentina"
    ];

    const animateTransition = (callback) => {
        // Sequence: Squish -> Callback (State Change) -> Expand
        Animated.sequence([
            Animated.timing(scaleY, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
                easing: Easing.ease,
            }),
            Animated.delay(50), // Tiny pause while invisible
        ]).start(() => {
            callback();
            Animated.timing(scaleY, {
                toValue: 1,
                duration: 200, // Slightly slower expansion for elastic feel
                useNativeDriver: true,
                easing: Easing.elastic(1.2), // Bouncy expand
            }).start();
        });
    };

    const handlePress = () => {
        if (message) return; // Ignore taps while message is showing

        const newTaps = taps + 1;
        if (newTaps >= 5) {
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];

            // Trigger entrance animation
            animateTransition(() => {
                setMessage(randomMessage);
                setTaps(0);
            });

            // Auto-revert after 5 seconds
            setTimeout(() => {
                animateTransition(() => {
                    setMessage(null);
                });
            }, 5000);

        } else {
            setTaps(newTaps);
        }
    };

    // Helper to render dual-style text
    const renderStyledText = (text) => {
        const [firstWord, ...rest] = text.split(' ');
        // Adjust font size for longer messages to fit
        const isLong = text.length > 25;
        const size = isLong ? 16 : 24;
        const lineHeight = isLong ? 20 : 32;

        return (
            <Text style={{ textAlign: 'center', flexWrap: 'wrap' }}>
                <Text style={[styles.headerTitle, { fontSize: size, lineHeight }]}>
                    {firstWord}{' '}
                </Text>
                <Text style={[styles.headerSubtitle, { fontSize: size, lineHeight }]}>
                    {rest.join(' ')}
                </Text>
            </Text>
        );
    };

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={handlePress}
        >
            <Animated.View style={[styles.headerContainer, { transform: [{ scaleY }] }]}>
                {/* Decorative Screws */}
                <View style={[styles.screw, styles.screwTL]} />
                <View style={[styles.screw, styles.screwTR]} />
                <View style={[styles.screw, styles.screwBL]} />
                <View style={[styles.screw, styles.screwBR]} />

                {message ? (
                    renderStyledText(message)
                ) : (
                    <View style={styles.headerInner}>
                        <Text style={styles.headerTitle}>RED</Text>
                        <Text style={styles.headerSubtitle}>LEVELER</Text>
                    </View>
                )}
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        minWidth: 280,
        maxWidth: '95%',
        backgroundColor: '#151515',
        borderWidth: 2,
        borderColor: '#333',
        borderRadius: 8,
        padding: 15,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    headerInner: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 8,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: '#e00', // Deep industrial red
        letterSpacing: 2,
        fontStyle: 'italic',
    },
    headerSubtitle: {
        fontSize: 28,
        fontWeight: '300',
        color: '#ccc',
        letterSpacing: 4,
    },
    screw: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#2a2a2a',
        borderWidth: 1,
        borderColor: '#444',
        position: 'absolute',
    },
    screwTL: { top: 6, left: 6 },
    screwTR: { top: 6, right: 6 },
    screwBL: { bottom: 6, left: 6 },
    screwBR: { bottom: 6, right: 6 },
});

export default Header;
