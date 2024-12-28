import { View } from "react-native";
import { useTheme } from "../../stores/theme";

export default function ImagePlaceholder(props) {
  const { themes, currentTheme } = useTheme();
  return (
    <View
      className={`rounded-3xl h-72 w-72 bg-${themes[currentTheme].tailwindColor}-700 `}
      {...props}
    />
  );
}
