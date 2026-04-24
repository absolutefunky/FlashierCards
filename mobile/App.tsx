import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import StudyScreen from "./src/screens/StudyScreen";
import EditScreen from "./src/screens/EditScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Signup: undefined;
    Dashboard: undefined;
    Study: undefined;
    Edit: undefined;
    Profile: undefined;
    AccountInformation: undefined;
    Theme: undefined;
    ChangePassword: undefined;
    DeleteAccount: undefined;
    ForgotPassword: undefined;
    Verify: undefined;
    CreateNewPassword: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
                <Stack.Screen name="Study" component={StudyScreen} />
                <Stack.Screen name="Edit" component={EditScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
