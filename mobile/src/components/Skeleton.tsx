import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, View, ViewProps } from "react-native";
import Animated, {
  Clock,
  block,
  set,
  startClock,
  useCode,
  Value,
  timing,
  cond,
  eq,
  EasingNode,
} from "react-native-reanimated";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const { width } = Dimensions.get("window");

function runTiming(clock: Animated.Clock) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    frameTime: new Value(0),
    time: new Value(0),
  };

  const config = {
    duration: 1000,
    toValue: new Value(1),
    easing: EasingNode.inOut(EasingNode.ease),
  };

  return block([
    timing(clock, state, {
      toValue: config.toValue,
      duration: config.duration,
      easing: config.easing,
    }),
    cond(eq(state.finished, 1), [
      set(state.finished, 0),
      set(state.frameTime, 0),
      set(state.time, 0),
      set(state.position, 0),
    ]),
    state.position,
  ]);
}

function Container({ style, ...props }: ViewProps) {
  return (
    <View {...props} style={[style, { backgroundColor: "transparent" }]} />
  );
}

function Box({ style, ...props }: ViewProps) {
  return <View {...props} style={[style, { backgroundColor: "#000" }]} />;
}

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function Text({ style, lines, ...props }: ViewProps & { lines?: number }) {
  return (
    <View>
      {Array.from({ length: lines || 1 }).map((_, index) => {
        const isSmall = index > 0 && (index % 3 === 0 || index % 7 === 0);

        return (
          <View
            key={index}
            {...props}
            style={[
              { width: isSmall ? `${random(20, 100)}%` : "100%" },
              style,
              { backgroundColor: "#000" },
            ]}
          />
        );
      })}
    </View>
  );
}

export function Skeleton(props: ViewProps) {
  const animatedValue = new Animated.Value(0);
  const clock = new Clock();

  useCode(
    () => block([startClock(clock), set(animatedValue, runTiming(clock))]),
    [clock, animatedValue]
  );

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width * 1, width * 1],
  });

  return (
    // @ts-ignore
    <MaskedView style={{ flex: 1 }} maskElement={<Container {...props} />}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(153, 109, 255, 0.4)",
          opacity: 0.2,
        }}
      >
        <AnimatedLinearGradient
          // Background Linear Gradient
          colors={[
            "rgba(153, 109, 255, 0.2)",
            "rgba(153, 109, 255, 0.4)",
            "rgba(153, 109, 255, 0.6)",
            "rgba(153, 109, 255, 0.8)",
            "rgba(153, 109, 255, 1)",
            "rgba(255, 135, 110, 1)",
            "rgba(255, 208, 114, 1)",
            "rgba(255, 208, 114, 0.8)",
            "rgba(255, 208, 114, 0.6)",
            "rgba(255, 208, 114, 0.4)",
            "rgba(255, 208, 114, 0.2)",
          ]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[
            StyleSheet.absoluteFill,
            {
              transform: [{ translateX: translateX }],
            },
          ]}
        />
      </View>
    </MaskedView>
  );
}

Skeleton.Box = Box;
Skeleton.Text = Text;
