import { useState } from "react";
import { Alert, Text, TextInput } from "react-native";
import { downloadInServer } from "../lib/downloadSongs";
import { useTheme } from "../stores/theme";
import Button from "./ui/Button";

function SearchDownload() {
  const [value, setValue] = useState("");
  const { themes, currentTheme } = useTheme();

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
        className={`p-1 text-white border-2 border-${themes[currentTheme].bgTailwindColor} rounded-md bg-none`}
        onChangeText={setValue}
        value={value}
        placeholder="youtube link"
      />
      <Button onPress={onPress}>
        <Text className="text-lg text-center text-white">
          Download in Server
        </Text>
      </Button>
    </>
  );
}

export default SearchDownload;
