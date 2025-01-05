import { Pressable } from "react-native";
import { useTheme } from "../../stores/theme";

export default function FloatingButton({ onPress, children }) {
  const { themes, currentTheme } = useTheme();

  return (
    <Pressable
      style={{
        backgroundColor: themes[currentTheme].primaryColor,
      }}
      className="absolute z-50 p-4 rounded-full bottom-10 right-5"
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}
