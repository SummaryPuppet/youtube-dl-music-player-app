import { View } from "react-native";

export default function Card(props) {
  return (
    <View className="px-1 py-2 mb-2 rounded " {...props}>
      {props.children}
    </View>
  );
}
