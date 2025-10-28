import fonts from '@/src/constants/fonts';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { useEffect } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PermissionProvider } from '../context/PermissionProvider';

export default function RootLayout() {
  const [fontsLoaded] = useFonts(
    {
      Bold: fonts.fonts.Bold,
      Medium: fonts.fonts.Medium,
      Regular: fonts.fonts.Regular
    }
  );

  /* Cargar fuentes de textto */
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }

  }, [fontsLoaded]);


  if (fontsLoaded) {
    return (
      <GestureHandlerRootView style={{flex: 1}}>
        <PermissionProvider>
          <StatusBar style='dark'/>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false}}
            />
          </Stack>
        </PermissionProvider>
      </GestureHandlerRootView>
      
      
      
    )
  };
  
}
