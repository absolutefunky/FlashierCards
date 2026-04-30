import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";

type StudyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Study">;

export default function DashboardScreen() {
    const navigation = useNavigation<StudyScreenNavigationProp>();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Flashier Cards</Text>
            <View>
                <Text onPress={() => navigation.navigate("Study")}>Deck 1</Text>
            </View>
            <View>
                <Text onPress={() => navigation.navigate("Study")}>Deck 2</Text>
            </View>
            <View>
                <Text onPress={() => navigation.navigate("Study")}>Deck 3</Text>
            </View>
        </View>
    );
}
