import { Button } from "@react-navigation/elements";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHouseUser, faPalette, faTrash } from "@fortawesome/free-solid-svg-icons";

type ThemeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Theme">;

export default function ThemeScreen() {
    const navigation = useNavigation<ThemeScreenNavigationProp>();
    const [error, setError] = useState({status: false, message: ""});
    const [loading, setLoading] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Flashier Theme</Text>
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
                <Text style={styles.subtitle}>Background Animations</Text>
                <Pressable><Text>No Animation</Text></Pressable>
                <Pressable><Text>Animation One</Text></Pressable>
                <Pressable><Text>Animation Two</Text></Pressable>
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
