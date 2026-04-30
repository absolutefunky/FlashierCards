import { Button } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { View, Text, TextInput } from "react-native";
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Flashier Cards</Text>
            <View>
                <Text>Email</Text>
                <TextInput
                    textContentType="emailAddress"
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <View>
                <Text>Password</Text>
                <TextInput
                    textContentType="password"
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
            </View>
            <Button onPress={() => navigation.navigate("Dashboard")}>Log in</Button>
        </View>
    );
}
