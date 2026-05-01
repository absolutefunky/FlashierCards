import { Button } from "@react-navigation/elements";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHouseUser, faPalette, faTrash } from "@fortawesome/free-solid-svg-icons";

type DeleteAccountScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "DeleteAccount">;

export default function DeleteAccountScreen() {
    const navigation = useNavigation<DeleteAccountScreenNavigationProp>();
    const [error, setError] = useState({status: false, message: ""});
    const [loading, setLoading] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Flashier Goodbye</Text>
            <View style={styles.profileNav}>
                <TouchableOpacity
                    style={styles.profileNavButton}
                    onPress={() => navigation.navigate("AccountInformation")}
                >
                    <FontAwesomeIcon icon={faHouseUser} size={40} color="#004A94" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.profileNavButton}
                    onPress={() => navigation.navigate("Theme")}
                >
                    <FontAwesomeIcon icon={faPalette} size={40} color="#004A94" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.profileNavButton}
                    onPress={() => navigation.navigate("DeleteAccount")}
                >
                    <FontAwesomeIcon icon={faTrash} size={40} color="#004A94" />
                </TouchableOpacity>
            </View>
            <View>
                { (loading) ?
                    <Text>Loading request...</Text>
                :
                    (error.status) ?
                        <Text>{error.message}</Text>
                    :
                        <></>
                }
                <Text style={styles.subtitle}>Delete My Account</Text>
                <Text style={styles.profileText}>Are you sure you want to delete your account? This action cannot be undone.</Text>
                <TouchableOpacity
                    style={styles.deleteBtns}
                >
                    <Text style={styles.deleteText}>I am certain!</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deleteBtns}
                >
                    <Text style={styles.deleteText}>Let me think about it...</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        paddingTop: 50,
        paddingLeft: 20,
        paddingRight: 20
    },
    profileNav: {
        flexDirection: "row",
        marginBottom: 25,
        justifyContent: "center",
        gap: 15
    },
    profileNavButton: {
        backgroundColor: "#D9EDF8",
        padding: 10,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "#004A94"
    },
    title: {
        fontSize: 60,
        fontFamily: "RampartOne_400Regular",
        fontWeight: "400",
        color: "#004A94",
        textAlign: "center",
        marginBottom: 25,
    },
    subtitle: {
        fontSize: 25,
        fontFamily: "Imprima_400Regular",
        fontWeight: "700",
        color: "#004A94",
        marginBottom: 5
    },
    profileText: {
        fontSize: 20,
        fontFamily: "Imprima_400Regular",
        fontWeight: "400",
        marginBottom: 20
    },
    deleteBtns: {
        backgroundColor: "#D9EDF8",
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "#004A94"
    },
    deleteText: {
        fontSize: 20,
        fontFamily: "Imprima_400Regular",
        fontWeight: "400"
    }
});
