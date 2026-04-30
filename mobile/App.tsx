import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/Login';
import DashboardScreen from './src/screens/Dashboard';
import StudyScreen from './src/screens/Study';
import ForgotPasswordScreen from './src/screens/ForgotPassword';
import CreateNewPasswordScreen from './src/screens/CreateNewPassword';
import AccountInformationScreen from './src/screens/AccountInformation';
import ThemeScreen from './src/screens/Theme';
import DeleteAccountScreen from './src/screens/DeleteAccount';

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
  return (
    <NavigationContainer>
        <RootStack.Navigator initialRouteName="Login">
            <RootStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <RootStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
            <RootStack.Screen name="CreateNewPassword" component={CreateNewPasswordScreen} options={{ headerShown: false }} />
            <RootStack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
            <RootStack.Screen name="Study" component={StudyScreen} options={{ headerShown: false }} />
            <RootStack.Screen name="AccountInformation" component={AccountInformationScreen} options={{ headerShown: false }} />
            <RootStack.Screen name="Theme" component={ThemeScreen} options={{ headerShown: false }} />
            <RootStack.Screen name="DeleteAccount" component={DeleteAccountScreen} options={{ headerShown: false }} />
        </RootStack.Navigator>
    </NavigationContainer>
  );
}
