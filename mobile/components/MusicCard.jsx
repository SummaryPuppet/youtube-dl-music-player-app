import Feather from "@expo/vector-icons/Feather";
import { Pressable, Text } from "react-native";

import { useTheme } from "../stores/theme";
import Card from "./ui/Card";

export default function MusicCard({ title, titleOnPress, sound, moreOnPress }) {
  const { themes, currentTheme } = useTheme();

  return (
    <Card className="flex-row justify-between gap-3">
      <Pressable onPress={() => titleOnPress(sound)} className="w-5/6">
        <Text className="text-lg text-white/90" numberOfLines={1}>
          {title}
        </Text>
      </Pressable>
      <Pressable onPress={() => moreOnPress(sound)}>
        <Feather
          name="more-vertical"
          color={themes[currentTheme].primaryColor}
          size={34}
        />
      </Pressable>
    </Card>
  );
}
