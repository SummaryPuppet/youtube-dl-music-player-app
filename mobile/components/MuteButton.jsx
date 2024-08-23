import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Pressable } from "react-native";
import { useSound } from "../stores/sound";

export default function MuteButton({ size = 24, color = "white" }) {
  const { sound, isMute, changeIsMute } = useSound();

  const onPress = async () => {
    if (sound) {
      if (!isMute) {
        await sound.setIsMutedAsync(true);
      } else {
        await sound.setIsMutedAsync(false);
      }
      changeIsMute();
    }
  };
  return (
    <Pressable onPress={onPress} className="justify-center">
      <FontAwesome5
        name={isMute ? "volume-mute" : "volume-up"}
        size={size}
        color={color}
      />
    </Pressable>
  );
}
