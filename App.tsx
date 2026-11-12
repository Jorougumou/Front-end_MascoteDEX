import { Rotas } from "./src/Rotas";

import { useEffect } from "react";
import { AuthProvider } from "./src/context/AuthContext";

import {useFonts} from 'expo-font';
import { RubikMonoOne_400Regular } from '@expo-google-fonts/rubik-mono-one';

export default function App() {


  useEffect(() => {

  })

  const [fontsLoaded] = useFonts({
    RubikMonoOne_400Regular,
    DancingScript : require("./src/fonts/DancingScript-VariableFont_wght.ttf")
  });

  if (!fontsLoaded) {
    return null;
  }
  return(
      <AuthProvider>
        <Rotas/>
      </AuthProvider>

  )
}

