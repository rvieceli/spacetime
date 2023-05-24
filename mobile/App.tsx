import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useLoadFonts } from "./src/hooks/useLoadFonts";
import { useCallback } from "react";
import { styled } from "nativewind";

SplashScreen.preventAutoHideAsync();

import bgBlur from "./src/assets/bg-blur.png";
import Stripes from "./src/assets/stripes.svg";
import LogoInline from "./src/assets/logo-inline.svg";

const StyledStripes = styled(Stripes);

export default function App() {
  const isFontsLoaded = useLoadFonts();

  const onLayoutRootView = useCallback(async () => {
    if (isFontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isFontsLoaded]);

  if (!isFontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      onLayout={onLayoutRootView}
      source={bgBlur}
      className="relative flex-1 items-center bg-gray-900 py-10"
      imageStyle={{ position: "absolute", left: "-100%" }}
    >
      <StyledStripes className="absolute left-2" />

      <View className="flex-1 items-center justify-center gap-6">
        <LogoInline />

        <View className="space-y-2 px-8">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Your time capsule
          </Text>
          <Text className="text-center font-body text-lg leading-relaxed text-gray-100">
            Collect memorable moments from your journey and share them (if you
            like) with the world!
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-2"
        >
          <Text className="font-alt text-sm uppercase text-black">
            Register a memory
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-sm leading-relaxed text-gray-200">
        Made for learning purposes by{" "}
        <Text
          className="text-gray-100 underline"
          onPress={() => Linking.openURL("https://github.com/rvieceli")}
        >
          rvieceli
        </Text>
      </Text>

      <StatusBar style="light" translucent />
    </ImageBackground>
  );
}
