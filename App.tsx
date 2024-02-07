import 'react-native-gesture-handler';

import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { User, onAuthStateChanged } from 'firebase/auth';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Toast from 'react-native-toast-message';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import { COLORS, icons, images } from './app/constants';
import Login from './app/screens/login/Login';
import Home from './app/screens/home/Home';
import { FIREBASE_AUTH } from './firebaseConfig';
import PetRegister from './app/screens/pet-register/PetRegister';
import Profile from './app/screens/profile/UserProfile';
import PetProfile from './app/screens/pet-profile/PetProfile';
import Register from './app/screens/login/Register';
import PetEditModal from './app/screens/modals/pet-edit/PetEditModal';
import { getUser, logout } from './app/services/api/user-service';
import useUserStore from './app/services/state/zustand/user-store';

const Stack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarShowLabel: false,
      tabBarHideOnKeyboard: true,
      tabBarStyle: { backgroundColor: COLORS.secondary },
      tabBarActiveTintColor: COLORS.tertiary,
      tabBarInactiveTintColor: COLORS.primary,
    }}>
      <Tab.Screen name="Home" component={Home} options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name='home-outline' color={color} size={size} />
        )
      }} />
      <Tab.Screen name="Pet Register" component={PetRegister} options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name='pets' color={color} size={size} />
        )
      }} />
      <Tab.Screen name="Profile" component={Profile} options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Feather name='user' color={color} size={size} />
        )
      }} />
    </Tab.Navigator>
  );
}

function InsideLayout() {
  return (
    <InsideStack.Navigator >
      <InsideStack.Screen name='Tabs' component={MyTabs} options={{ headerShown: false }} />
      <InsideStack.Screen name="Pet Profile" component={PetProfile} />
      <InsideStack.Group screenOptions={{ presentation: 'modal' }}>
        <InsideStack.Screen name="PetEdit" component={PetEditModal} options={{ headerShown: false }} />
      </InsideStack.Group>
    </InsideStack.Navigator>
  )
}
function LoginLayout() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <LoginStack.Screen name='user-register' component={Register} options={{ headerShown: false }} />
    </LoginStack.Navigator>
  )
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    KSBold: require('./app/assets/fonts/KumbhSans-Bold.ttf'),
    KSMedium: require('./app/assets/fonts/KumbhSans-Medium.ttf'),
    KSRegular: require('./app/assets/fonts/Salsa-Regular.ttf'),
  });

  const [user, setUser] = useState<User | null>(null)
  const { updateUser } = useUserStore()


  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, async (user: any) => {

      const data = await getUser(user.email)

      const exist = data?.docs.filter((doc) => {
        if (doc.data().email === user.email) {
          updateUser({
            uid: doc.id,
            name: doc.data().name,
            lastname: doc.data().lastname,
            email: doc.data().email,
            contactNumber: doc.data().contactNumber,
          })
          setUser(user)

          return doc
        }
      })
      if (exist && exist.length <= 0) {
        await logout()
      }

    })
  }, [])


  return (

    <NavigationContainer >
      <Stack.Navigator initialRouteName='Login'>

        {user ? <Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown: false }} />
          : <Stack.Screen name="LoginLayout" component={LoginLayout} options={{ headerShown: false }} />
        }

      </Stack.Navigator>
      <Toast />

    </NavigationContainer>

  );
}

