import MusicInfo from "expo-music-info-2";
import { saveImg } from "./fs";

export const getArtwork = async (fileUri) => {
  const { picture } = await MusicInfo.getMusicInfoAsync(fileUri, {
    title: false,
    artist: false,
    album: false,
    picture: true,
  });

  if (picture?.pictureData) {
    return saveImg(picture.pictureData);
  }

  return picture?.pictureData;
};
