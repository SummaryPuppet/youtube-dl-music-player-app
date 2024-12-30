import { useEffect } from "react";
import { Text, View } from "react-native";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";
import TrackPlayer, { useProgress } from "react-native-track-player";
import { useTheme } from "../stores/theme";

export default function PlayerProgressBar() {
  const { position, duration } = useProgress();
  const { themes, currentTheme } = useTheme();

  const min = useSharedValue(0);
  const max = useSharedValue(1);
  const progress = useSharedValue(0);

  const handleSliderChange = async (newPositionNumber) => {
    await TrackPlayer.seekTo(newPositionNumber * duration);
  };

  const getMinutes = (time) => Math.floor(time / 60);
  const getSeconds = (time) => Math.floor(time % 60);

  useEffect(() => {
    progress.value = duration > 0 ? position / duration : 0;
  });

  return (
    <>
      <Slider
        containerStyle={{ height: 7, borderRadius: 16 }}
        renderBubble={() => null}
        thumbWidth={0}
        theme={{
          minimumTrackTintColor: themes[currentTheme].primaryColor,
          maximumTrackTintColor: themes[currentTheme].bgPrimaryColor,
        }}
        className="flex-none w-full"
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        onSlidingComplete={(newPosition) => handleSliderChange(newPosition)}
      />

      <View className="flex-row justify-between mt-4">
        <Text className="text-white">0:00</Text>
        <Text className="text-white">
          {getMinutes(duration)}:{getSeconds(duration)}
        </Text>
      </View>
    </>
  );
}
