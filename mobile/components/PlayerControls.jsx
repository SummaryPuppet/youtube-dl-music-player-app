import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable } from "react-native";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";

export const PlayButton = ({ size = 58, color = "white" }) => {
  const { playing } = useIsPlaying();

  const onPress = async () => {
    try {
      if (playing) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.play();
      }
    } catch (error) {
      console.error("Player controls" + error);
    }
  };

  return (
    <Pressable onPress={onPress}>
      <Feather name={playing ? "pause" : "play"} color={color} size={size} />
    </Pressable>
  );
};

export const SkipToPreviousButton = ({ size = 38, color = "white" }) => {
  const onPress = async () => {
    try {
      await TrackPlayer.skipToPrevious();
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
  const onPress = async () => {
    try {
      await TrackPlayer.skipToNext();
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
