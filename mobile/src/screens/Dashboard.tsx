import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { RootStackParamList } from "../../App";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { useState } from "react";

type DashboardScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Dashboard">;
type DashboardScreenRouteProp = RouteProp<RootStackParamList, "Dashboard">;

export default function DashboardScreen() {
    const navigation = useNavigation<DashboardScreenNavigationProp>();
    const route = useRoute<DashboardScreenRouteProp>();
    const [decks, setDecks] = useState([{id: "1", title: "SENG 645 Exam 1 Review"}, {id: "2", title: "SENG 645 Exam 2 Review"}, {id: "3", title: "SENG 645 Exam 3 Review"}]);
    
    function fetchDeckData() {
        // get decks associated with user on effect
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Flashier Cards</Text>
            <Text></Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={decks}
                keyExtractor={item => item.id}
                renderItem={({item}) => (                                                               // add prop for deckId here
                    <Pressable key={item.id} style={styles.deck} onPress={() => navigation.navigate("Study", {userId: route.params.userId})}>
                        <Text style={styles.deckText}>{item.title}</Text>
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
    }
});
