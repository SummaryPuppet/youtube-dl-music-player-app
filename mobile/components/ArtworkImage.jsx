import { Image } from "react-native";
import ImagePlaceholder from "./ui/ImagePlaceholder";

export default function ArtworkImage({ uri = "" }) {
  if (uri === "" || uri === undefined) {
    return <ImagePlaceholder className="self-center" />;
  }

  console.log("no soy undefined");
  console.log(uri);

  return <Image style={{ width: 200, height: 200 }} source={{ uri }} />;
}
