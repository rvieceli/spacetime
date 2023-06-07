import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Feather } from "@expo/vector-icons";

import { useGoBack } from "../hooks/useGoBack";
import { colors } from "../config/colors";

interface BackButtonProps extends Omit<TouchableOpacityProps, "onPress"> {
  to?: string;
}

export function BackButton({ to = "/memories", ...props }: BackButtonProps) {
  const goBack = useGoBack(to);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="h-10 w-10 items-center justify-center rounded-full bg-purple-500"
      {...props}
      onPress={() => goBack()}
    >
      <Feather name="arrow-left" size={16} color={colors.white} />
    </TouchableOpacity>
  );
}
