import { useEffect, useState } from "react";
import { FlatList, Pressable, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TrackPlayer, { useActiveTrack } from "react-native-track-player";
import Card from "../components/ui/Card";
import ScreenContainer from "../components/ui/ScreenContainer";

export default function QueueScreen() {
  const insets = useSafeAreaInsets();
  const activeTrack = useActiveTrack();
  const [tracks, setTracks] = useState([]);

  const onPress = async (trackIndex) => {
    await TrackPlayer.skip(trackIndex);
  };

  useEffect(() => {
    TrackPlayer.getQueue()
      .then((t) => setTracks(t))
      .catch((e) => console.error(e));
  }, []);

  // if (playbackQueue.length === 0) {
  //   router("/");
  // }

  return (
    <ScreenContainer
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="h-full"
    >
      <Text className="px-3 text-4xl font-semibold text-white">Queue: </Text>
      <FlatList
        className="px-2"
        data={tracks}
        renderItem={({ item: track, index }) => (
          <Card
            className={`${track?.title === activeTrack?.title ? "bg-indigo-500/50 rounded-lg" : ""} px-3`}
          >
            <Pressable onPress={() => onPress(index)}>
              <Text className={`text-xl text-white`}>{track?.title}</Text>
            </Pressable>
          </Card>
        )}
        extraData={activeTrack}
      />
    </ScreenContainer>
  );
}
