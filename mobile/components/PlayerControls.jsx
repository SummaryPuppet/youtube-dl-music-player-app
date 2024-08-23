import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable } from "react-native";
import { playStop } from "../lib/sound";
import { useSound } from "../stores/sound";

export const PlayButton = ({ size = 58, color = "white" }) => {
  const { isPlay, sound, changeIsPlay } = useSound();

  const onPress = async () => {
    changeIsPlay();

    try {
      await playStop(sound, isPlay);
    } catch (error) {
      console.error("Player controls" + error);
    }
  };

  return (
    <Pressable onPress={onPress}>
      <Feather name={isPlay ? "pause" : "play"} color={color} size={size} />
    </Pressable>
  );
};

export const SkipToPreviousButton = ({ size = 38, color = "white" }) => {
  const { playPreviousInQueue } = useSound();

  const onPress = () => {
    try {
      playPreviousInQueue();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Pressable onPress={onPress}>
      <FontAwesome name="step-backward" color={color} size={size} />
    </Pressable>
  );
};

export const SkipToNextButton = ({ size = 38, color = "white" }) => {
  const { playNextInQueue } = useSound();

  const onPress = () => {
    try {
      playNextInQueue();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Pressable onPress={onPress}>
      <FontAwesome name="step-forward" color={color} size={size} />
    </Pressable>
  );
};
