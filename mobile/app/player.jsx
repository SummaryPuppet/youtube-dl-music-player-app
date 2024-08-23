import { Text, View } from "react-native";
import MuteButton from "../components/MuteButton";
import {
  PlayButton,
  SkipToNextButton,
  SkipToPreviousButton,
} from "../components/PlayerControls";
import PlayerProgressBar from "../components/PlayerProgressBar";
import QueueButton from "../components/QueueButton";
import RepeatButton from "../components/RepeatButton";
import ScreenContainer from "../components/ui/ScreenContainer";
import { useSound } from "../stores/sound";

export default function PlayerModalPage() {
  const nameActiveSound = useSound((state) => state.nameActiveSound);

  return (
    <ScreenContainer className={`items-center h-full`}>
      <View className="justify-around flex-1 h-ful">
        <View className="self-center bg-indigo-700 rounded-3xl h-72 w-72" />

        <View className="px-2">
          <PlayerProgressBar />
        </View>

        <Text className="text-xl font-semibold text-center text-white ">
          {nameActiveSound}
        </Text>

        <View className="flex-row items-center justify-around">
          <SkipToPreviousButton size={23} />
          <PlayButton size={52} />
          <SkipToNextButton size={23} />
        </View>

        <View className="flex-row justify-around">
          <RepeatButton size={16} />
          <QueueButton size={22} />
          <MuteButton size={12} />
        </View>
      </View>
    </ScreenContainer>
  );
}
