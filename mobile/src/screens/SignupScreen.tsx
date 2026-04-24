import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Signup">;
};

export default function SignupScreen({ navigation }: Props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Join Flashier Cards</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Username</Text>
                <TextInput style={styles.input} value={username} onChangeText={setUsername} autoCapitalize="none" />
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                <TouchableOpacity style={styles.btnBlue} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.btnText}>Create account</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff", padding: 24 },
    title: { fontSize: 28, fontWeight: "bold", marginBottom: 32 },
    form: { width: "100%", gap: 12 },
    label: { fontWeight: "600", marginBottom: 4 },
    input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, fontSize: 16 },
    btnBlue: { backgroundColor: "#004A94", padding: 14, borderRadius: 8, alignItems: "center", marginTop: 8 },
    btnText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
