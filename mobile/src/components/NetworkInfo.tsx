import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useMeasures } from "../hooks/useMeasures";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";

export function NetworkInfo() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(!!state.isConnected);
    });
    return () => unsubscribe();
  }, [setIsConnected]);

  return <Animated.View>{isConnected ? null : <Message />}</Animated.View>;
}

function Message() {
  const { footerPadding: paddingBottom, footerHeight: height } = useMeasures();

  return (
    <Animated.View
      key="net-info"
      entering={SlideInDown.duration(1000)}
      exiting={SlideOutDown.duration(1000)}
    >
      <View
        className="absolute bottom-0 left-0 right-0 items-center justify-center bg-red-500"
        style={{ paddingBottom, height }}
      >
        <Text className="font-body text-white">No internet.</Text>
      </View>
    </Animated.View>
  );
}
