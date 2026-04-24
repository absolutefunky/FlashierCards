import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";
import { View,Text,StyleSheet,Pressable,Modal,TextInput,FlatList } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFonts, Imprima_400Regular } from "@expo-google-fonts/imprima";
import { RampartOne_400Regular } from "@expo-google-fonts/rampart-one";

type RootStackParamList = {
  Dashboard: undefined;
  Study: undefined;
  Login: undefined;
};

export default function Login () {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [fontsLoaded] = useFonts({
        Imprima_400Regular,
        RampartOne_400Regular,
    });

    if (!fontsLoaded) {
        return null; 
    }
    
    return (
    <View style={styles.loginContent}>
        <View style={styles.mainSection}>
            <Text style={styles.title}>Flashier Cards</Text> 
            <View style={styles.formField}>
                <Text style={styles.subtitle}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email..."
                />
                 <Text style={styles.subtitle}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password..."
                />
            </View>
            <Pressable style={styles.homeBtn} >
                <View style={styles.loginShadow} />
                <View style={styles.loginEdge} />
                <View style={styles.loginFront}>
                    <Text style={styles.loginFrontText} onPress={() => navigation.navigate("Dashboard")}>Log In!</Text>
                </View>
                </Pressable>
            </View>
        </View>

    );
}
const styles = StyleSheet.create (
{
    loginContent: {
        flex: 1,
        position: "relative",
        backgroundColor: "white",
        
    },

    mainSection: {
    flex: 1,
    justifyContent: "center",  
    alignItems: "center",      
    paddingHorizontal: 16,
    },

    title: {
    fontSize: 45,
    fontWeight: "400",
    color: "#004A94",
    textAlign: "center",
    marginBottom: 32,
    fontFamily: "RampartOne_400Regular",
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
        fontFamily: "Imprima_400Regular",
    },
      subtitle: {
        fontSize: 20,
        fontWeight: "400",
        color: "#004A94",
        marginBottom: 4,
        fontFamily: "Imprima_400Regular",
    },
      signupForm: {
        alignItems: "center",
    },

    formField: {
        width: "100%",
        marginBottom: 24,
    },
    
    input: {
    borderWidth: 2,
    borderColor: "#004A94",
    borderRadius: 5,
    fontSize: 18,
    padding: 10,
    width: "100%",              
    marginBottom: 16, 
    fontFamily: "Imprima_400Regular", 
  },
    
    }
)