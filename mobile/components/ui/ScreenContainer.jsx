import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../stores/theme";

export default function ScreenContainer(props) {
  const { themes, currentTheme } = useTheme();

  return (
    <LinearGradient
      colors={[
        themes[currentTheme].secondaryColor,
        themes[currentTheme].bgPrimaryColor,
      ]}
      {...props}
    >
      {props.children}
    </LinearGradient>
  );
}
