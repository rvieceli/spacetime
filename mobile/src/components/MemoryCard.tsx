import { Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";

import { MediaSelector } from "./MediaSelector";
import { colors } from "../config/colors";
import { memo } from "react";

interface MemoryCardProps {
  memory: {
    id: string;
    cover_url: string;
    excerpt: string;
    created_at: Date;
  };
}

const format = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
}).format;

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

export const MemoryCard = memo(MemoryCardComponent);
