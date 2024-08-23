import { Audio } from "expo-av";
import { create } from "zustand";

export const useSound = create((set) => ({
  sound: null,
  setSound: (sound) => set(() => ({ sound })),

  nameActiveSound: "",
  setNameActiveSound: (soundName) =>
    set(() => ({ nameActiveSound: soundName })),

  soundFile: null,
  setSoundFile: (soundFile) => set(() => ({ soundFile })),

  soundsInDevice: [],
  setSoundsInDevice: (sounds) => set(() => ({ soundsInDevice: sounds })),

  isPlay: false,
  changeIsPlay: () => set((state) => ({ isPlay: !state.isPlay })),

  isMute: false,
  changeIsMute: () => set((state) => ({ isMute: !state.isMute })),

  isLoop: false,
  changeIsLoop: () => set((state) => ({ isLoop: !state.isLoop })),

  playbackQueue: [],

  addToQueue: (sound) =>
    set((state) => ({ playbackQueue: [...state.playbackQueue, sound] })),

  playNextInQueue: async () => {
    const { soundFile, playbackQueue, sound } = useSound.getState();
    const indexCurrentSound = playbackQueue.indexOf(soundFile);
    const nextIndex = indexCurrentSound + 1;

    if (playbackQueue.length > nextIndex) {
      if (sound) {
        await sound.unloadAsync();
      }

      const newSoundFile = playbackQueue[nextIndex];
      const newFileName = newSoundFile.filename;

      const { sound: newSound } = await Audio.Sound.createAsync(
        {
          uri: newSoundFile.uri,
        },
        {
          shouldPlay: true,
        }
      );

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          useSound.getState().playNextInQueue();
        }
      });

      useSound.setState({
        sound: newSound,
        nameActiveSound: newFileName,
        soundFile: newSoundFile,
        isPlay: true,
      });
    } else {
      useSound.setState({
        sound: null,
        soundFile: null,
        nameActiveSound: "",
        isPlay: false,
      });
    }
  },

  playPreviousInQueue: async () => {
    const { soundFile, playbackQueue, sound } = useSound.getState();
    const indexCurrentSound = playbackQueue.indexOf(soundFile);
    const previousIndex = indexCurrentSound - 1;

    if (indexCurrentSound > 0) {
      if (sound) {
        await sound.unloadAsync();
      }

      const newSoundFile = playbackQueue[previousIndex];
      const newFileName = newSoundFile.filename;

      const { sound: newSound } = await Audio.Sound.createAsync(
        {
          uri: newSoundFile.uri,
        },
        {
          shouldPlay: true,
        }
      );

      useSound.setState({
        sound: newSound,
        nameActiveSound: newFileName,
        soundFile: newSoundFile,
        isPlay: true,
      });
    }
  },

  removeFromQueue: (filename) =>
    set((state) =>
      state.playbackQueue.filter((sound) => sound.filename !== filename)
    ),

  clearQueue: () => set(() => ({ playbackQueue: [] })),
}));
