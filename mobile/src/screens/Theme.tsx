import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../App";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import type Profile from "../interfaces/Profile";

type ThemeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Theme">;
type ThemeScreenRouteProp = RouteProp<RootStackParamList, "Theme">;

export default function ThemeScreen() {
    const navigation = useNavigation<ThemeScreenNavigationProp>();
    const route = useRoute<ThemeScreenRouteProp>();
    const [profile, setProfile] = useState<Profile>();
    const [error, setError] = useState({status: false, message: ""});
    const [loading, setLoading] = useState(false);
    const FLASHIER_CARDS_API = "http://localhost:5204";

    const fetchProfileData = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${FLASHIER_CARDS_API}/users/${route.params.userId}/profiles`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setProfile(data);
            setLoading(false);
            
        } catch (error: any) {
            setLoading(false);
            setError({status: true, message: error.message});
        }
    };
    
    useEffect(() => {
        fetchProfileData()
    }, []);

    const updateProfileData = async (request: string) => {
        setLoading(true);

        try {
            const response = await fetch(`${FLASHIER_CARDS_API}/users/${route.params.userId}/profiles/${profile?.id}/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({animationType: `${request}`})
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setProfile({...profile!, animationType: data.animationType})
            setLoading(false);

        } catch (error: any) {
            setLoading(false);
            setError({status: true, message: error.message});
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Flashier Theme</Text>
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
                <Text style={styles.subtitle}>Background Animations</Text>
                <Pressable 
                    style={[styles.animationObject, (profile?.animationType === "none") && styles.animationObjectSelected]}
                    onPress={() => updateProfileData("none")}
                >
                    <Text style={styles.animationObjectText}>No Animation</Text>
                </Pressable>
                <Pressable 
                    style={[styles.animationObject, (profile?.animationType === "animationOne") && styles.animationObjectSelected]}
                    onPress={() => updateProfileData("animationOne")}
                >
                    <Text style={styles.animationObjectText}>Animation One</Text>
                </Pressable>
                <Pressable 
                    style={[styles.animationObject, (profile?.animationType === "animationTwo") && styles.animationObjectSelected]}
                    onPress={() => updateProfileData("animationTwo")}
                >
                    <Text style={styles.animationObjectText}>Animation Two</Text>
                </Pressable>
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
        marginBottom: 5
    },
    profileText: {
        fontSize: 20,
        fontFamily: "Imprima_400Regular",
        fontWeight: "400",
        marginBottom: 20
    },
    animationObject: {
        width: "100%",
        height: 150,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#D9EDF8",
        backgroundColor: "#D9EDF8",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        marginBottom: 15
    },
    animationObjectSelected: {
        borderColor: "#004A94"
    },
    animationObjectText: {
        fontSize: 18,
        fontFamily: "Imprima_400Regular",
        fontWeight: "400",
        color: "#004A94"
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