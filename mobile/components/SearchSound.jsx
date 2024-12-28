import Feather from "@expo/vector-icons/Feather";
import { TextInput, View } from "react-native";
import { searchTracks } from "../stores/library";

export default function SearchSound() {
  const onChangeText = (text) => {
    searchTracks(text);
  };

  return (
    <View className="flex flex-row items-center justify-between w-full gap-2 p-2 py-3">
      <TextInput
        className="w-5/6 p-1 text-lg text-white border-2 border-indigo-500 rounded-lg"
        onChangeText={onChangeText}
      />
      <Feather name="search" size={28} color="white" />
    </View>
  );
}
