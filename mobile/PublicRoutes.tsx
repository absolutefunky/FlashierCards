import { RootStackParamList } from "./App";
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "./src/screens/Login";
import ForgotPasswordScreen from "./src/screens/ForgotPassword";
import { Pressable, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const PublicStack = createStackNavigator<RootStackParamList>();

export default function PublicRoutes() {
    return (
        <PublicStack.Navigator initialRouteName="Login">
            <PublicStack.Screen
                name="Login"
                component={LoginScreen}
                options={{headerShown: false}}
            />
            <PublicStack.Screen 
                name="ForgotPassword" 
                component={ForgotPasswordScreen}
                options={({ navigation }) => ({
                    title: "",
                    headerLeft: () => (
                        <Pressable style={styles.headerBtn} onPress={() => navigation.navigate("Login")}>
                            <FontAwesomeIcon style={styles.headerText} icon={faArrowLeft} size={20} />
                        </Pressable>
                    ),
                    headerStyle: {
                        backgroundColor: "#D9EDF8"
                    }
                })}
            />
        </PublicStack.Navigator>
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