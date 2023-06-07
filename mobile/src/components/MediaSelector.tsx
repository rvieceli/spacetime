import * as ImagePicker from "expo-image-picker";
import {
  ImageProps,
  ImageSourcePropType,
  Image as RNImage,
  Text,
  View,
} from "react-native";
import { AVPlaybackSource } from "expo-av";
import mime from "mime";
import { createElement } from "react";
import { Video as ExpoVideo, ResizeMode, VideoProps } from "expo-av";
import { Feather } from "@expo/vector-icons";
import { colors } from "../config/colors";

interface MediaSelectorProps {
  source?: ImagePicker.ImagePickerAsset | { uri: string };
  renderImage?: (source: ImageSourcePropType) => React.ReactElement;
  renderVideo?: (source: AVPlaybackSource) => React.ReactElement;
  placeholder?: React.ReactElement;
}

export function MediaSelector({
  source,
  renderImage,
  renderVideo,
  placeholder,
}: MediaSelectorProps) {
  const type: string | undefined = source
    ? mime.getType(source.uri)
    : undefined;

  if (type?.startsWith("image") && renderImage) {
    return createElement(renderImage, source);
  }

  if (type?.startsWith("video") && renderVideo) {
    return createElement(renderVideo, source);
  }

  if (placeholder) {
    return placeholder;
  }

  return null;
}

function Video(props: VideoProps) {
  return (
    <ExpoVideo
      useNativeControls
      resizeMode={ResizeMode.COVER}
      className="aspect-video w-full rounded-lg"
      {...props}
    />
  );
}

function Image(props: ImageProps) {
  return (
    <RNImage
      className="aspect-video w-full rounded-lg object-cover"
      {...props}
    />
  );
}

function Placeholder({ children }: { children?: React.ReactNode }) {
  return (
    <View className="flex-row items-center gap-2">
      {children || (
        <>
          <Feather name="camera" size={24} color={colors.white} />
          <Text className="font-body text-sm text-gray-200">
            Attach a cover image or video
          </Text>
        </>
      )}
    </View>
  );
}

MediaSelector.Video = Video;
MediaSelector.Image = Image;
MediaSelector.Placeholder = Placeholder;
