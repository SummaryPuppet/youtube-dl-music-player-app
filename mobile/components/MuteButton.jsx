import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import TrackPlayer from "react-native-track-player";
import { alternateMute } from "../lib/sound";

export default function MuteButton({ size = 24, color = "white" }) {
  const [volume, setVolume] = useState(1);

  const onPress = async () => {
    const v = await alternateMute();
    setVolume(v);
  };

  useEffect(() => {
    TrackPlayer.getVolume()
      .then((v) => setVolume(v))
      .catch((e) => console.error(e));
  }, []);

  return (
    <Pressable onPress={onPress} className="justify-center">
      <FontAwesome5
        name={volume === 0 ? "volume-mute" : "volume-up"}
        size={size}
        color={color}
      />
    </Pressable>
  );
}
