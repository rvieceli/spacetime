import {
  Switch,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";

import { colors } from "../../src/config/colors";
import { Controller } from "react-hook-form";

import { MediaPicker } from "../../src/components/MediaPicker";
import { useCreateMemory } from "../../src/hooks/useCreateMemory";
import { useGoBack } from "../../src/hooks/useGoBack";
import { Background } from "../../src/components/Background";
import { useMeasures } from "../../src/hooks/useMeasures";
import { ErrorContainer } from "../../src/components/ErrorContainer";

export default function New() {
  const { headerHeight } = useMeasures();
  const goBack = useGoBack("/memories");

  const {
    form,
    handleSubmit,
    mutation: { isLoading, isError, error },
  } = useCreateMemory(() => goBack());

  return (
    <Background>
      <ScrollView
        className="flex-1 px-8 pt-6"
        contentContainerStyle={{
          paddingBottom: headerHeight,
        }}
      >
        <Controller
          control={form.control}
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

        <Controller
          control={form.control}
          name="file"
          render={({ field }) => (
            <MediaPicker value={field.value} onChange={field.onChange} />
          )}
        />

        <Controller
          control={form.control}
          name="content"
          render={({ field }) => (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              multiline
              textAlignVertical="top"
              className="mt-6 p-0 font-body text-lg text-gray-50"
              placeholder="What do you want to remember? photos, videos, links, text, etc."
              placeholderTextColor={colors.gray[400]}
            />
          )}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-6 items-center self-end rounded-full bg-green-500 px-5 py-2"
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text className="font-alt text-sm uppercase text-black">Save</Text>
        </TouchableOpacity>
      </ScrollView>
      <ErrorContainer isVisible={isError}>
        <ErrorContainer.Message error={error} />
        <ErrorContainer.Retry onPress={handleSubmit} />
      </ErrorContainer>
    </Background>
  );
}
