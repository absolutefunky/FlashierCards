import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
};

export default function LoginScreen({ navigation }: Props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Flashier Cards</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Username</Text>
                <TextInput style={styles.input} value={username} onChangeText={setUsername} autoCapitalize="none" />
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
                <TouchableOpacity style={styles.btnBlue} onPress={() => navigation.navigate("Dashboard")}>
                    <Text style={styles.btnText}>Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                    <Text style={styles.link}>Forgot password?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff", padding: 24 },
    title: { fontSize: 28, fontWeight: "bold", marginBottom: 32 },
    form: { width: "100%", gap: 12 },
    label: { fontWeight: "600", marginBottom: 4 },
    input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, fontSize: 16 },
    btnBlue: { backgroundColor: "#004A94", padding: 14, borderRadius: 8, alignItems: "center", marginTop: 8 },
    btnText: { color: "#fff", fontWeight: "600", fontSize: 16 },
    link: { color: "#004A94", textAlign: "center", marginTop: 8 },
});
