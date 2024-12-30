import Feather from "@expo/vector-icons/Feather";
import { Pressable } from "react-native";
import TrackPlayer, { useActiveTrack } from "react-native-track-player";
import { useTracks } from "../stores/library";
import { useTheme } from "../stores/theme";

export default function ShuffleButton() {
  const { themes, currentTheme } = useTheme();
  const tracks = useTracks();
  const track = useActiveTrack();

  const onPress = async () => {
    const shuffled = shuffle(tracks);

    await TrackPlayer.reset();
    await TrackPlayer.setQueue(shuffled);
    await TrackPlayer.play();
  };

  if (track) return null;

  return (
    <Pressable
      style={{
        backgroundColor: themes[currentTheme].primaryColor,
      }}
      className="absolute z-50 p-4 rounded-full bottom-10 right-5"
      onPress={onPress}
    >
      <Feather name="shuffle" size={32} color={"white"} />
    </Pressable>
  );
}

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
