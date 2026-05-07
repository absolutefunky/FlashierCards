import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated, Pressable, TouchableOpacity, Image } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { RootStackParamList } from "../../App";

type CardText = {
  input: string;
  x: number;
  y: number;
  width: number;
  color: string;
  fontSize: number;
};

type CardSticker = {
  url: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

type Card = {
  text: CardText[];
  gif: CardSticker[];
  sticker: CardSticker[];
};

type StudyScreenRouteProp = RouteProp<RootStackParamList, "Study">;

export default function StudyScreen() {
      useEffect(() => {
        async function changeScreenPos() {
            await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.LANDSCAPE
            );
        }

        changeScreenPos();
        fetchCardData();

        return () => {
            ScreenOrientation.unlockAsync();
        };
    }, []);
    
    const route = useRoute<StudyScreenRouteProp>();

    const { userId, deckId } = route.params;

    const [error, setError] = useState({status: false, message: ""});
    const [loading, setLoading] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const flipDisplay = useRef(new Animated.Value(0)).current;
    const [frontCards, setFrontCards] = useState<Card[]>([]);
    const [backCards, setBackCards] = useState<Card[]>([]);
    const [cardNum, setCardNum] = useState(1);
    const [total, setTotal] = useState(0);

    async function fetchCardData() {
    setLoading(true);
    setError({ status: false, message: "" });

    try {
        const deckResponse = await fetch(
        `http://10.0.0.136:5204/users/${userId}/decks/${deckId}`
        );

        const deckData = await deckResponse.json();

        if (!deckResponse.ok) {
        throw new Error(deckData.message || "Failed to load card content.");
        }

        const cardResponse = await fetch(
        `http://10.0.0.136:5204/users/${userId}/decks/${deckId}/cards`
        );

        const cardData = await cardResponse.json();

        if (!cardResponse.ok) {
        throw new Error(cardData.message || "Failed to load cards.");
        }

        setFrontCards(cardData.frontCards || []);
        setBackCards(cardData.backCards || []);
        setTotal(cardData.frontCards?.length || 0);
        } catch (err: any) {
            setError({ status: true, message: err.message });
        } finally {
            setLoading(false);
        }
    }


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

    const currentFrontCard = frontCards[cardNum - 1];
    const currentBackCard = backCards[cardNum - 1];
    return (
        <View style={styles.container}>
            <Pressable onPress={flipCard} style={styles.cardContainer}>
                <Animated.View style={[styles.card, styles.frontCard, flipToFrontStyle]}>
                    {currentFrontCard?.text.map((text, index) => (
                    <Text
                        key={index}
                        style={[
                        styles.cardText,
                        {
                            position: "absolute",
                            left: text.x,
                            top: text.y,
                            width: text.width,
                            color: text.color,
                            fontSize: text.fontSize,
                        },
                        ]}
                    >
                        {text.input}
                    </Text>
                    ))}
                    {currentFrontCard?.sticker.map((sticker, index) => (
                    <Image
                        key={`front-sticker-${index}`}
                        source={{ uri: sticker.url }}
                        style={{
                        position: "absolute",
                        left: sticker.x,
                        top: sticker.y,
                        width: sticker.width,
                        height: sticker.height,
                        }}
                    />
                    ))}
                </Animated.View>
                <Animated.View style={[styles.card, styles.backCard, flipToBackStyle]}>
                    {currentBackCard?.text.map((text, index) => (
                    <Text
                        key={index}
                        style={[
                        styles.cardText,
                        {
                            position: "absolute",
                            left: text.x,
                            top: text.y,
                            width: text.width,
                            color: text.color,
                            fontSize: text.fontSize,
                        },
                        ]}
                    >
                        {text.input}
                    </Text>              
                    ))}
                    {currentBackCard?.sticker.map((sticker, index) => (
                    <Image
                        key={`back-sticker-${index}`}
                        source={{ uri: sticker.url }}
                        style={{
                        position: "absolute",
                        left: sticker.x,
                        top: sticker.y,
                        width: sticker.width,
                        height: sticker.height,
                        }}
                    />
                    ))}
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
        width: "60%",
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