import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import { Redirect } from "expo-router";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const loadBackgroundMode = async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        playThroughEarpieceAndroid: false,
      });
    };
    loadBackgroundMode();
  }, []);

  return <Redirect href="/(tabs)/music" />;
}
