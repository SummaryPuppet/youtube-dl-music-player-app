import { useEffect } from "react";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";
import TrackPlayer, { useProgress } from "react-native-track-player";

export default function PlayerProgressBar() {
  const { position, duration } = useProgress();

  const min = useSharedValue(0);
  const max = useSharedValue(1);
  const progress = useSharedValue(0);

  const handleSliderChange = async (newPositionNumber) => {
    await TrackPlayer.seekTo(newPositionNumber * duration);
  };

  useEffect(() => {
    progress.value = duration > 0 ? position / duration : 0;
  });

  return (
    <Slider
      className="flex-none w-full"
      progress={progress}
      minimumValue={min}
      maximumValue={max}
      onSlidingComplete={(newPosition) => handleSliderChange(newPosition)}
    />
  );
}
