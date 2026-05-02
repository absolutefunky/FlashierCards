import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouseUser, faPalette, faTrash } from "@fortawesome/free-solid-svg-icons";

type AccountInformationScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "AccountInformation">;

export default function AccountInformationScreen() {
    const navigation = useNavigation<AccountInformationScreenNavigationProp>();
    const [error, setError] = useState({status: false, message: ""});
    const [loading, setLoading] = useState(false);
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Flashier Account</Text>
            <View style={styles.profileNav}>
                <TouchableOpacity
                    style={styles.profileNavButton}
                    onPress={() => navigation.navigate("AccountInformation")}
                >
                   <Text style={styles.profileNavText}>Account</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.profileNavButton}
                    onPress={() => navigation.navigate("Theme")}
                >
                    <Text style={styles.profileNavText}>Theme</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.profileNavButton}
                    onPress={() => navigation.navigate("DeleteAccount")}
                >
                    <Text style={styles.profileNavText}>Delete</Text>
                </TouchableOpacity>
            </View>
            { (loading) ?
                <View>
                    <Text>Loading request...</Text>
                </View>
            :
                (error.status) ?
                    <View>
                        <Text>{error.message}</Text>
                    </View>
                :
                    <View style={styles.mainContent}>
                        <Text style={styles.subtitle}>Email</Text>
                        <Text style={styles.profileText}>Enter email here</Text>
                        <Text style={styles.subtitle}>Date Account Created</Text>
                        <Text style={styles.profileText}>Enter date here</Text>
                        <Text style={styles.subtitle}>Total Number of Decks</Text>
                        <Text style={styles.profileText}>Enter number here</Text>
                    </View>
            }
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
        width: "100%"
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
    }
});
