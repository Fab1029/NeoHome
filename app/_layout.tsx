import fonts from '@/constants/fonts';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { useEffect } from "react";

export default function RootLayout() {
  
  const [fontsLoaded] = useFonts(
    {
      Bold: fonts.fonts.Bold,
      Medium: fonts.fonts.Medium,
      Regular: fonts.fonts.Regular
    }
  );

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }

  }, [fontsLoaded]);

  if (fontsLoaded) {
    return (

      <>
        <StatusBar style='dark'/>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false}}
            />
          </Stack>
      </>
        
      
    )
  };
  
}
