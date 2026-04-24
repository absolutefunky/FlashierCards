import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View,Text,StyleSheet,Pressable,Modal,TextInput,FlatList } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleXmark, faPlus, faFolderOpen, faPencil, faICursor, faTrash } from "@fortawesome/free-solid-svg-icons";

type Deck = {
  id: string;
  title: string;
};
type RootStackParamList = {
  Dashboard: undefined;
  Study: undefined;
};

export default function Dashboard() {
  const [toolOptionHidden, setToolOptionHidden] = useState(true);
  const [createOverlay, setCreateOverlay] = useState(false);
  const [renameOverlay, setRenameOverlay] = useState(false);
  const [checkedDeck, setCheckedDeck] = useState<string | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [decks, setDecks] = useState<Deck[]>([
    { id: "deck-1", title: "SENG 645 Exam 1 Review" },
    { id: "deck-2", title: "SENG 645 Exam 2 Review" },
    { id: "deck-3", title: "SENG 645 Exam 3 Review" },
  ]);

  function handleDeckSelect(deckId: string) {
    setCheckedDeck(deckId);
    setToolOptionHidden(false);
  }


  function ToolbarButton({
    icon,
    onPress,
  }: {
    icon: any;
    onPress: () => void;
  }) {
    return (
      <Pressable style={styles.toolOption} onPress={onPress}>
        <View style={styles.shadow} />
        <View style={styles.edge} />
        <View style={styles.front}>
          <FontAwesomeIcon icon={icon} size={20} color="white" />
        </View>
      </Pressable>
    );
  }

  return (
    <View style={styles.dashboardContent}>
      <View style={styles.mainSection}>
        <Text style={styles.title}>Flashier Cards</Text>

        <View style={styles.toolbar}>
          {!toolOptionHidden && (
            <ToolbarButton
              icon={faCircleXmark}
              onPress={() => setToolOptionHidden(true)}
            />
          )}

          <ToolbarButton icon={faPlus} onPress={() => setCreateOverlay(true)} />

          {!toolOptionHidden && (
            <ToolbarButton icon={faFolderOpen} onPress={() => navigation.navigate("Study")} />
          )}

          {!toolOptionHidden && (
            <ToolbarButton icon={faPencil} onPress={() => {}} />
          )}

          {!toolOptionHidden && (
            <ToolbarButton
              icon={faICursor}
              onPress={() => setRenameOverlay(true)}
            />
          )}

          {!toolOptionHidden && (
            <ToolbarButton icon={faTrash} 
            onPress={() => setToolOptionHidden(true)}/>
          )}
        </View>

        <FlatList
          data={decks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.deckList}
          renderItem={({ item }) => {
            const selected = checkedDeck === item.id;

            return (
              <Pressable
                style={[styles.deck, selected && styles.deckSelected]}
                onPress={() => handleDeckSelect(item.id)}
              >
                <Text style={styles.deckText}>{item.title}</Text>
              </Pressable>
            );
          }}
        />
      </View>

      <Modal visible={createOverlay} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.overlay}>
            <Pressable
              style={styles.exitOverlay}
              onPress={() => setCreateOverlay(false)}
            >
              <FontAwesomeIcon icon={faCircleXmark} size={22} color="#004A94" />
            </Pressable>

            <Text style={styles.formHeading}>Create a New Deck</Text>

            <View style={styles.signupForm}>
              <View style={styles.formField}>
                <Text style={styles.subtitle}>Deck Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter deck name"
                />
              </View>

              <Pressable style={styles.homeBtn} >
                <View style={styles.loginShadow} />
                <View style={styles.loginEdge} />
                <View style={styles.loginFront}>
                  <Text style={styles.loginFrontText}>CREATE</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={renameOverlay} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.overlay}>
            <Pressable
              style={styles.exitOverlay}
              onPress={() => setRenameOverlay(false)}
            >
              <FontAwesomeIcon icon={faCircleXmark} size={22} color="#004A94" />
            </Pressable>

            <Text style={styles.formHeading}>Rename the Deck</Text>

            <View style={styles.signupForm}>
              <View style={styles.formField}>
                <Text style={styles.subtitle}>New Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter new name"
                />
              </View>

              <Pressable style={styles.homeBtn} >
                <View style={styles.loginShadow} />
                <View style={styles.loginEdge} />
                <View style={styles.loginFront}>
                  <Text style={styles.loginFrontText}>ENTER</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  dashboardContent: {
    flex: 1,
    position: "relative",
    backgroundColor: "white",
  },

  mainSection: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  title: {
    fontSize: 45,
    fontFamily: "System",
    fontWeight: "400",
    color: "#004A94",
    textAlign: "center",
    marginBottom: 32,
  },

  toolbar: {
    justifyContent: "center",
    marginBottom: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    padding: 16,
    borderRadius: 5,
    backgroundColor: "#D9EDF8",
  },

  toolOption: {
    position: "relative",
    width: 45,
    height: 51,
    backgroundColor: "transparent",
  },

  shadow: {
    position: "absolute",
    top: 6,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.2)",
  },

  edge: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "#296b8e",
  },

  front: {
    position: "absolute",
    top: -6,
    left: 0,
    width: 45,
    height: 45,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#afd6eb",
  },

  deckList: {
    gap: 20,
  },

  deck: {
    backgroundColor: "#D9EDF8",
    borderWidth: 2,
    borderColor: "#D9EDF8",
    width: "100%",
    minHeight: 300,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    shadowColor: "rgba(18, 31, 50, 0.234)",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },

  deckSelected: {
    backgroundColor: "#B3DEF4",
    borderColor: "#B3DEF4",
  },

  deckText: {
    fontSize: 22,
    fontWeight: "600",
    fontFamily: "System",
    color: "#004A94",
    textAlign: "center",
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  overlay: {
    width: 300,
    padding: 24,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#004A94",
    shadowColor: "rgba(0,0,0,0.2)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },

  exitOverlay: {
    alignItems: "flex-end",
    marginBottom: 8,
  },

  formHeading: {
    fontSize: 22,
    fontWeight: "600",
    color: "#004A94",
    marginTop: 8,
    marginBottom: 16,
  },

  subtitle: {
    fontSize: 20,
    fontWeight: "400",
    color: "#004A94",
    marginBottom: 4,
  },

  signupForm: {
    alignItems: "center",
  },

  formField: {
    width: "100%",
    marginBottom: 20,
  },

  input: {
    borderWidth: 2,
    borderColor: "#004A94",
    borderRadius: 5,
    fontSize: 18,
    padding: 10,
    minWidth: 250,
  },

  homeBtn: {
    position: "relative",
    width: 160,
    height: 56,
    backgroundColor: "transparent",
  },

  loginShadow: {
    position: "absolute",
    top: 6,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 5,
    backgroundColor: "rgba(0,0,0,0.2)",
  },

  loginEdge: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#01162b",
  },

  loginFront: {
    position: "absolute",
    top: -6,
    left: 0,
    right: 0,
    minWidth: 160,
    minHeight: 50,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#004A94",
  },

  loginFrontText: {
    fontSize: 20,
    fontWeight: "400",
    color: "white",
  },
});