import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { RampartOne_400Regular } from "@expo-google-fonts/rampart-one";
import { Imprima_400Regular } from "@expo-google-fonts/imprima";
import LoginScreen from './src/screens/Login';
import DashboardScreen from './src/screens/Dashboard';
import StudyScreen from './src/screens/Study';
import ForgotPasswordScreen from './src/screens/ForgotPassword';
import CreateNewPasswordScreen from './src/screens/CreateNewPassword';
import AccountInformationScreen from './src/screens/AccountInformation';
import ThemeScreen from './src/screens/Theme';
import DeleteAccountScreen from './src/screens/DeleteAccount';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Pressable, Text, StyleSheet } from 'react-native';
import { faArrowLeft, faArrowRightFromBracket, faFolder } from '@fortawesome/free-solid-svg-icons';

// update props here
export type RootStackParamList = {
    Login: undefined;
    ForgotPassword: undefined;
    CreateNewPassword: undefined;   // add prop for userId here
    Dashboard: {userId: string};
    Study: {userId: string, deckId: number};    // add prop for deckId here
    AccountInformation: {userId: string};
    Theme: {userId: string};
    DeleteAccount: {userId: string};
};

const RootStack = createStackNavigator<RootStackParamList>();

export default function App() {
    const [fontsLoaded] = useFonts({
        RampartOne_400Regular,
        Imprima_400Regular
    });

    if (!fontsLoaded) {
        return null; 
    }
    
    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName="Login">
                <RootStack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{headerShown: false}}
                />
                <RootStack.Screen 
                    name="ForgotPassword" 
                    component={ForgotPasswordScreen}
                    options={({ navigation }) => ({
                        title: "",
                        headerLeft: () => (
                            <Pressable style={styles.headerBtn} onPress={() => navigation.navigate("Login")}>
                                <FontAwesomeIcon style={styles.headerText} icon={faArrowLeft} size={26} />
                            </Pressable>
                        ),
                        headerStyle: {
                            backgroundColor: "#D9EDF8"
                        }
                    })}
                />
                <RootStack.Screen
                    name="CreateNewPassword"
                    component={CreateNewPasswordScreen}
                    options={({ navigation, route }) => ({
                        title: "",
                        headerLeft: () => (     // add prop for userId
                            <Pressable style={styles.headerBtn} onPress={() => navigation.navigate("ForgotPassword")}>
                                <FontAwesomeIcon style={styles.headerText} icon={faArrowLeft} size={26} />
                            </Pressable>
                        ),
                        headerStyle: {
                            backgroundColor: "#D9EDF8"
                        }
                    })}
                />
                <RootStack.Screen
                    name="Dashboard"
                    component={DashboardScreen}
                    options={({ navigation, route }) => ({
                        title: "",
                        headerLeft: () => (
                            <Pressable style={styles.headerBtn} onPress={() => navigation.navigate("Login")}>
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
                <RootStack.Screen
                    name="Study"
                    component={StudyScreen}
                    options={({ navigation, route }) => ({
                        title: "",
                        headerLeft: () => (         // add prop for deckId
                            <Pressable style={styles.headerBtn} onPress={() => navigation.navigate("Dashboard", {userId: route.params.userId})}>
                                <FontAwesomeIcon style={styles.headerText} icon={faFolder} size={26} />
                            </Pressable>
                        ),
                        headerStyle: {
                            backgroundColor: "#D9EDF8"
                        }
                    })}
                />
                <RootStack.Screen 
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
                <RootStack.Screen
                    name="Theme"
                    component={ThemeScreen}
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
                <RootStack.Screen
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
                            backgroundColor: "#D9EDF8"
                        }
                    })}
                />
            </RootStack.Navigator>
        </NavigationContainer>
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
        borderRadius: 10
    },
    headerText: {
        textAlign: "center",
        fontSize: 20,
        fontFamily: "Imprima_400Regular",
        fontWeight: "400",
        color: "white"
    }
});