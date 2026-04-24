import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from './src/screens/Dashboard';
import Study from "./src/screens/Study";
import Login from "./src/screens/Login";

export type RootStackParamList = {
    Dashboard: undefined;
    Study: undefined;
    Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Study" component={Study} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>

      <StatusBar style="auto" />
    </NavigationContainer>
  );
}