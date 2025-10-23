import BackGround from "@/components/BackGround";
import { colors } from "@/constants/colors";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.primary
      }}
    >
      <BackGround/>
    </View>
  );
}
