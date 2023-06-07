import { useCallback } from "react";
import { useNavigation, useRouter } from "expo-router";

export function useGoBack(or: string = "/") {
  const navigation = useNavigation();
  const router = useRouter();

  return useCallback(() => {
    if (navigation.canGoBack()) {
      router.back();
    } else {
      router.push(or);
    }
  }, [navigation]);
}
