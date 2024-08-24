import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { allSongs, downloadInDevice } from "../lib/downloadSongs";
import DownloadCard from "./DownloadCard";

export default function ListDownload() {
  const [serverSongs, setServerSongs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadSongs = async () => {
    try {
      setLoading(true);
      const data = await allSongs();
      setServerSongs(data);
    } catch (error) {
      Alert.alert(error);
    } finally {
      setLoading(false);
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
  }, []);

  return (
    <>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={serverSongs}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={<View className="h-2 bg-indigo-900/20" />}
          ListEmptyComponent={
            <Text className="text-lg text-white">No connect to server</Text>
          }
          ListFooterComponent={<View className="h-24 bg-indigo-900/20" />}
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
