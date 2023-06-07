import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Feather } from "@expo/vector-icons";

import { colors } from "../config/colors";
import { useAuth } from "../hooks/useAuth";

interface LogoutButtonProps extends Omit<TouchableOpacityProps, "onPress"> {
  to?: string;
}

export function LogoutButton({
  to = "/memories",
  ...props
}: LogoutButtonProps) {
  const { handleLogout } = useAuth();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
      {...props}
      onPress={handleLogout}
    >
      <Feather name="log-out" size={16} color={colors.black} />
    </TouchableOpacity>
  );
}
