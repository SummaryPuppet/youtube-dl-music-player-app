import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Card from "../components/ui/Card";
import FloatingButton from "../components/ui/FloatingButton";
import ScreenContainer from "../components/ui/ScreenContainer";
import Title from "../components/ui/Title";
import { savePlaylist } from "../lib/playlists";
import { useTracks } from "../stores/library";
import { usePlaylistStore } from "../stores/playlist";
import { useTheme } from "../stores/theme";

export default function CreatePlaylistPage() {
  const insets = useSafeAreaInsets();
  const { themes, currentTheme } = useTheme();
  const [value, setValue] = useState("");
  const tracks = useTracks();
  const [selectedTracks, setSelectedTracks] = useState([]);
  const { playlists, setPlaylists } = usePlaylistStore();

  const onPress = async () => {
    console.log(selectedTracks);
    try {
      if (!value) return;
      if (!selectedTracks.length) return;
      if (Object.keys(playlists).includes(value)) return;

      await savePlaylist(value, selectedTracks);
      setPlaylists({ ...playlists, [value]: selectedTracks });
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScreenContainer
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      className="items-center h-full"
    >
      <Title>Create Playlist</Title>

      <TextInput
        style={{ borderColor: themes[currentTheme].primaryColor }}
        className={`py-1 pl-3 text-white w-11/12 border-2 mb-4 rounded-full bg-none`}
        onChangeText={setValue}
        value={value}
        placeholder="playlist name"
      />

      <FlatList
        data={tracks}
        ItemSeparatorComponent={() => <View h="1" />}
        ListFooterComponent={() => <View className="h-5" />}
        renderItem={({ item: sound }) => (
          <Card
            style={{
              backgroundColor: selectedTracks.includes(sound.title)
                ? "#ffffff40"
                : "transparent",
            }}
          >
            <Pressable
              className="w-11/12"
              onPress={() => {
                if (selectedTracks.includes(sound.title)) {
                  setSelectedTracks(
                    selectedTracks.filter((t) => t !== sound.title)
                  );
                  return;
                }
                setSelectedTracks([...selectedTracks, sound.title]);
              }}
            >
              <Text className="text-lg text-white/90" numberOfLines={1}>
                {sound.title}
              </Text>
            </Pressable>
            <Pressable onPress={() => {}}></Pressable>
          </Card>
        )}
      />

      <FloatingButton moveForPlayer={false} onPress={onPress}>
        <Ionicons name="add" color="white" size={32} />
      </FloatingButton>
    </ScreenContainer>
  );
}
