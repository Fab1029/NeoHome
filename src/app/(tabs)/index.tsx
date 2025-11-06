import BackGround from "@/src/components/BackGround";
import CommandAction from "@/src/components/CommandAction";
import LoadingSkeleton from "@/src/components/LoadingSkeleton";
import RecordButton from "@/src/components/RecordButton";
import { colors } from "@/src/constants/colors";
import fonts from "@/src/constants/fonts";
import { Action } from "@/src/models/Action";
import { recordingTexts } from "@/src/utils/generals";
import { useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
  const [action, setAction] = useState<Action>();
  const [processingAudio, setProcessingAudio] = useState(false);
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

      <RecordButton setTextRecording={setTextRecording} setAction={setAction} setProcessingAudio={setProcessingAudio}/>

      {(processingAudio && !action) && (
        <LoadingSkeleton/>
      )}

      {action && (
        <CommandAction
          name={action.name}
          icon={action.icon}
          state={action.state}
          onHide={() => {
            setAction(undefined);
            setProcessingAudio(false);
            setTextRecording(recordingTexts[0]);
          }}
        />
      )}

      <BackGround/>
    </SafeAreaView>
  );
}
