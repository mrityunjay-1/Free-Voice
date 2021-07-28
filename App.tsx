import React from 'react';
import {Text, View, Image} from 'react-native';

// icons
import { AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

// for navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// stack screens
import ProfileScreen from './screens/ProfileTabScreens/ProfileScreen';
import ProfileSettingsScreen from './screens/ProfileTabScreens/ProfileSettingsScreen';

import FeedScreen from './screens/FeedTabScreens/FeedScreen';
import SearchScreen from './screens/FeedTabScreens/SearchScreen';
import NewPostScreen from './screens/FeedTabScreens/NewPostScreen';


import TrendingScreen from './screens/TrendingTabScreens/TrendingScreen';


import QnAScreen from './screens/QnAScreen';
import NotesScreen from './screens/NotesScreen';

// auth screens
import SignIn from './screens/authentication/SignIn';
import SignUp from './screens/authentication/SignUp';

// Context
import ContextData, { AuthContext } from './screens/context/AuthContext';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();



const ProfileStack = () => {
  const {data}: any = React.useContext(ContextData);
  return (
    <Stack.Navigator screenOptions={{animationEnabled: false}}>
      {
        data.isLoggedIn 
        ?
        <>
          <Stack.Screen component={ProfileScreen} name="Mrityunjay Kumar" options={{headerShown: false, headerStyle: {elevation: 0, backgroundColor: 'white'}, headerTitleAlign: 'center'}} />
          <Stack.Screen component={ProfileSettingsScreen } name="Settings" />
        </>
        :
        <>
          <Stack.Screen component={SignIn} name="SignIn" options={{headerTitleAlign: 'center'}} />
          <Stack.Screen component={SignUp} name="SignUp" options={{headerTitleAlign: 'center'}} />
        </>
      }
    </Stack.Navigator>
  );
};

const FeedStack = () => {
  return (
    <Stack.Navigator screenOptions={{animationEnabled: false}} >
      {/* screen 1 */}
      <Stack.Screen component={FeedScreen} name="Free Voice" 
        options={{ 
          header: ({navigation}: any) => {
            return <View style={{backgroundColor: 'rgba(0, 0, 255, 0.1)'}} >
                      <Text style={{fontSize: 24}}></Text>
                      <View style={{width: '100%',flexDirection: 'row', justifyContent: 'space-between', padding: 15}} >
                        <Text style={{fontSize: 22, fontWeight: 'bold'}}> Free Voice </Text>
                        <View style={{width: 100, flexDirection: 'row', justifyContent: 'space-around'}} >
                          <Text onPress={() => navigation.navigate("SearchScreen")} > <AntDesign name="search1" size={22} style={{width: 50}} /> </Text>
                          <Text style={{position: 'relative'}}> <MaterialCommunityIcons name="dots-vertical" size={24}  style={{width: 50}} /> </Text>
                        </View>
                      </View>
                    </View>
          }, 
          headerStyle: {elevation: 0, backgroundColor: 'rgba(0, 0, 255, 0.1)'}}}
      />
      
      <Stack.Screen component={SearchScreen} name="SearchScreen" options={{headerShown: false}} />
      <Stack.Screen component={NewPostScreen} name="NewPostScreen" options={{headerShown: false}} />
  
    </Stack.Navigator>
  );
};

const App = () => {
  const {launchApp}: any = React.useContext(ContextData);

  // only run on app launch
  React.useEffect(() => {
    console.log("calling launch app");
    launchApp();
  }, []);

  return (
    <NavigationContainer>
      <Tabs.Navigator
          tabBarOptions={{
            activeTintColor: 'black',
            inactiveTintColor: 'grey',
            activeBackgroundColor: 'rgba(0, 0, 255, 0.1)',
            labelStyle:{fontSize: 10},
            style: {elevation: 0},
            keyboardHidesTabBar: true
          }} 
      >
  
        <Tabs.Screen component={FeedStack} name="Feed" options={{tabBarIcon: () => <AntDesign name="home" size={20} /> }} />
        <Tabs.Screen component={TrendingScreen} name="Trending" options={{tabBarIcon: () => <MaterialIcons name="trending-up" size={20} /> }}  />
        <Tabs.Screen component={ProfileStack} name="My Profile" options={{tabBarIcon: () => <AntDesign name="user" size={20} /> }}  />
        <Tabs.Screen component={QnAScreen} name="QnA" options={{tabBarIcon: () => <AntDesign name="questioncircleo" size={20} /> }}  />
        <Tabs.Screen component={NotesScreen} name="Notes" options={{tabBarIcon: () => <MaterialIcons name="notes" size={20} /> }}  />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default () => { 
  return <AuthContext> 
      <App />
    </AuthContext>;
};