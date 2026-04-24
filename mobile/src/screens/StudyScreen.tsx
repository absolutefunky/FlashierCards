import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { useRef, useState } from "react";

export default function StudyScreen() {
    const [cardIndex, setCardIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const flipAnim = useRef(new Animated.Value(0)).current;
    const total = 5;

    function flipCard() {
        Animated.timing(flipAnim, {
            toValue: flipped ? 0 : 1,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setFlipped(prev => !prev));
    }

    const frontRotate = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] });
    const backRotate = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ["180deg", "360deg"] });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Flashier Cards</Text>

            <View style={styles.cardNav}>
                <TouchableOpacity disabled={cardIndex === 0} onPress={() => setCardIndex(i => i - 1)}>
                    <Text style={[styles.navBtn, cardIndex === 0 && styles.navBtnDisabled]}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.counter}>{cardIndex + 1}/{total}</Text>
                <TouchableOpacity disabled={cardIndex === total - 1} onPress={() => setCardIndex(i => i + 1)}>
                    <Text style={[styles.navBtn, cardIndex === total - 1 && styles.navBtnDisabled]}>›</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={flipCard} activeOpacity={0.9}>
                <Animated.View style={[styles.card, { transform: [{ rotateY: frontRotate }] }, !flipped ? {} : { position: "absolute" }]}>
                    <Text style={styles.cardLabel}>Front of card {cardIndex + 1}</Text>
                </Animated.View>
                <Animated.View style={[styles.card, styles.cardBack, { transform: [{ rotateY: backRotate }] }, flipped ? {} : { position: "absolute" }]}>
                    <Text style={styles.cardLabel}>Back of card {cardIndex + 1}</Text>
                </Animated.View>
            </TouchableOpacity>

            <Text style={styles.hint}>Tap card to flip</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", alignItems: "center", padding: 16, paddingTop: 60 },
    title: { fontSize: 28, fontWeight: "bold", marginBottom: 32 },
    cardNav: { flexDirection: "row", alignItems: "center", gap: 24, marginBottom: 24 },
    navBtn: { fontSize: 36, color: "#004A94" },
    navBtnDisabled: { color: "#ccc" },
    counter: { fontSize: 18, fontWeight: "600" },
    card: { width: 320, height: 200, backgroundColor: "#e8f0fb", borderRadius: 12, alignItems: "center", justifyContent: "center", backfaceVisibility: "hidden" },
    cardBack: { backgroundColor: "#004A94" },
    cardLabel: { fontSize: 18, fontWeight: "600", color: "#333" },
    hint: { marginTop: 16, color: "#999" },
});
