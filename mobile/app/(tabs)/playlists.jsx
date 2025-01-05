import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { useEffect, useRef } from "react";
import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Card from "../../components/ui/Card";
import FloatingButton from "../../components/ui/FloatingButton";
import ScreenContainer from "../../components/ui/ScreenContainer";
import Title from "../../components/ui/Title";
import { getPlaylists } from "../../lib/playlists";
import { usePlaylistStore } from "../../stores/playlist";

export default function PlaylistsPage() {
  const insets = useSafeAreaInsets();
  const { playlists, setPlaylists } = usePlaylistStore();
  const btnRef = useRef();

  useEffect(() => {
    getPlaylists().then((v) => console.log(v));
  }, [setPlaylists]);

  return (
    <ScreenContainer
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      className="items-center h-full"
    >
      <Title>Playlists</Title>

      {playlists ? (
        Object.entries(playlists).map(([name, tracks]) => (
          <Card
            key={name}
            className="flex flex-row items-center justify-between w-11/12"
          >
            <Text className="text-xl text-white">{name}</Text>
            <Text className="text-lg text-white">{tracks.length}</Text>
          </Card>
        ))
      ) : (
        <Text className="text-white">No playlist yet</Text>
      )}

      <Link href="/createPlaylist" asChild>
        <FloatingButton ref={btnRef}>
          <Ionicons name="add" color="white" size={32} />
        </FloatingButton>
      </Link>
    </ScreenContainer>
  );
}
