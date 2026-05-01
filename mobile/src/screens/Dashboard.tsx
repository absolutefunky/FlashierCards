import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, Pressable } from "react-native";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";

type DashboardScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Dashboard">;

export default function DashboardScreen() {
    const navigation = useNavigation<DashboardScreenNavigationProp>();
    const decks = ["Deck 1", "Deck 2", "Deck 3"];

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Flashier Cards</Text>
            {
                decks.map((deck, index) => (
                    <Pressable key={index} onPress={() => navigation.navigate("Study")}>
                        <Text>{deck}</Text>
                    </Pressable>
                ))
            }
            <Pressable onPress={() => navigation.navigate("AccountInformation")}><Text>Profile</Text></Pressable>
        </View>
    );
}
