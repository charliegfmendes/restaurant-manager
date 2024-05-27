import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { PaperProvider, Button } from 'react-native-paper';
import CustomNavigationBar from './components/CustomNavigationBar';
import AuthScreen from './screens/Auth';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  Auth: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

function HomeScreen({
  navigation,
}: StackNavigationProp<RootStackParamList, 'Home'>) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button mode="contained" onPress={() => navigation.navigate('Details')}>
        Navigate to details
      </Button>
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <PaperProvider>
      <ActionSheetProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              header: (props) => <CustomNavigationBar {...props} />,
            }}
          >
            <Stack.Screen
              name="Auth"
              component={AuthScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ActionSheetProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
