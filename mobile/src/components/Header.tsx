import { View } from "react-native";
import { useMeasures } from "../hooks/useMeasures";

import LogoInline from "../../src/assets/logo-inline.svg";
import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { BackButton } from "./BackButton";

export function Header({ options, navigation }: NativeStackHeaderProps) {
  const { headerHeight } = useMeasures();

  function renderRight() {
    const canGoBack = navigation.canGoBack();

    if (options.headerRight) {
      return options.headerRight({ canGoBack });
    }

    if (canGoBack) {
      return <BackButton />;
    }

    return null;
  }

  return (
    <View
      className="flex-row items-end justify-between px-8 py-2"
      style={{ height: headerHeight }}
    >
      <View className="w-full flex-row items-center justify-between">
        <LogoInline />
        {renderRight()}
      </View>
    </View>
  );
}
