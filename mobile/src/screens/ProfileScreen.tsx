import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Profile">;
};

export default function ProfileScreen({ navigation }: Props) {
    const options: { label: string; screen: keyof RootStackParamList }[] = [
        { label: "Account Information", screen: "AccountInformation" },
        { label: "Theme", screen: "Theme" },
        { label: "Change Password", screen: "ChangePassword" },
        { label: "Delete Account", screen: "DeleteAccount" },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Flashier Cards</Text>
            <View style={styles.list}>
                {options.map(opt => (
                    <TouchableOpacity key={opt.screen} style={styles.option} onPress={() => navigation.navigate(opt.screen as any)}>
                        <Text style={styles.optionText}>{opt.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 16, paddingTop: 60 },
    title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 32 },
    list: { gap: 12 },
    option: { padding: 16, borderRadius: 8, borderWidth: 1, borderColor: "#ddd" },
    optionText: { fontSize: 16, color: "#004A94", fontWeight: "500" },
});
