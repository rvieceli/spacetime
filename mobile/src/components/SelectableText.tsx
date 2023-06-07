import { styled } from "nativewind";
import { Platform, Text, TextInputProps, TextProps } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface SelectableTextProps extends TextProps {
  children?: React.ReactNode;
  style?: TextProps["style"] | TextInputProps["style"];
  textStyle?: TextProps["style"];
  textInputStyle?: TextInputProps["style"];
}

function SelectableTextComponent({
  children,
  style,
  textStyle,
  textInputStyle,
}: SelectableTextProps) {
  if (Platform.OS === "android") {
    return (
      <Text selectable style={[style, textStyle]}>
        {children}
      </Text>
    );
  }

  return (
    <TextInput editable={false} multiline style={[style, textInputStyle]}>
      {children}
    </TextInput>
  );
}

export const SelectableText = styled(SelectableTextComponent, {
  props: {
    style: true,
    textStyle: true,
    textInputStyle: true,
  },
});
