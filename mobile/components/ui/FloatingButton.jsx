import { Pressable } from "react-native";
import { useActiveTrack } from "react-native-track-player";
import { useTheme } from "../../stores/theme";

export default function FloatingButton({ onPress, children }) {
  const { themes, currentTheme } = useTheme();
  const track = useActiveTrack();

  return (
    <Pressable
      style={{
        backgroundColor: themes[currentTheme].primaryColor,
        bottom: track ? 125 : 10,
      }}
      className="absolute z-50 p-4 rounded-full right-5"
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}
