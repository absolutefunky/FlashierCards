import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { RootStackParamList } from "../../App";

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

export default function LoginScreen() {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin() {
        console.log(email);
        console.log(password);
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <Text style={styles.title}>Flashier Cards</Text>
            <View style={styles.formField}>
                <Text style={styles.subtitle}>Email</Text>
                <TextInput
                    textContentType="emailAddress"
                    placeholder="Enter your email..."
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />
            </View>
            <View style={styles.formField}>
            <Text style={styles.subtitle}>Password</Text>
                <TextInput
                    textContentType="password"
                    placeholder="Enter your password..."
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    style={styles.input}
                />
            </View>
            <Pressable style={styles.homeBtn} onPress={() => navigation.navigate("Dashboard")}>
                <View style={styles.loginShadow} />
                <View style={styles.loginEdge} />
                <View style={styles.loginFront}>
                    <Text style={styles.loginFrontText}>Log in!</Text>
                </View>
            </Pressable>
            <Pressable style={styles.homeBtn} onPress={() => navigation.navigate("ForgotPassword")}>
                <View style={styles.signupShadow} />
                <View style={styles.signupEdge} />
                <View style={styles.signupFront}>
                    <Text style={styles.signupFrontText}>Forgot password?</Text>
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
        width: 200,
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
