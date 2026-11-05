import AppNavigation from "./src/AppNavigation";
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from "./src/AuthNavigation";
import { useState } from "react";

import {useFonts} from 'expo-font';
import { RubikMonoOne_400Regular } from '@expo-google-fonts/rubik-mono-one';
import "./global.css"
import TelaLogin from "./src/screens/TelaLogin";

export default function App() {

  const [log, setLog] = useState<boolean>(false)

  const [fontsLoaded] = useFonts({
    RubikMonoOne_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return(
      <NavigationContainer>
        {log ? <AppNavigation/> : <AuthNavigation/>}
      </NavigationContainer>

  )
}

