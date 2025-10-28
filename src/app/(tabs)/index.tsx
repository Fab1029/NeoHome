import BackGround from "@/src/components/BackGround";
import CommandAction from "@/src/components/CommandAction";
import RecordButton from "@/src/components/RecordButton";
import { colors } from "@/src/constants/colors";
import fonts from "@/src/constants/fonts";
import { actuators } from "@/src/data/Actuators";
import { recordingTexts } from "@/src/utils/generals";
import { useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [recording, setRecording] = useState(null);
  const [textRecording, setTextRecording] = useState(recordingTexts[0]);
  

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.background.primary
      }}
    >

     <Text
        style={{
            width: '90%',
            fontFamily: 'Bold',
            textAlign: 'center',
            marginVertical: 50,
            color: colors.text.primary,
            fontSize: fonts.sizes.xxlarge
        }}
      >
        {textRecording}
      </Text>

      <RecordButton setTextRecording={setTextRecording} setRecording={setRecording}/>

      <CommandAction name={actuators[0].name} icon={actuators[0].icon} state={actuators[0].state}/>
      
      <BackGround/>
    </SafeAreaView>
  );
}
