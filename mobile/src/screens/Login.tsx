import { Button } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
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
        <View style={styles.container}>
            <Text style={styles.title}>Flashier Cards</Text>
            <View>
                <Text style={styles.subtitle}>Email</Text>
                <TextInput
                    textContentType="emailAddress"
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />
            </View>
            <View>
                <Text style={styles.subtitle}>Password</Text>
                <TextInput
                    textContentType="password"
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    style={styles.input}
                />
            </View>
            <Button onPress={() => navigation.navigate("Dashboard")}>Log in</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 45,
        fontFamily: "RampartOne_400Regular",
        fontWeight: "400",
        color: "#004A94",
        textAlign: "center",
        marginBottom: 32
    },
    subtitle: {
        fontSize: 20,
        fontFamily: "Imprima_400Regular",
        fontWeight: "400",
        color: "#004A94",
        textAlign: "center",
        marginBottom: 5
    },
    input: {
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "#004A94",
        borderRadius: 5,
        fontSize: 18,
        padding: 10,
        width: "100%",              
        marginBottom: 16
    }
});
