import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, Header } from '@react-navigation/stack';
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
import { faArrowRightFromBracket, faFolder } from '@fortawesome/free-solid-svg-icons';

export type RootStackParamList = {
    Login: undefined;
    ForgotPassword: undefined;
    CreateNewPassword: undefined;
    Dashboard: undefined;
    Study: undefined;
    AccountInformation: undefined;
    Theme: undefined;
    DeleteAccount: undefined;
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
                                <Text style={styles.headerText}>Login</Text>
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
                    options={({ navigation }) => ({
                        title: "",
                        headerLeft: () => (
                            <Pressable style={styles.headerBtn} onPress={() => navigation.navigate("ForgotPassword")}>
                                <Text style={styles.headerText}>Forgot password</Text>
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
                    options={({ navigation }) => ({
                        title: "",
                        headerLeft: () => (
                            <Pressable style={styles.headerBtn} onPress={() => navigation.navigate("Login")}>
                                <FontAwesomeIcon style={styles.headerText} icon={faArrowRightFromBracket} size={26} />
                            </Pressable>
                        ),
                        headerRight: () => (
                            <Pressable style={styles.headerBtn} onPress={() => navigation.navigate("AccountInformation")}>
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
                    options={({ navigation }) => ({
                        title: "",
                        headerLeft: () => (
                            <Pressable style={styles.headerBtn} onPress={() => navigation.navigate("Dashboard")}>
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
                    options={({ navigation }) => ({
                        title: "",
                        headerLeft: () => (
                            <Pressable style={styles.headerBtn} onPress={() => navigation.navigate("Dashboard")}>
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
                    options={({ navigation }) => ({
                        title: "",
                        headerLeft: () => (
                            <Pressable style={styles.headerBtn} onPress={() => navigation.navigate("Dashboard")}>
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
                    options={({ navigation }) => ({
                        title: "",
                        headerLeft: () => (
                            <Pressable style={styles.headerBtn} onPress={() => navigation.navigate("Dashboard")}>
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
