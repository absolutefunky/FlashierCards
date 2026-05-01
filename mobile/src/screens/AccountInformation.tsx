import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
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
                    <View>
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
