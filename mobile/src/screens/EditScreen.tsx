import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from "react-native";
import { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

type TextBlock = {
    id: number;
    input: string;
    bold: boolean;
    italic: boolean;
    color: string;
};

export default function EditScreen() {
    const [cardIndex, setCardIndex] = useState(0);
    const [showFront, setShowFront] = useState(true);
    const [textTool, setTextTool] = useState(false);
    const [textBlocks, setTextBlocks] = useState<TextBlock[]>([]);
    const [activeId, setActiveId] = useState<number | null>(null);
    const total = 5;

    const activeBlock = textBlocks.find(b => b.id === activeId);

    function addTextBlock() {
        const newBlock: TextBlock = { id: Date.now(), input: "", bold: false, italic: false, color: "#000" };
        setTextBlocks(prev => [...prev, newBlock]);
        setActiveId(newBlock.id);
        setTextTool(true);
    }

    function updateBlock(id: number, changes: Partial<TextBlock>) {
        setTextBlocks(prev => prev.map(b => b.id === id ? { ...b, ...changes } : b));
    }

    function deleteActiveBlock() {
        setTextBlocks(prev => prev.filter(b => b.id !== activeId));
        setActiveId(null);
        setTextTool(false);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Flashier Cards</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.toolbar} contentContainerStyle={styles.toolbarContent}>
                <TouchableOpacity style={styles.toolBtn} onPress={deleteActiveBlock}>
                    <FontAwesome5 name="times-circle" size={16} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.toolBtn} onPress={addTextBlock}>
                    <FontAwesome5 name="font" size={16} color="#fff" />
                </TouchableOpacity>
                {textTool && activeBlock && (<>
                    <TouchableOpacity style={[styles.toolBtn, activeBlock.bold && styles.toolBtnActive]} onPress={() => updateBlock(activeId!, { bold: !activeBlock.bold })}>
                        <FontAwesome5 name="bold" size={16} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.toolBtn, activeBlock.italic && styles.toolBtnActive]} onPress={() => updateBlock(activeId!, { italic: !activeBlock.italic })}>
                        <FontAwesome5 name="italic" size={16} color="#fff" />
                    </TouchableOpacity>
                </>)}
                <TouchableOpacity style={styles.toolBtn}>
                    <FontAwesome5 name="paint-brush" size={16} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.toolBtn}>
                    <FontAwesome5 name="image" size={16} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.toolBtn}>
                    <FontAwesome5 name="heart" size={16} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.toolBtn, styles.toolBtnRed]} onPress={deleteActiveBlock}>
                    <FontAwesome5 name="trash" size={16} color="#fff" />
                </TouchableOpacity>
            </ScrollView>

            <View style={styles.cardNav}>
                <TouchableOpacity disabled={cardIndex === 0} onPress={() => setCardIndex(i => i - 1)}>
                    <Text style={[styles.navBtn, cardIndex === 0 && styles.navBtnDisabled]}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.counter}>{cardIndex + 1}/{total}</Text>
                <TouchableOpacity disabled={cardIndex === total - 1} onPress={() => setCardIndex(i => i + 1)}>
                    <Text style={[styles.navBtn, cardIndex === total - 1 && styles.navBtnDisabled]}>›</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => setShowFront(p => !p)} style={styles.flipToggle}>
                <Text style={styles.flipToggleText}>{showFront ? "Front" : "Back"} — tap to flip</Text>
            </TouchableOpacity>

            <View style={styles.card}>
                {textBlocks.map(block => (
                    <TouchableOpacity key={block.id} onPress={() => { setActiveId(block.id); setTextTool(true); }} style={[styles.textBlock, activeId === block.id && styles.textBlockActive]}>
                        <TextInput
                            style={[styles.textInput, block.bold && { fontWeight: "bold" }, block.italic && { fontStyle: "italic" }]}
                            value={block.input}
                            onChangeText={text => updateBlock(block.id, { input: text })}
                            onFocus={() => { setActiveId(block.id); setTextTool(true); }}
                            placeholder="Type here!"
                            multiline
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 16, paddingTop: 60 },
    title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 12 },
    toolbar: { maxHeight: 52, marginBottom: 12 },
    toolbarContent: { flexDirection: "row", gap: 8, alignItems: "center" },
    toolBtn: { backgroundColor: "#004A94", padding: 10, borderRadius: 8 },
    toolBtnActive: { backgroundColor: "#0066cc" },
    toolBtnRed: { backgroundColor: "#c0392b" },
    cardNav: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 24, marginBottom: 8 },
    navBtn: { fontSize: 32, color: "#004A94" },
    navBtnDisabled: { color: "#ccc" },
    counter: { fontSize: 16, fontWeight: "600" },
    flipToggle: { alignItems: "center", marginBottom: 8 },
    flipToggleText: { color: "#004A94", fontWeight: "600" },
    card: { flex: 1, backgroundColor: "#f0f4ff", borderRadius: 12, padding: 16, minHeight: 300 },
    textBlock: { borderWidth: 2, borderColor: "transparent", borderRadius: 4, marginBottom: 8 },
    textBlockActive: { borderColor: "#004A94" },
    textInput: { fontSize: 16, minHeight: 40, padding: 8 },
});
