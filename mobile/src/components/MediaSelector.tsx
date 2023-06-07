import * as ImagePicker from "expo-image-picker";
import { ImageSourcePropType } from "react-native";
import { AVPlaybackSource } from "expo-av";
import mime from "mime";
import { createElement } from "react";

interface MediaSelectorProps {
  source?: ImagePicker.ImagePickerAsset | { uri: string };
  renderImage?: (source: ImageSourcePropType) => React.ReactElement;
  renderVideo?: (source: AVPlaybackSource) => React.ReactElement;
  renderPlaceholder?: () => React.ReactElement;
}

export function MediaSelector({
  source,
  renderImage,
  renderVideo,
  renderPlaceholder,
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

  if (!renderPlaceholder) {
    return null;
  }

  return createElement(renderPlaceholder);
}
