import {
  Switch,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../src/config/colors";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import LogoInline from "../src/assets/logo-inline.svg";

const FormSchema = z.object({
  is_public: z.boolean().default(false),
  content: z.string().trim().nonempty(),
});

type FormValues = z.infer<typeof FormSchema>;

export default function New() {
  const { top, bottom } = useSafeAreaInsets();

  const { control } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{
        paddingTop: top,
        paddingBottom: bottom,
      }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <LogoInline />
        <Link href="/memories" asChild>
          <TouchableOpacity
            activeOpacity={0.7}
            className="h-10 w-10 items-center justify-center rounded-full bg-purple-500"
          >
            <Feather name="arrow-left" size={16} color={colors.white} />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-6">
        <Controller
          control={control}
          name="is_public"
          render={({ field }) => (
            <View className="mt-6 flex-row items-center gap-2">
              <Switch
                value={field.value}
                onValueChange={field.onChange}
                thumbColor={colors.white}
                trackColor={{
                  false: colors.gray[300],
                  true: colors.purple[500],
                }}
              />
              <Text className="font-body text-base text-gray-200">
                Make it public
              </Text>
            </View>
          )}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-6 h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20"
        >
          <View className="flex-row items-center gap-2">
            <Feather name="camera" size={24} color={colors.white} />
            <Text className="font-body text-sm text-gray-200">
              Attach a cover image or video
            </Text>
          </View>
        </TouchableOpacity>

        <Controller
          control={control}
          name="content"
          render={({ field }) => (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              multiline
              className="mt-6 p-0 font-body text-lg text-gray-50"
              placeholder="What do you want to remember? photos, videos, links, text, etc."
              placeholderTextColor={colors.gray[400]}
            />
          )}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-6 items-center self-end rounded-full bg-green-500 px-5 py-2"
        >
          <Text className="font-alt text-sm uppercase text-black">Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
