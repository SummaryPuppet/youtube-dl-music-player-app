import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { Pressable } from "react-native";

export default function QueueButton({ size = 58, color = "white" }) {
  const onPress = () => {
    router.push("/queue");
  };

  return (
    <Pressable onPress={onPress}>
      <MaterialIcons size={size} color={color} name="queue-music" />
    </Pressable>
  );
}
