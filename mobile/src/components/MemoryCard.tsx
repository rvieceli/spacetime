import { Text, TouchableOpacity, View, ViewProps } from "react-native";
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";

import { MediaSelector } from "./MediaSelector";
import { colors } from "../config/colors";
import { memo } from "react";
import { Skeleton } from "./Skeleton";
import { format } from "../lib/date";

interface MemoryCardProps {
  memory: {
    id: string;
    cover_url: string;
    excerpt: string;
    created_at: Date;
  };
}

function MemoryCardComponent({ memory }: MemoryCardProps) {
  return (
    <View className="space-y-4">
      <View className="flex-row items-center gap-2">
        <View className="h-px w-5 bg-gray-50" />
        <Text className="font-body text-sm text-gray-100">
          {format(memory.created_at)}
        </Text>
      </View>
      <View className="space-y-4 px-8">
        <MediaSelector
          source={{ uri: memory.cover_url }}
          renderImage={(source) => <MediaSelector.Image source={source} />}
          renderVideo={(source) => <MediaSelector.Video source={source} />}
        />

        <Text className="text-justify font-body text-base leading-relaxed text-gray-100">
          {memory.excerpt}
        </Text>
        <Link
          href={{
            pathname: "/memories/[id]",
            params: { id: memory.id },
          }}
          asChild
        >
          <TouchableOpacity className="flex-row items-baseline gap-1">
            <Text className="font-body text-sm text-gray-200">Read more</Text>
            <Feather name="arrow-right" size={16} color={colors.gray[200]} />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

export function MemoryCardSkeleton(props: ViewProps) {
  return (
    <View {...props}>
      <Skeleton.Text className="h-4 w-[30%] rounded-sm" />
      <Skeleton.Box className="my-4 aspect-video w-full rounded-lg object-cover" />
      <Skeleton.Text lines={3} className="my-1 h-4 rounded-sm" />
      <Skeleton.Text className="mt-4 h-4 w-[35%] rounded-sm" />
    </View>
  );
}

export const MemoryCard = memo(MemoryCardComponent);
