import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { RootStackParamList } from "../../App";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useState, useEffect } from "react";

type DashboardScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Dashboard">;
type DashboardScreenRouteProp = RouteProp<RootStackParamList, "Dashboard">;

type Deck = {
  id: number;
  name: string;
};


export default function DashboardScreen() {
    const navigation = useNavigation<DashboardScreenNavigationProp>();
    const route = useRoute<DashboardScreenRouteProp>();
    const userId = route.params.userId;
    const [decks, setDecks] = useState<Deck[]>([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    useEffect(() => {
    ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
      fetchDeckData();
  }, []);
    
    async function fetchDeckData() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`http://10.0.0.136:5204/users/${userId}/decks`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load decks.");
        }

        setDecks(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Flashier Cards</Text>
              {loading && <Text style={styles.message}>Loading...</Text>}
              {error !== "" && <Text style={styles.error}>{error}</Text>}
            <Text></Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={decks}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (                                                               // add prop for deckId here
                    <Pressable key={item.id} style={styles.deck} onPress={() => navigation.navigate("Study", {userId: route.params.userId, deckId: item.id})}>
                        <Text style={styles.deckText}>{item.name}</Text>
                    </Pressable>
                )}
            />
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
    deck: {
        backgroundColor: "#D9EDF8",
        borderColor: "#004A94",
        borderWidth: 2,
        minWidth: "100%",
        height: 200,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        marginBottom: 20
    },
    deckText: {
        textAlign: "center",
        fontSize: 20,
        fontFamily: "Imprima_400Regular",
        fontWeight: "700",
        color: "#004A94"
    },
    message: {
    color: "#004A94",
    marginBottom: 10,
    },
    error: {
      color: "#004A94",
      marginBottom: 10,
      textAlign: "center",
    },
});