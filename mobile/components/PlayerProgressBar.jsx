import { useEffect } from "react";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";
import { useSound } from "../stores/sound";

export default function PlayerProgressBar() {
  const { sound } = useSound();

  const duration = useSharedValue(0);
  const min = useSharedValue(0);
  const progress = useSharedValue(30);

  const handleSliderChange = async (newPositionNumber) => {
    if (sound) {
      await sound.setPositionAsync(Math.floor(newPositionNumber));
    }
  };

  useEffect(() => {
    function load() {
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          duration.value = status.durationMillis;
          progress.value = status.positionMillis;
        }
      });
    }
    load();
  }, [sound, duration, progress]);

  return (
    <Slider
      className="flex-none w-full"
      progress={progress}
      minimumValue={min}
      maximumValue={duration}
      onSlidingComplete={(newPosition) => handleSliderChange(newPosition)}
    />
  );
}
