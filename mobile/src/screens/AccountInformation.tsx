import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../App";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import type UserModel from "../interfaces/User";

type AccountInformationScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "AccountInformation">;
type AccountInformationScreenRouteProp = RouteProp<RootStackParamList, "AccountInformation">;

export default function AccountInformationScreen() {
    const navigation = useNavigation<AccountInformationScreenNavigationProp>();
    const route = useRoute<AccountInformationScreenRouteProp>();
    const [error, setError] = useState({status: false, message: ""});
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<UserModel>();
    const [totalDecks, setTotalDecks] = useState();
    const FLASHIER_CARDS_API = "add flashier cards backend url here";

    const fetchUserData = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${FLASHIER_CARDS_API}/users/${route.params.userId}`);

            // get message and user data
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setUser(data);

            // get list of decks to count
            const deckResponse = await fetch(`${FLASHIER_CARDS_API}/users/${route.params.userId}/decks`);

            // get message and deck data
            const deckData = await deckResponse.json();

            if (!deckResponse.ok) {
                throw new Error(deckData.message);
            }

            setTotalDecks(deckData.length);
            setLoading(false);
            
        } catch (error: any) {
            setLoading(false);
            setError({status: true, message: error.message});
        }
    };

    useEffect(() => {
        fetchUserData()
    }, []);
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Flashier Account</Text>
            <View style={styles.profileNav}>
                <TouchableOpacity
                    style={styles.profileNavButton}
                    onPress={() => navigation.navigate("AccountInformation", {userId: route.params.userId})}
                >
                   <Text style={styles.profileNavText}>Account</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.profileNavButton}
                    onPress={() => navigation.navigate("Theme", {userId: route.params.userId})}
                >
                    <Text style={styles.profileNavText}>Theme</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.profileNavButton}
                    onPress={() => navigation.navigate("DeleteAccount", {userId: route.params.userId})}
                >
                    <Text style={styles.profileNavText}>Delete</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.mainContent}>
                { (loading) ?
                    <Text style={styles.message}>Loading request...</Text>
                :
                    (error.status) ?
                        <Text style={styles.message}>{error.message}</Text>
                    :
                        <></>
                }
                <Text style={styles.subtitle}>Email</Text>
                <Text style={styles.profileText}>{user?.email}</Text>
                <Text style={styles.subtitle}>Date Account Created</Text>
                <Text style={styles.profileText}>{user?.dateAccountCreated}</Text>
                <Text style={styles.subtitle}>Total Number of Decks</Text>
                <Text style={styles.profileText}>{totalDecks}</Text>
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
    profileNav: {
        flexDirection: "row",
        marginBottom: 20,
        justifyContent: "center",
        gap: 15,
    },
    profileNavButton: {
        backgroundColor: "#004A94",
        padding: 10,
        borderRadius: 10,
        width: 100,
        alignItems: "center"
    },
    profileNavText: {
        fontSize: 20,
        fontFamily: "Imprima_400Regular",
        fontWeight: "400",
        color: "white"
    },
    title: {
        fontSize: 37,
        fontFamily: "RampartOne_400Regular",
        fontWeight: "400",
        color: "#004A94",
        textAlign: "center",
        marginBottom: 20
    },
    mainContent: {
        width: "100%",
        flexDirection: "column"
    },
    subtitle: {
        fontSize: 20,
        fontFamily: "Imprima_400Regular",
        fontWeight: "700",
        color: "#004A94",
        marginBottom: 2
    },
    profileText: {
        fontSize: 20,
        fontFamily: "Imprima_400Regular",
        fontWeight: "400",
        marginBottom: 20
    },
    message: {
        fontSize: 18,
        fontWeight: "400",
        color: "#004A94",
        fontFamily: "Imprima_400Regular",
        backgroundColor: "#D9EDF8",
        padding: 12,
        borderRadius: 5,
        marginBottom: 20
    }
});
