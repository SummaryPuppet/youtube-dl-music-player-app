import { useSafeAreaInsets } from "react-native-safe-area-context";
import ListDownload from "../../components/ListDownload";
import SearchDownload from "../../components/SearchDownload";
import ScreenContainer from "../../components/ui/ScreenContainer";

export default function DownloadMusicPage() {
  const insets = useSafeAreaInsets();

  return (
    <ScreenContainer
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: 5,
        gap: 9,
      }}
      className={`h-screen`}
    >
      <SearchDownload />
      <ListDownload />
    </ScreenContainer>
  );
}
