import Feather from "@expo/vector-icons/Feather";
import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { alternateLoop, isLooping } from "../lib/sound";

export default function RepeatButton({
  size = 35,
  colorActive = "white",
  colorOff = "#aaa",
}) {
  const [isLoop, setIsLoop] = useState(false);

  const onPress = async () => {
    const isL = await alternateLoop();
    setIsLoop(isL);
  };

  useEffect(() => {
    isLooping().then((isL) => setIsLoop(isL));
  }, []);

  return (
    <Pressable onPress={onPress}>
      <Feather
        name="repeat"
        size={size}
        color={isLoop ? colorActive : colorOff}
      />
    </Pressable>
  );
}
