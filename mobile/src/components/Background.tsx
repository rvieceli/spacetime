import { ImageBackground, ImageBackgroundProps } from "react-native";
import { styled } from "nativewind";

import bgBlur from "../../src/assets/bg-blur.png";
import Stripes from "../../src/assets/stripes.svg";
import { useMeasures } from "../hooks/useMeasures";

const StyledStripes = styled(Stripes);

type BackgroundProps = Omit<ImageBackgroundProps, "source"> & {
  noHeader?: boolean;
};

export function Background({
  children,
  noHeader,
  style,
  ...props
}: BackgroundProps) {
  const { headerHeight } = useMeasures();

  return (
    <ImageBackground
      source={bgBlur}
      className="relative flex-1 bg-gray-900"
      imageStyle={{ position: "absolute", left: "-100%" }}
      style={[!noHeader && { paddingTop: headerHeight }, style]}
      {...props}
    >
      <StyledStripes className="absolute left-2" />
      {children}
    </ImageBackground>
  );
}
