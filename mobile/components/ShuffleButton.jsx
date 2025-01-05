import Feather from "@expo/vector-icons/Feather";
import TrackPlayer, { useActiveTrack } from "react-native-track-player";
import { useTracks } from "../stores/library";
import FloatingButton from "./ui/FloatingButton";

export default function ShuffleButton() {
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
    <FloatingButton onPress={onPress}>
      <Feather name="shuffle" size={32} color={"white"} />
    </FloatingButton>
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
