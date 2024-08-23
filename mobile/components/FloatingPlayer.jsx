import { router } from "expo-router";
import { Pressable, View } from "react-native";
import { useSound } from "../stores/sound";
import { PlayButton } from "./PlayerControls";
import QueueButton from "./QueueButton";
import MarqueeText from "./ui/MarqueeText";

function FloatingPlayer() {
  const nameActiveSound = useSound((state) => state.nameActiveSound);
  const { soundFile } = useSound();

  const onPress = () => {
    router.push("player/");
  };

  if (!soundFile) return null;

  return (
    <View
      className={`absolute flex-row items-center self-center justify-around w-screen h-16 bg-indigo-900 rounded-2xl bottom-14 px-2`}
    >
      <Pressable onPress={onPress} className="justify-center w-4/5 h-full">
        <MarqueeText text={nameActiveSound} />
      </Pressable>

      <View className="flex-row items-center">
        <QueueButton size={32} />
        <PlayButton size={23} />
      </View>
    </View>
  );
}

export default FloatingPlayer;
