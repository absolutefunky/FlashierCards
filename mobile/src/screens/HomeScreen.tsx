import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

export default function HomeScreen({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Flashier Cards</Text>
            <Text style={styles.subtitle}>Study The Flashier Way</Text>
            <TouchableOpacity style={[styles.btn, styles.btnWhite]} onPress={() => navigation.navigate("Signup")}>
                <Text style={styles.btnWhiteText}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnBlue]} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.btnBlueText}>Log in</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff", gap: 16 },
    title: { fontSize: 32, fontWeight: "bold" },
    subtitle: { fontSize: 16, color: "#666", marginBottom: 16 },
    btn: { width: 220, paddingVertical: 14, borderRadius: 8, alignItems: "center" },
    btnBlue: { backgroundColor: "#004A94" },
    btnBlueText: { color: "#fff", fontWeight: "600" },
    btnWhite: { backgroundColor: "#fff", borderWidth: 2, borderColor: "#004A94" },
    btnWhiteText: { color: "#004A94", fontWeight: "600" },
});
