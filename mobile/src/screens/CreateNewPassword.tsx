import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { VITE_API_URL } from "@env";
import { RootStackParamList } from "../../App";

type CreateNewPasswordScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "CreateNewPassword">;
type CreateNewPasswordScreenRouteProp = RouteProp<RootStackParamList, "CreateNewPassword">;

export default function CreateNewPasswordScreen() {
    const navigation = useNavigation<CreateNewPasswordScreenNavigationProp>();
    const route = useRoute<CreateNewPasswordScreenRouteProp>();
    const { userId } = route.params;

    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [error, setError] = useState({ status: false, message: "" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        setError({ status: false, message: "" });

        try {
            const response = await fetch(`${VITE_API_URL}/users/${userId}/createNewPassword`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newPassword, confirmNewPassword })
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message);

            setLoading(false);
            navigation.navigate("Dashboard", { userId });

        } catch (err: any) {
            setLoading(false);
            setError({ status: true, message: err.message });
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <Text style={styles.title}>Flashier Cards</Text>
            {loading ? (
                <Text style={styles.message}>Loading request...</Text>
            ) : error.status ? (
                <Text style={styles.message}>{error.message}</Text>
            ) : <></>}
            <View style={styles.formField}>
                <Text style={styles.subtitle}>New password</Text>
                <TextInput
                    textContentType="newPassword"
                    placeholder="Enter new password..."
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry={true}
                    style={styles.input}
                />
            </View>
            <View style={styles.formField}>
                <Text style={styles.subtitle}>Confirm new password</Text>
                <TextInput
                    textContentType="newPassword"
                    placeholder="Confirm new password..."
                    value={confirmNewPassword}
                    onChangeText={setConfirmNewPassword}
                    secureTextEntry={true}
                    style={styles.input}
                />
            </View>
            <Pressable style={styles.homeBtn} onPress={handleSubmit}>
                <View style={styles.loginShadow} />
                <View style={styles.loginEdge} />
                <View style={styles.loginFront}>
                    <Text style={styles.loginFrontText}>Create password</Text>
                </View>
            </Pressable>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        padding: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 65,
        fontFamily: "RampartOne_400Regular",
        fontWeight: "400",
        color: "#004A94",
        textAlign: "center",
        marginBottom: 20,
    },
    formField: {
        width: "100%",
        marginBottom: 15
    },
    subtitle: {
        fontSize: 20,
        fontFamily: "Imprima_400Regular",
        fontWeight: "700",
        color: "#004A94",
        marginBottom: 2
    },
    input: {
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "#004A94",
        borderRadius: 5,
        fontSize: 16,
        padding: 12,
        width: "100%",
    },
    homeBtn: {
        position: "relative",
        backgroundColor: "transparent",
        width: 200,
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
        width: 200,
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