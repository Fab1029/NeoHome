import BackGround from "@/src/components/BackGround";
import { colors } from "@/src/constants/colors";
import { usePermission } from "@/src/hooks/UsePermission";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const permissions = usePermission();
 

  
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
