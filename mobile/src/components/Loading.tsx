import { ActivityIndicator, View } from "react-native";
import { colors } from "../config/colors";

export function Loading() {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color={colors.gray[100]} />
    </View>
  );
}
