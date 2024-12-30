import { View } from "react-native";
import { useTheme } from "../../stores/theme";

export default function ImagePlaceholder(props) {
  const { themes, currentTheme } = useTheme();
  console.log(themes[currentTheme].primaryColor);
  return (
    <View
      className={`rounded-3xl h-72 w-72  self-center`}
      style={{
        backgroundColor: themes[currentTheme]?.primaryColor,
      }}
      {...props}
    />
  );
}
