import { Linking, Text, TouchableOpacity, View } from "react-native";

import LogoInline from "../src/assets/logo-inline.svg";
import { useAuth } from "../src/hooks/useAuth";
import { Background } from "../src/components/Background";

export default function App() {
  const { loaded, handleLogin } = useAuth();

  return (
    <Background noHeader>
      <View className="relative flex-1 items-center py-10">
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
            disabled={!loaded}
            onPress={() => handleLogin()}
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
      </View>
    </Background>
  );
}
