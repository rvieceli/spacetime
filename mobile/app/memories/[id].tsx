import { Unmatched, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useGetMemory } from "../../src/hooks/useGetMemory";

import { MediaSelector } from "../../src/components/MediaSelector";
import { Background } from "../../src/components/Background";
import { useMeasures } from "../../src/hooks/useMeasures";
import { SelectableText } from "../../src/components/SelectableText";
import { useDeleteMemory } from "../../src/hooks/useDeleteMemory";
import { useGoBack } from "../../src/hooks/useGoBack";
import { Skeleton } from "../../src/components/Skeleton";
import { format } from "../../src/lib/date";

export default function MemoryDetail() {
  const { footerHeight } = useMeasures();
  const params = useLocalSearchParams<{ id: string }>();
  const goBack = useGoBack();

  const { data, isLoading, isError } = useGetMemory(params.id!);
  const deleteMutation = useDeleteMemory(() => goBack());

  function render() {
    if (isLoading) {
      return (
        <Skeleton className="mt-2 flex-1 px-8">
          <Skeleton.Box className="mb-6 aspect-video w-full rounded-lg object-cover" />
          <Skeleton.Text lines={15} className="m-1 h-4 rounded-sm" />
        </Skeleton>
      );
    }

    if (isError) {
      return (
        <View className="flex-1 items-center justify-center">
          <Text className="font-body text-gray-100">Something went wrong</Text>
        </View>
      );
    }

    if (!data) {
      return <Unmatched />;
    }

    return (
      <View className="mt-2 flex-1 px-8">
        <MediaSelector
          source={{ uri: data?.cover_url }}
          renderImage={(source) => <MediaSelector.Image source={source} />}
          renderVideo={(source) => <MediaSelector.Video source={source} />}
        />
        <ScrollView
          className="mt-2 flex-1 pt-2"
          contentContainerStyle={{
            paddingBottom: footerHeight,
            flexGrow: 1,
            position: "relative",
          }}
          showsVerticalScrollIndicator={false}
        >
          <SelectableText className="text-justify font-body text-base leading-relaxed text-gray-100">
            {data.content}
          </SelectableText>
          <View
            className="flex-row items-center gap-2 mt-2"
            style={data.is_mine && { marginBottom: footerHeight + 20 }}
          >
            <View className="h-px w-5 bg-gray-50" />
            <Text className="font-body text-sm text-gray-100">
              {format(data.created_at, "full")}
            </Text>
          </View>

          {data.is_mine && (
            <TouchableOpacity
              activeOpacity={0.7}
              className="absolute mt-6 items-center self-end rounded-full bg-red-500 px-5 py-2"
              style={{ bottom: footerHeight + 20 }}
              onPress={() => deleteMutation.mutate(data.id)}
            >
              <Text className="font-alt text-sm uppercase text-black">
                Delete
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    );
  }

  return <Background>{render()}</Background>;
}
