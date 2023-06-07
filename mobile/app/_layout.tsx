import { useLoadFonts } from "../src/hooks/useLoadFonts";
import {
  SplashScreen,
  Stack,
  useNavigation,
  useRouter,
  useSegments,
} from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "../src/store/useAuth.store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLayoutEffect } from "react";

import { LogoutButton } from "../src/components/LogoutButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppStateChangeListener } from "../src/hooks/useAppStateChangeListener";
import { Header } from "../src/components/Header";

import "../src/config/onlineManager";
import { NetworkInfo } from '../src/components/NetworkInfo';
import { LogBox } from 'react-native';

const client = new QueryClient();

LogBox.ignoreAllLogs();

export default function Layout() {
  const isFontsLoaded = useLoadFonts();
  const status = useAuthStore((store) => store.state.status);
  const segments = useSegments();
  const navigation = useNavigation();
  const router = useRouter();
  const { top } = useSafeAreaInsets();

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
