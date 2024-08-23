import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScreenContainer from "../../components/ui/ScreenContainer";
import { serverURI } from "../../constants/serverURI";
import { storage } from "../../storage/storage";

export default function SettingsPage() {
  const [serverURL, setServerURL] = useState("");

  const insets = useSafeAreaInsets();

  const onPress = () => {
    storage.set("server-url", "");
  };

  useEffect(() => {
    const getServerURL = async () => {
      const value = await storage.getString("server-url");

      if (value) {
        setServerURL(value);
      } else {
        await storage.set("server-url", serverURI);
        setServerURL(serverURI);
      }
    };

    getServerURL();
  }, []);

  return (
    <ScreenContainer
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="h-full gap-4"
    >
      <Text className="text-3xl font-semibold text-center text-white">
        Settings
      </Text>

      <View className="items-center justify-evenly h-3/4">
        <View className="">
          <Text className="text-lg text-white">ServerURL: </Text>
          <TextInput
            onChangeText={setServerURL}
            value={serverURL}
            className="w-4/5 p-1 text-lg text-white border-2 border-white rounded-lg"
          />
        </View>

        <Pressable
          onPress={onPress}
          className="px-6 py-2 bg-indigo-700 rounded-lg"
        >
          <Text className="text-lg text-center text-white">Apply changes</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}
