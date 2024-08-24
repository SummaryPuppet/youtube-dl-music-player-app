import { TextInput, View } from "react-native";
import { searchTracks } from "../stores/library";

export default function SearchSound() {
  const onChangeText = (text) => {
    searchTracks(text);
  };

  return (
    <View className="px-2 py-3">
      <TextInput
        className="w-full p-1 text-lg text-white border-2 border-indigo-500 rounded-lg"
        onChangeText={onChangeText}
      />
    </View>
  );
}
