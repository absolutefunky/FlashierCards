import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { faChevronLeft, faChevronRight, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

type Flashcard = {
  front: string;
  back: string;
};
type RootStackParamList = {
  Dashboard: undefined;
  Study: undefined;
};

export default function Study() {
  const [cardNum, setCardNum] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const cards: Flashcard[] = [
    { front: "Front of card 1", back: "Back of card 1" },
    { front: "Front of card 2", back: "Back of card 2" },
    { front: "Front of card 3", back: "Back of card 3" },
    { front: "Front of card 4", back: "Back of card 4" },
    { front: "Front of card 5", back: "Back of card 5" },
  ];

  const total = cards.length;

  function flipCard() {
    setIsFlipped((prev) => !prev);
  }

  function showNextCard() {
    if (cardNum + 1 < total) {
      setCardNum((prev) => prev + 1);
      setIsFlipped(false);
    }
  }

  function showPrevCard() {
    if (cardNum - 1 >= 0) {
      setCardNum((prev) => prev - 1);
      setIsFlipped(false);
    }
  }

  return (
    <View style={styles.dashboardContent}>
      <View style={styles.mainSection}>
        <Text style={styles.title}>Flashier Cards</Text>
          <Pressable
            onPress={() =>navigation.navigate("Dashboard")}>
              <FontAwesomeIcon icon={faCircleXmark} size={20} color= "#004A94" />
          </Pressable>
        <View style={styles.deck}>
          <Pressable style={styles.card} onPress={flipCard}>
            <View style={styles.cardInner}>
              <Text style={styles.cardText}>
                {isFlipped ? cards[cardNum].back : cards[cardNum].front}
              </Text>
            </View>
          </Pressable>

          <View style={styles.deckNav}>
            <Pressable
              style={[
                styles.navButton,
                cardNum === 0 && styles.navButtonDisabled,
              ]}
              onPress={showPrevCard}
              disabled={cardNum === 0}
            >
              <FontAwesomeIcon icon={faChevronLeft} size={20} color="white" />
            </Pressable>

            <Text style={styles.counter}>
              {cardNum + 1}/{total}
            </Text>

            <Pressable
              style={[
                styles.navButton,
                cardNum === total - 1 && styles.navButtonDisabled,
              ]}
              onPress={showNextCard}
              disabled={cardNum === total - 1}
            >
              <FontAwesomeIcon icon={faChevronRight} size={20} color="white" />
            </Pressable>

          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dashboardContent: {
    flex: 1,
    backgroundColor: "white",
  },

  mainSection: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 16,
    alignItems: "center",
  },

  title: {
    fontSize: 45,
    fontWeight: "400",
    color: "#004A94",
    textAlign: "center",
    marginBottom: 32,
  },

  deck: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  card: {
    width: 350,
    height: 300,
    backgroundColor: "white",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    shadowColor: "rgba(28, 31, 40, 0.234)",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
    marginBottom: 30,
  },

  cardInner: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  cardText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#004A94",
    textAlign: "center",
  },

  deckNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },

  navButton: {
    backgroundColor: "#004A94",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  navButtonDisabled: {
    backgroundColor: "#9db8d1",
  },

  counter: {
    fontSize: 22,
    fontWeight: "600",
    color: "#004A94",
    minWidth: 70,
    textAlign: "center",
  },
});