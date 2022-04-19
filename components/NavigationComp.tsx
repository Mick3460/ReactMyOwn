import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import Screen1 from '../screens/Screen1';
import Screen2 from '../screens/Screen2';
import Screen3 from '../screens/Screen3';
import { StackParamList } from '../typings/navigations';
import { User } from '../entities/User';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { RootState } from '../App';


const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator();

function ChatStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Screen1" component={Screen1} options={{ headerShown: false }}/>
      <Stack.Screen name="Screen2" component={Screen2} options={{ headerShown: false }}/>
      <Stack.Screen name="Screen3" component={Screen3} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function HomeChatStackNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Homescreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Screen1" component={Screen1} options={{ headerShown: false }} />
        <Stack.Screen name="Screen2" component={Screen2} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }

  export default function NavigationComp () {
      const user = useSelector( (state: any) => state.user.loggedInUser)
      
    return (
        <NavigationContainer>
            {user !== undefined ? (
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Chat" component={ChatStackNavigator} />
                <Tab.Screen name="WauwSoCool" component={Screen3} />
                <Tab.Screen name="Something" component={Screen2} />
                <Tab.Screen name="HomeScreen" component={HomeScreen} />
            </Tab.Navigator>

                ) : (

            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Login" component={HomeChatStackNavigator} />
                <Tab.Screen name="Sign up" component={Screen2} />
            </Tab.Navigator>
            )}
        </NavigationContainer>
    )
  }
  