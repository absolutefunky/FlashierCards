import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, Pressable, TouchableOpacity } from "react-native";

export default function StudyScreen() {
    const [error, setError] = useState({status: false, message: ""});
    const [loading, setLoading] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const flipDisplay = useRef(new Animated.Value(0)).current;
    const [cardNum, setCardNum] = useState(1);
    const total = 5;

    const frontRotate = flipDisplay.interpolate({
        inputRange: [0, 180],
        outputRange: ["0deg", "180deg"],
    });

    const flipToFrontStyle = {
        transform: [{ rotateY: frontRotate }]
    };

    const backRotate = flipDisplay.interpolate({
        inputRange: [0, 180],
        outputRange: ["180deg", "360deg"],
    });

    const flipToBackStyle = {
        transform: [{ rotateY: backRotate }]
    };

    function flipCard() {
        if (isFlipped) {
            Animated.spring(flipDisplay, {
                toValue: 0,
                friction: 8,
                tension: 10,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.spring(flipDisplay, {
                toValue: 180,
                friction: 8,
                tension: 10,
                useNativeDriver: true,
            }).start();
        }
        setIsFlipped((prev) => !prev);
    }

    function resetFlip() {
        flipDisplay.setValue(0);
        setIsFlipped(false);
    }

    function showNextCard() {
        if ((cardNum + 1) <= total) {
            setCardNum(cardNum + 1);
            resetFlip();
        }
    }

    function showPrevCard() {
        if ((cardNum - 1) >= 1) {
            setCardNum(cardNum - 1);
            resetFlip();
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Flashier Cards</Text>
            <Pressable onPress={flipCard} style={styles.cardContainer}>
                <Animated.View style={[styles.card, styles.frontCard, flipToFrontStyle]}>
                    <Text style={styles.cardText}>Front of card {cardNum}</Text>
                </Animated.View>
                <Animated.View style={[styles.card, styles.backCard, flipToBackStyle]}>
                    <Text style={styles.cardText}>Back of card {cardNum}</Text>
                </Animated.View>
            </Pressable>
            <View style={styles.deckNav}>
                <TouchableOpacity
                    style={[styles.navButton, cardNum === 1 && styles.navButtonDisabled]}
                    onPress={showPrevCard}
                    disabled={cardNum === 1}
                >
                    <FontAwesomeIcon icon={faChevronLeft} size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.counter}>{cardNum}/{total}</Text>
                <TouchableOpacity
                    style={[styles.navButton, cardNum === total && styles.navButtonDisabled]}
                    onPress={showNextCard}
                    disabled={cardNum === total}
                >
                    <FontAwesomeIcon icon={faChevronRight} size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        padding: 20
    },
    title: {
        fontSize: 44,
        fontFamily: "RampartOne_400Regular",
        fontWeight: "400",
        color: "#004A94",
        textAlign: "center",
        marginBottom: 20
    },
    cardContainer: {
        width: "100%",
        height: 240,
        marginBottom: 20
    },
    card: {
        width: "100%",
        height: 240,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#004A94",
        position: "absolute",
        backfaceVisibility: "hidden"
    },
    frontCard: {
        backgroundColor: "white"
    },
    backCard: {
        backgroundColor: "white"
    },
    cardText: {
        fontSize: 20,
        fontWeight: "400",
        color: "#004A94",
        textAlign: "center"
    },
    deckNav: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 20
    },
    navButton: {
        backgroundColor: "#004A94",
        width: 45,
        height: 45,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    navButtonDisabled: {
        backgroundColor: "#9db8d1"
    },
    counter: {
        fontSize: 20,
        fontWeight: "400",
        color: "#004A94",
        textAlign: "center"
    }
});
