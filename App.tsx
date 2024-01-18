import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import Detail from './app/screens/Detail';
import Login from './app/screens/login/Login';
import Home from './app/screens/home/Home';
import { icons, images } from './constants';
import { ScreenHeaderBtn } from './components';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import { FIREBASE_AUTH } from './firebaseConfig';
import PetRegister from './app/screens/pet-register/PetRegister';
import Profile from './app/screens/profile/Profile';
import * as SplashScreen from 'expo-splash-screen';
import PetProfile from './app/screens/pet-profile/PetProfile';
import Register from './app/screens/login/Register';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={async () => await FIREBASE_AUTH.signOut()}
      />
    </DrawerContentScrollView>
  );
}

export function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName='Home' drawerContent={CustomDrawerContent} >
      <Drawer.Screen name="Home" component={Home} options={{
        title: 'My Pets',
        drawerLabel: 'My Pets',
        headerRight: () => (
          <ScreenHeaderBtn iconUrl={images.profile} dimension='100%' handlePress={undefined} />
        ),
      }} />
      <Drawer.Screen name="Pet-Register" component={PetRegister} />
      <Drawer.Screen name="Pet Profile" component={PetProfile} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name='Home' component={MyDrawer} options={{ headerShown: false }} />
      <InsideStack.Screen name='Pet-Register' component={PetRegister} />
    </InsideStack.Navigator>
  )
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    KSBold: require('./assets/fonts/KumbhSans-Bold.ttf'),
    KSMedium: require('./assets/fonts/KumbhSans-Medium.ttf'),
    KSRegular: require('./assets/fonts/Salsa-Regular.ttf'),
  });

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user)
    })
  }, [])


  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='Login'>
        <InsideStack.Screen name='user-register' component={Register} options={{ headerShown: false }} />

        {user ? <Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown: false }} />
          : <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        }

      </Stack.Navigator>
    </NavigationContainer>
  );
}

