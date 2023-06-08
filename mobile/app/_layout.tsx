import { useLayoutEffect } from "react";
import {
  SplashScreen,
  Stack,
  useNavigation,
  useRouter,
  useSegments,
} from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useAuthStore } from "../src/store/useAuth.store";
import { useLoadFonts } from "../src/hooks/useLoadFonts";
import { useAppStateChangeListener } from "../src/hooks/useAppStateChangeListener";
import { LogoutButton } from "../src/components/LogoutButton";
import { Header } from "../src/components/Header";
import { NetworkInfo } from "../src/components/NetworkInfo";

import "../src/config/onlineManager";

const client = new QueryClient();

LogBox.ignoreAllLogs();

export default function Layout() {
  const isFontsLoaded = useLoadFonts();
  const status = useAuthStore((store) => store.state.status);
  const segments = useSegments();
  const navigation = useNavigation();
  const router = useRouter();

  const isLoading = !isFontsLoaded || status === "loading";

  useLayoutEffect(() => {
    const state = navigation.getState();

    if (state.stale || isLoading) {
      return;
    }

    if (status === "authenticated" && segments.length === 0) {
      router.replace("memories");
    }

    if (status === "unauthenticated" && segments.length > 0) {
      router.replace("/");
    }
  }, [isLoading, navigation.getState, segments, status]);

  useAppStateChangeListener();

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <QueryClientProvider client={client}>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: "transparent" },
          headerTransparent: true,
          header: Header,
          headerBackVisible: false,
        }}
      >
        <Stack.Screen
          name="index"
          redirect={status === "authenticated"}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="memories/index"
          options={{
            headerRight: () => <LogoutButton />,
          }}
        />
        <Stack.Screen name="memories/new" />
        <Stack.Screen name="memories/[id]" />
      </Stack>
      <StatusBar style="light" translucent />
      <NetworkInfo />
    </QueryClientProvider>
  );
}
