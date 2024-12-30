import Feather from "@expo/vector-icons/Feather";
import { TextInput, View } from "react-native";
import { searchTracks } from "../stores/library";
import { useTheme } from "../stores/theme";

export default function SearchSound() {
  const { themes, currentTheme } = useTheme();

  const onChangeText = (text) => {
    searchTracks(text);
  };

  return (
    <View className="flex flex-row items-center justify-between w-full gap-2 p-2 py-3">
      <TextInput
        style={{ borderColor: themes[currentTheme].primaryColor }}
        className={`w-5/6 p-1 text-lg text-white border-2 rounded-lg`}
        onChangeText={onChangeText}
      />
      <Feather
        name="search"
        size={28}
        color={themes[currentTheme].primaryColor}
      />
    </View>
  );
}
