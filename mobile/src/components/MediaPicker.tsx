import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native";
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
      className="mt-6 aspect-video w-full rounded-lg border border-dashed border-gray-500 bg-black/20"
      onPress={handlePickImage}
    >
      <MediaSelector
        source={value}
        renderImage={(source) => (
          <MediaSelector.Image source={source} className="h-full" />
        )}
        renderVideo={(source) => (
          <MediaSelector.Video source={source} shouldPlay isLooping isMuted />
        )}
        placeholder={<MediaSelector.Placeholder />}
      />
    </TouchableOpacity>
  );
}
