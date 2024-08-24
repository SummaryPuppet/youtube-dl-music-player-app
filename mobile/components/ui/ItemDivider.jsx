import { View } from "react-native";

export default function ItemDivider({ h = "2" }) {
  return <View className={`h-${h} bg-indigo-900/20`} />;
}
