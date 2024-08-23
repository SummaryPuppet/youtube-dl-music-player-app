import { useState } from "react";
import { Alert, Pressable, Text, TextInput } from "react-native";
import { downloadInServer } from "../lib/downloadSongs";

function SearchDownload() {
  const [value, setValue] = useState("");

  const onPress = async () => {
    if (value.length === 0) {
      return;
    }

    const response = await downloadInServer(value);

    if (response.status === "OK") {
      Alert.alert("Download in server", "Success");
    } else if (response.status === "ERR") {
      Alert.alert("Error in server", "Error downloading song");
    }
  };
  return (
    <>
      <Text className="text-3xl font-bold text-center text-white">
        Download from YT into Server
      </Text>
      <TextInput
        className="p-1 text-white border-2 border-indigo-700 rounded-md bg-none"
        onChangeText={setValue}
        value={value}
        placeholder="youtube link"
      />
      <Pressable className="py-2 bg-indigo-700 rounded" onPress={onPress}>
        <Text className="text-lg text-center text-white">
          Download in Server
        </Text>
      </Pressable>
    </>
  );
}

export default SearchDownload;
