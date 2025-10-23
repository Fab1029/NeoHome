import BackGround from "@/components/BackGround";
import { colors } from "@/constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background.primary
      }}
    >
      <BackGround/>
    </SafeAreaView>
  );
}
