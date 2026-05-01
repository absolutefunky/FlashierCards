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
    }
});
