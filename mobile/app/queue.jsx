import { router } from "expo-router";
import { FlatList, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Card from "../components/ui/Card";
import ScreenContainer from "../components/ui/ScreenContainer";
import { useSound } from "../stores/sound";

export default function QueueScreen() {
  const { playbackQueue, soundFile } = useSound();
  const insets = useSafeAreaInsets();

  if (playbackQueue.length === 0) {
    router("/");
  }

  return (
    <ScreenContainer
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="h-full"
    >
      <Text className="px-3 text-4xl font-semibold text-white">Queue: </Text>
      <FlatList
        className="px-2"
        data={playbackQueue}
        renderItem={({ item }) => (
          <Card
            className={`${item.filename === soundFile.filename ? "bg-indigo-500/50 rounded-lg" : ""} px-3`}
          >
            <Text className={`text-xl text-white`}>{item.filename}</Text>
          </Card>
        )}
        extraData={soundFile}
      />
    </ScreenContainer>
  );
}
