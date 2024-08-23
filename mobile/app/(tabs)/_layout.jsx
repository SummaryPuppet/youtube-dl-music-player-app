import Feather from "@expo/vector-icons/Feather";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import FloatingPlayer from "../../components/FloatingPlayer";
import { primaryColor } from "../../constants/colors";
export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: primaryColor,
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "500",
          },
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            paddingTop: 4,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderTopWidth: 0,
            backgroundColor: "#030712",
          },
          tabBarActiveBackground: () => (
            <BlurView
              intensity={80}
              experimentalBlurMethod="dimezisBlurView"
              style={{
                ...StyleSheet.absoluteFillObject,
                overflow: "hidden",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
          ),
        }}
      >
        <Tabs.Screen
          name="music"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Feather name="music" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="download"
          options={{
            headerShown: false,

            tabBarIcon: ({ color }) => (
              <Feather name="download" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Feather name="settings" size={28} color={color} />
            ),
          }}
        />
      </Tabs>
      <FloatingPlayer />
    </>
  );
}
