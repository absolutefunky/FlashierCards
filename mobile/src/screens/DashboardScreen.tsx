import { View, Text, TouchableOpacity, FlatList, TextInput, Modal, StyleSheet } from "react-native";
import { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Dashboard">;
};

type Deck = { id: string; name: string };

export default function DashboardScreen({ navigation }: Props) {
    const [decks, setDecks] = useState<Deck[]>([
        { id: "1", name: "SENG 645 Exam 1 Review" },
        { id: "2", name: "SENG 645 Exam 2 Review" },
        { id: "3", name: "SENG 645 Exam 3 Review" },
    ]);
    const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
    const [createVisible, setCreateVisible] = useState(false);
    const [renameVisible, setRenameVisible] = useState(false);
    const [deckName, setDeckName] = useState("");

    function createDeck() {
        if (!deckName.trim()) return;
        setDecks(prev => [...prev, { id: Date.now().toString(), name: deckName.trim() }]);
        setDeckName("");
        setCreateVisible(false);
    }

    function renameDeck() {
        if (!deckName.trim() || !selectedDeck) return;
        setDecks(prev => prev.map(d => d.id === selectedDeck.id ? { ...d, name: deckName.trim() } : d));
        setDeckName("");
        setRenameVisible(false);
    }

    function deleteDeck() {
        if (!selectedDeck) return;
        setDecks(prev => prev.filter(d => d.id !== selectedDeck.id));
        setSelectedDeck(null);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Flashier Cards</Text>

            <View style={styles.toolbar}>
                <TouchableOpacity style={styles.toolBtn} onPress={() => setCreateVisible(true)}>
                    <FontAwesome5 name="plus" size={16} color="#fff" />
                </TouchableOpacity>
                {selectedDeck && (<>
                    <TouchableOpacity style={styles.toolBtn} onPress={() => navigation.navigate("Study")}>
                        <FontAwesome5 name="folder-open" size={16} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toolBtn} onPress={() => navigation.navigate("Edit")}>
                        <FontAwesome5 name="pencil-alt" size={16} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toolBtn} onPress={() => { setDeckName(selectedDeck.name); setRenameVisible(true); }}>
                        <FontAwesome5 name="i-cursor" size={16} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.toolBtn, styles.toolBtnRed]} onPress={deleteDeck}>
                        <FontAwesome5 name="trash" size={16} color="#fff" />
                    </TouchableOpacity>
                </>)}
            </View>

            <FlatList
                data={decks}
                keyExtractor={item => item.id}
                style={styles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.deckItem, selectedDeck?.id === item.id && styles.deckItemSelected]}
                        onPress={() => setSelectedDeck(prev => prev?.id === item.id ? null : item)}
                    >
                        <Text style={styles.deckText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />

            {/* Create Deck Modal */}
            <Modal visible={createVisible} transparent animationType="fade">
                <View style={styles.overlay}>
                    <TouchableOpacity style={styles.closeBtn} onPress={() => setCreateVisible(false)}>
                        <FontAwesome5 name="times-circle" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Create a New Deck</Text>
                    <TextInput style={styles.input} value={deckName} onChangeText={setDeckName} placeholder="Deck name" />
                    <TouchableOpacity style={styles.btnBlue} onPress={createDeck}>
                        <Text style={styles.btnText}>CREATE</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Rename Deck Modal */}
            <Modal visible={renameVisible} transparent animationType="fade">
                <View style={styles.overlay}>
                    <TouchableOpacity style={styles.closeBtn} onPress={() => setRenameVisible(false)}>
                        <FontAwesome5 name="times-circle" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Rename the Deck</Text>
                    <TextInput style={styles.input} value={deckName} onChangeText={setDeckName} placeholder="New name" />
                    <TouchableOpacity style={styles.btnBlue} onPress={renameDeck}>
                        <Text style={styles.btnText}>ENTER</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 16, paddingTop: 60 },
    title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 24 },
    toolbar: { flexDirection: "row", gap: 10, marginBottom: 16, flexWrap: "wrap" },
    toolBtn: { backgroundColor: "#004A94", padding: 10, borderRadius: 8 },
    toolBtnRed: { backgroundColor: "#c0392b" },
    list: { flex: 1 },
    deckItem: { padding: 16, borderRadius: 8, borderWidth: 1, borderColor: "#ddd", marginBottom: 10 },
    deckItemSelected: { borderColor: "#004A94", backgroundColor: "#e8f0fb" },
    deckText: { fontSize: 16 },
    overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", alignItems: "center", justifyContent: "center", gap: 16, padding: 32 },
    closeBtn: { alignSelf: "flex-end" },
    modalTitle: { fontSize: 20, fontWeight: "bold", color: "#fff" },
    input: { width: "100%", backgroundColor: "#fff", borderRadius: 8, padding: 12, fontSize: 16 },
    btnBlue: { backgroundColor: "#004A94", padding: 14, borderRadius: 8, alignItems: "center", width: "100%" },
    btnText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
