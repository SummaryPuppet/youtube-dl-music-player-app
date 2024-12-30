import { Pressable } from "react-native";
import { useTheme } from "../../stores/theme";

export default function Button({ onPress, className, children }) {
  const { themes, currentTheme } = useTheme();

  return (
    <Pressable
      style={{ backgroundColor: themes[currentTheme].primaryColor }}
      onPress={onPress}
      className={`py-2 rounded ${className}`}
    >
      {children}
    </Pressable>
  );
}
