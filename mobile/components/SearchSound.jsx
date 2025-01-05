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
    <View
      style={{ borderColor: themes[currentTheme].primaryColor }}
      className="flex flex-row items-center justify-around gap-2 pb-1 pr-2 m-2 border-2 rounded-full"
    >
      <TextInput
        className={`w-5/6 p-1 text-lg text-white rounded-lg`}
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
