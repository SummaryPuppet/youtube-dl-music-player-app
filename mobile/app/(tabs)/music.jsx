import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MusicCard from "../../components/MusicCard";
import ScreenContainer from "../../components/ui/ScreenContainer";
import { sendNotification } from "../../lib/notifications";
import { createSound, getSounds } from "../../lib/sound";
import { useSound } from "../../stores/sound";

export default function MainPage() {
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
  } = useSound();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);

  const loadSounds = async () => {
    const data = await getSounds();
    const dataFiltered = data.filter(
      (value) => !value?.filename?.startsWith("AUD")
    );
    setSoundsInDevice(dataFiltered);
  };

  const onPress = async (item) => {
    try {
      if (isPlay) {
        sound.unloadAsync();
        changeIsPlay();
        clearQueue();
      }

      const s = await createSound(item.uri);
      setSound(s);
      changeIsPlay();

      const itemName =
        item.filename.split(".").length > 2
          ? item.filename
          : item.filename.split(".")[0];
      setNameActiveSound(itemName);

      setSoundFile(item);
      addToQueue(item);

      sendNotification({
        title: `Playing Song 🎶`,
        body: `You're listening: ${itemName}`,
        data: item,
      });

      router.push("/player");
    } catch (error) {
      console.error(error);
    }
  };

  const moreOnPress = (item) => {
    addToQueue(item);
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
      <FlatList
        className="px-2"
        data={soundsInDevice}
        renderItem={({ item: sound }) => (
          <MusicCard
            title={sound.filename}
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
