import { LinearGradient } from "expo-linear-gradient";
import { bgPrimaryColor } from "../../constants/colors";

export default function ScreenContainer(props) {
  return (
    <LinearGradient colors={["#312e81", bgPrimaryColor]} {...props}>
      {props.children}
    </LinearGradient>
  );
}
