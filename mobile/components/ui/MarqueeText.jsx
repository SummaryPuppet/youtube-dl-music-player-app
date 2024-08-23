import { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

export default function MarqueeText({ text = "", duration = 4000 }) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const containerWidth = Dimensions.get("window").width;

    animatedValue.setValue(containerWidth);

    const animation = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: -containerWidth,
        duration: duration,
        useNativeDriver: true,
      })
    );

    animation.start();

    return () => animation.stop();
  }, [animatedValue, duration]);

  return (
    <View style={styles.container} className="items-center overflow-hidden">
      <Animated.Text
        className="text-lg text-white"
        style={[
          styles.text,
          {
            transform: [{ translateX: animatedValue }],
          },
        ]}
        numberOfLines={1}
      >
        {text}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    justifyContent: "center",
  },
  text: {
    width: Dimensions.get("window").width * 2,
  },
});
