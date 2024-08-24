// import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, RefreshControl, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import MusicCard from "../../components/MusicCard";
import { router } from "expo-router";
import TrackPlayer from "react-native-track-player";
import MusicCard from "../../components/MusicCard";
import SearchSound from "../../components/SearchSound";
import ScreenContainer from "../../components/ui/ScreenContainer";
import { generateTrackPlayerSongsFormat, getSounds } from "../../lib/sound";
import { addComputedTracks, addTracks, useTracks } from "../../stores/library";

export default function MainPage() {
  /*
  const {
    isPlay,
    changeIsPlay,
    sound,
    setSound,
    setNameActiveSound,
    setSoundFile,
    soundsInDevice,
    setSoundsInDevice,
    addToQueue,
    clearQueue,
  } = useSound();*/
  const insets = useSafeAreaInsets();
  const tracks = useTracks();
  const [refreshing, setRefreshing] = useState(false);

  const loadSounds = async () => {
    const data = await getSounds();
    const dataFiltered = data.filter(
      (value) => !value?.filename?.startsWith("AUD")
    );

    const trackPlayerData = generateTrackPlayerSongsFormat(dataFiltered);
    addTracks(trackPlayerData);
    addComputedTracks(trackPlayerData);
  };

  const onPress = async (sound) => {
    try {
      await TrackPlayer.reset();
      await TrackPlayer.add(sound);
      await TrackPlayer.play();

      router.push("/player");
    } catch (error) {
      console.error(error);
    }
  };

  const moreOnPress = async (sound) => {
    await TrackPlayer.add(sound);
    Alert.alert("Add to queue");
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadSounds();
    setRefreshing(false);
  };

  useEffect(() => {
    loadSounds();
  }, []);

  return (
    <ScreenContainer
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      className="h-screen"
    >
      <Text className="px-2 text-3xl font-bold text-white">Search: </Text>
      <SearchSound />

      <FlatList
        className="px-2"
        data={tracks}
        renderItem={({ item: sound }) => (
          <MusicCard
            title={sound.title}
            titleOnPress={onPress}
            sound={sound}
            moreOnPress={moreOnPress}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </ScreenContainer>
  );
}
