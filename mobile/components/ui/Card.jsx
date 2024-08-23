import { View } from "react-native";

export default function Card(props) {
  return (
    <View
      className="px-1 py-2 mb-2 border-b-4 rounded border-b-indigo-900/20 "
      {...props}
    >
      {props.children}
    </View>
  );
}
