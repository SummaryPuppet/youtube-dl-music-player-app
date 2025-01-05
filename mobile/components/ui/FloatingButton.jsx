import { forwardRef } from "react";
import { Pressable } from "react-native";
import { useActiveTrack } from "react-native-track-player";
import { useTheme } from "../../stores/theme";

const FloatingButton = forwardRef(
  ({ onPress, moveForPlayer = true, children }, ref) => {
    const { themes, currentTheme } = useTheme();
    const track = useActiveTrack();

    return (
      <Pressable
        ref={ref}
        style={{
          backgroundColor: themes[currentTheme].primaryColor,
          bottom: moveForPlayer ? (track ? 125 : 60) : 40,
        }}
        className="absolute z-50 p-4 rounded-full right-5"
        onPress={onPress}
      >
        {children}
      </Pressable>
    );
  }
);

FloatingButton.displayName = "FloatingButton";

export default FloatingButton;
