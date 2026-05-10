import { RootStackParamList } from "./App";
import { createStackNavigator } from '@react-navigation/stack';
import CreateNewPasswordScreen from "./src/screens/CreateNewPassword";
import { Pressable, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faArrowRightFromBracket, faFolder } from "@fortawesome/free-solid-svg-icons";
import DashboardScreen from "./src/screens/Dashboard";
import StudyScreen from "./src/screens/Study";
import AccountInformationScreen from "./src/screens/AccountInformation";
import DeleteAccountScreen from "./src/screens/DeleteAccount";
import UserAuth from "./AuthContext";

const PrivateStack = createStackNavigator<RootStackParamList>();

export default function PrivateRoutes() {
    const { logout } = UserAuth();
    return (
        <PrivateStack.Navigator>
            <PrivateStack.Screen
                name="CreateNewPassword"
                component={CreateNewPasswordScreen}
                options={{headerShown: false}}
            />
            <PrivateStack.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={({ navigation, route }) => ({
                    title: "",
                    headerLeft: () => (
                        <Pressable style={styles.headerBtn} onPress={() => {
                            logout();
                            navigation.navigate("Login");
                        }}>
                            <FontAwesomeIcon style={styles.headerText} icon={faArrowRightFromBracket} size={26} />
                        </Pressable>
                    ),
                    headerRight: () => (
                        <Pressable style={styles.headerBtn} onPress={() => navigation.navigate("AccountInformation", {userId: route.params.userId})}>
                            <Text style={styles.headerText}>Profile</Text>
                        </Pressable>
                    ),
                    headerStyle: {
                        backgroundColor: "#D9EDF8"
                    }
                })}
            />
            <PrivateStack.Screen
                name="Study"
                component={StudyScreen}
                options={({ navigation, route }) => ({
                    title: "",
                    headerLeft: () => (
                        <Pressable style={styles.headerBtn} onPress={() => navigation.navigate("Dashboard", {userId: route.params.userId})}>
                            <FontAwesomeIcon style={styles.headerText} icon={faFolder} size={26} />
                        </Pressable>
                    ),
                    headerStyle: {
                        backgroundColor: "#D9EDF8"
                    }
                })}
            />
            <PrivateStack.Screen 
                name="AccountInformation"
                component={AccountInformationScreen} 
                options={({ navigation, route }) => ({
                    title: "",
                    headerLeft: () => (
                        <Pressable style={styles.headerBtn} onPress={() => navigation.navigate("Dashboard", {userId: route.params.userId})}>
                            <FontAwesomeIcon style={styles.headerText} icon={faFolder} size={26} />
                        </Pressable>
                    ),
                    headerStyle: {
                        backgroundColor: "#D9EDF8"
                    }
                })}
            />
            <PrivateStack.Screen
                name="DeleteAccount"
                component={DeleteAccountScreen} 
                options={({ navigation, route }) => ({
                    title: "",
                    headerLeft: () => (
                        <Pressable style={styles.headerBtn} onPress={() => navigation.navigate("Dashboard", {userId: route.params.userId})}>
                            <FontAwesomeIcon style={styles.headerText} icon={faFolder} size={26} />
                        </Pressable>
                    ),
                    headerStyle: {
                        backgroundColor: "#D9EDF8",
                    }
                })}
            />
        </PrivateStack.Navigator>
    );
}

const styles = StyleSheet.create({
    headerBtn: {
        backgroundColor: "#004A94",
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 12,
        paddingLeft: 12,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 10,
        height: 35
    },
    headerText: {
        textAlign: "center",
        fontSize: 18,
        fontFamily: "Imprima_400Regular",
        fontWeight: "400",
        color: "white"
    }
});