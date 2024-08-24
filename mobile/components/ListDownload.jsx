import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { allSongs, downloadInDevice } from "../lib/downloadSongs";
import DownloadCard from "./DownloadCard";

export default function ListDownload() {
  const [serverSongs, setServerSongs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadSongs = async () => {
    try {
      const data = await allSongs();
      setServerSongs(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onPress = async (item) => {
    await downloadInDevice(item.title, item.id);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadSongs();
    setRefreshing(false);
  };

  useEffect(() => {
    loadSongs();
  }, [setServerSongs]);

  return (
    <>
      {serverSongs.length === 0 ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={serverSongs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DownloadCard
              title={item.title}
              imgUrl={item.thumbnail}
              onPress={onPress}
              onPressProp={item}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </>
  );
}
