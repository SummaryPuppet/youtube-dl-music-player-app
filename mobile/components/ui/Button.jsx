import { Pressable } from "react-native";
import { useTheme } from "../../stores/theme";

export default function Button({ onPress, className, children }) {
  const { themes, currentTheme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      className={`py-2 rounded bg-${themes[currentTheme].bgTailwindColor} ${className}`}
    >
      {children}
    </Pressable>
  );
}
