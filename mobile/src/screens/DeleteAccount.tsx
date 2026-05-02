import { Button } from "@react-navigation/elements";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
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
            <View style={styles.mainContent}>
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
                <View style={styles.deleteBtns}>
                    <Pressable style={styles.homeBtn} onPress={() => navigation.navigate("Login")}>
                        <View style={styles.signupShadow} />
                        <View style={styles.signupEdge} />
                        <View style={styles.signupFront}>
                            <Text style={styles.signupFrontText}>I am certain!</Text>
                        </View>
                    </Pressable> 
                    <Pressable style={styles.homeBtn} onPress={() => navigation.navigate("Dashboard")}>
                        <View style={styles.loginShadow} />
                        <View style={styles.loginEdge} />
                        <View style={styles.loginFront}>
                            <Text style={styles.loginFrontText}>Let me think about it...</Text>
                        </View>
                    </Pressable>
                </View>
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
    mainContent: {
        width: "100%"
    },
    title: {
        fontSize: 37,
        fontFamily: "RampartOne_400Regular",
        fontWeight: "400",
        color: "#004A94",
        textAlign: "center",
        marginBottom: 20
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
    deleteBtns: {
        alignItems: "center"
    },
    homeBtn: {
        position: "relative",
        backgroundColor: "transparent",
        width: 250,
        height: 56,
        marginTop: 15
    },
    loginShadow: {
        position: "absolute",
        top: 6,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 5,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    loginEdge: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 50,
        borderRadius: 5,
        backgroundColor: "#01162b",
    },
    loginFront: {
        position: "absolute",
        top: -6,
        left: 0,
        right: 0,
        width: 250,
        height: 50,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#004A94"
    },
    loginFrontText: {
        fontSize: 20,
        fontWeight: "400",
        color: "white",
        fontFamily: "Imprima_400Regular"
    },
    signupShadow: {
        position: "absolute",
        top: 6,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 5,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
    signupEdge: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 50,
        borderRadius: 5,
        backgroundColor: "#afd6eb",
    },
    signupFront: {
        position: "absolute",
        top: -6,
        left: 0,
        right: 0,
        width: 250,
        height: 50,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D9EDF8",
    },
    signupFrontText: {
        fontSize: 20,
        fontWeight: "400",
        color: "#004A94",
        fontFamily: "Imprima_400Regular"
    }
});
