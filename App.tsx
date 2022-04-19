import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore , applyMiddleware } from 'redux';
import HomeScreen from './screens/HomeScreen';
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';
import Screen3 from './screens/Screen3';
import chatReducer from './store/reducers/chat.reducer';
import userReducer from './store/reducers/user.reducer';
import { StackParamList } from "./typings/navigations";
import ReduxThunk from 'redux-thunk'
import * as SecureStore from 'expo-secure-store'; //might not need
import NavigationComp from './components/NavigationComp';
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

const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
  // posts: PostReducer
});

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

export default function App() {
  ChatStackNavigator()
  return (
    <Provider store={store}>
      <NavigationComp></NavigationComp>
    </Provider>
  )
}

