import { useSafeAreaInsets } from "react-native-safe-area-context";

const HEADER_HEIGHT = 60;

export function useMeasures() {
  const insets = useSafeAreaInsets();
  const headerHeight = HEADER_HEIGHT + insets.top;
  const footerPadding = Math.max(insets.bottom - 20, 0);
  const footerHeight = footerPadding + 40;

  return {
    ...insets,
    headerHeight,
    footerPadding,
    footerHeight,
  };
}
