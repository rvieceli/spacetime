import { TouchableOpacity, View, FlatList, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Link } from "expo-router";
import { colors } from "../../src/config/colors";

import { useGetMemories } from "../../src/hooks/useGetMemories";
import {
  MemoryCard,
  MemoryCardSkeleton,
} from "../../src/components/MemoryCard";
import { useRefreshOnFocus } from "../../src/hooks/useRefreshOnFocus";
import { Background } from "../../src/components/Background";
import { useMeasures } from "../../src/hooks/useMeasures";
import { Skeleton } from "../../src/components/Skeleton";

export default function Memories() {
  const { footerHeight } = useMeasures();
  const { data, refetch, isLoading } = useGetMemories();

  useRefreshOnFocus(refetch);

  return (
    <Background>
      {isLoading ? (
        <Skeleton className="mt-2 flex-1 space-y-10 px-8">
          <MemoryCardSkeleton />
          <MemoryCardSkeleton />
          <MemoryCardSkeleton />
        </Skeleton>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MemoryCard memory={item} />}
          ItemSeparatorComponent={() => <View className="h-10" />}
          contentContainerStyle={{
            paddingTop: 12,
            paddingBottom: footerHeight,
            flexGrow: 1,
          }}
          ListEmptyComponent={() => {
            return (
              <View className="flex-1 items-center justify-center">
                <Link href="memories/new">
                  <Text className="text-center font-body leading-relaxed text-gray-100">
                    You don't have any memories,{"\n"}start{" "}
                    <Text className="underline">creating now</Text>
                  </Text>
                </Link>
              </View>
            );
          }}
        />
      )}

      <Link href="memories/new" asChild>
        <TouchableOpacity
          activeOpacity={0.7}
          className="absolute right-4 h-12 w-12 items-center justify-center rounded-full bg-green-500 shadow shadow-gray-300"
          style={{ bottom: footerHeight + 20 }}
        >
          <Feather name="plus" size={24} color={colors.black} />
        </TouchableOpacity>
      </Link>
    </Background>
  );
}
