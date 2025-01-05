import { Text } from "react-native";

export default function Title({ children }) {
  return (
    <Text className="py-4 text-4xl font-semibold text-center text-white">
      {children}
    </Text>
  );
}
