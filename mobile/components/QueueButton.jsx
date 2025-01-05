import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { Pressable } from "react-native";

export default function QueueButton({ size = 58, color = "white" }) {
  const onPress = () => {
    router.push("/queue");
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
    >
      <MaterialIcons size={size} color={color} name="queue-music" />
    </Pressable>
  );
}
