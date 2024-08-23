import Feather from "@expo/vector-icons/Feather";
import { Pressable } from "react-native";
import { useSound } from "../stores/sound";

export default function RepeatButton({
  size = 35,
  colorActive = "white",
  colorOff = "#aaa",
}) {
  const { sound, isLoop, changeIsLoop } = useSound();

  const onPress = async () => {
    if (sound) {
      if (!isLoop) {
        await sound.setIsLoopingAsync(true);
      } else {
        await sound.setIsLoopingAsync(false);
      }
      changeIsLoop();
    }
  };

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
