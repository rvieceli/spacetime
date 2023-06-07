import * as ImagePicker from "expo-image-picker";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { Feather } from "@expo/vector-icons";
import { colors } from "../config/colors";
import { useState } from "react";
import { MediaSelector } from "./MediaSelector";

export type Media = ImagePicker.ImagePickerAsset;

interface MediaPickerProps {
  value?: Media;
  onChange: (asset: Media) => void;
}

export function isMedia(asset: unknown): asset is Media {
  return (
    typeof asset === "object" &&
    "type" in asset! &&
    "uri" in asset &&
    (asset.type === "image" || asset.type === "video")
  );
}

async function askPermission() {
  const permission = await ImagePicker.getMediaLibraryPermissionsAsync();

  if (permission.status === ImagePicker.PermissionStatus.GRANTED) {
    return true;
  }

  if (permission.canAskAgain) {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    return status === ImagePicker.PermissionStatus.GRANTED;
  }

  return false;
}

export function MediaPicker({ value, onChange }: MediaPickerProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  async function handlePickImage() {
    const hasPermission = await askPermission();

    if (!hasPermission) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      onChange(result.assets[0]);
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="mt-6 h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20"
      onPress={handlePickImage}
    >
      <MediaSelector
        source={value}
        renderImage={(source) => (
          <Image
            source={source}
            className="h-full w-full rounded-lg object-cover"
          />
        )}
        renderVideo={(source) => (
          <Video
            source={source}
            useNativeControls
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isLooping
            isMuted
            className="h-full w-full rounded-lg"
          />
        )}
        renderPlaceholder={() => (
          <View className="flex-row items-center gap-2">
            <Feather name="camera" size={24} color={colors.white} />
            <Text className="font-body text-sm text-gray-200">
              Attach a cover image or video
            </Text>
          </View>
        )}
      />
    </TouchableOpacity>
  );
}
