import { Image, Pressable, StyleSheet, Text } from "react-native";

export default function DownloadCard({ title, imgUrl, onPress, onPressProp }) {
  return (
    <Pressable
      className="flex-row gap-3 py-2 mb-2 border-b-4 rounded border-b-indigo-900/20"
      onPress={() => onPress(onPressProp)}
    >
      <Image
        style={styles.cardImg}
        className="rounded-xl"
        source={{ uri: imgUrl }}
      />
      <Text className="w-3/4 text-lg text-white/90" numberOfLines={1}>
        {title}
      </Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  cardImg: {
    width: 75,
    height: 75,
  },
});
