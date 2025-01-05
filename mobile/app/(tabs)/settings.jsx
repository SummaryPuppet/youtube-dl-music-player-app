import Feather from "@expo/vector-icons/Feather";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FloatingButton from "../../components/ui/FloatingButton";
import ScreenContainer from "../../components/ui/ScreenContainer";
import Title from "../../components/ui/Title";
import { serverURI } from "../../constants/serverURI";
import { storage } from "../../storage/storage";
import { setTheme, useTheme } from "../../stores/theme";

export default function SettingsPage() {
  const { themes } = useTheme();
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
      className="items-center h-full gap-4"
    >
      <Title>Settings</Title>

      <View className="flex flex-col justify-center">
        <Text className="text-lg text-center text-white">ServerURL: </Text>
        <TextInput
          onChangeText={setServerURL}
          value={serverURL}
          className="w-4/5 p-1 text-lg text-white border-2 border-white rounded-lg"
        />
      </View>

      <View className="gap-2">
        <Text className="text-lg text-center text-white">Themes</Text>

        <View className="flex flex-row gap-2">
          {Object.entries(themes).map(([theme, value]) => (
            <Pressable onPress={async () => await setTheme(theme)} key={theme}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  backgroundColor: value.settingPlaceholdeColor,
                  borderRadius: 24,
                }}
              />
            </Pressable>
          ))}
        </View>
      </View>

      <FloatingButton onPress={onPress}>
        <Feather name="check" size={28} color="white" />
      </FloatingButton>
    </ScreenContainer>
  );
}
