import { ImageBackground } from "react-native";
import { styled } from "nativewind";

import bgBlur from "../src/assets/bg-blur.png";
import Stripes from "../src/assets/stripes.svg";
import { useLoadFonts } from "../src/hooks/useLoadFonts";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "../src/store/useAuth.store";

const StyledStripes = styled(Stripes);

export default function Layout() {
  const isFontsLoaded = useLoadFonts();
  const status = useAuthStore((store) => store.state.status);

  const isLoading = !isFontsLoaded || status === "loading";

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <ImageBackground
      source={bgBlur}
      className="relative flex-1 bg-gray-900"
      imageStyle={{ position: "absolute", left: "-100%" }}
    >
      <StyledStripes className="absolute left-2" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Screen name="index" redirect={status === "authenticated"} />
        <Stack.Screen name="new" />
        <Stack.Screen name="memories" />
      </Stack>
      <StatusBar style="light" translucent />
    </ImageBackground>
  );
}
