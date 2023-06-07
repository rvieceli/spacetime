import { isAxiosError } from "axios";
import { useMeasures } from "../hooks/useMeasures";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import {
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from "react-native";

interface ErrorContainerProps extends ViewProps {
  isVisible: boolean;
}

export function ErrorContainer({ isVisible, ...props }: ErrorContainerProps) {
  return (
    <Animated.View className="absolute bottom-0 left-0 right-0 w-full">
      {isVisible ? <ErrorContent {...props} /> : null}
    </Animated.View>
  );
}

function ErrorContent(props: ViewProps) {
  const { bottom } = useMeasures();

  return (
    <Animated.View
      key="net-info"
      entering={SlideInDown.duration(1000)}
      exiting={SlideOutDown.duration(1000)}
      className="w-full bg-red-500"
      style={{ paddingBottom: bottom }}
    >
      <View
        className="flex-row items-center justify-between gap-2 px-8 py-4"
        {...props}
      />
    </Animated.View>
  );
}

function getMessage(error: any) {
  if (isAxiosError(error)) {
    if (typeof error.response?.data.message === "string") {
      return error.response?.data.message;
    }

    if (error.response?.data.error === "Validation failed") {
      return "Validation failed";
      // cause: error.response?.data.message,
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
}

function Message({ children, error, ...props }: TextProps & { error?: any }) {
  return (
    <Text className="font-body text-white" {...props}>
      {children ?? ErrorContainer.getMessage(error)}
    </Text>
  );
}

function Retry(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} {...props}>
      <Text className="font-body text-white">Retry</Text>
    </TouchableOpacity>
  );
}

ErrorContainer.getMessage = getMessage;
ErrorContainer.Message = Message;
ErrorContainer.Retry = Retry;
