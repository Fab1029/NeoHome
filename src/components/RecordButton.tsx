import { RecordingPresets, useAudioRecorder } from "expo-audio";
import React from 'react';
import { Alert, Image, TouchableWithoutFeedback, View } from 'react-native';
import { colors } from '../constants/colors';
import icons from '../constants/icons';
import { usePermission } from '../hooks/UsePermission';
import { recordingTexts } from "../utils/generals";

interface RecordButtonProps {
    setRecording: any;
    setTextRecording: any;
}

const RecordButton = ({setTextRecording, setRecording}: RecordButtonProps) => {
  const permissions = usePermission();
  const micPermission = permissions?.microphone;
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);


  const startRecording = async () => {
    try {
      if (!micPermission) return;

      const granted = await micPermission.isGranted();
      if (!granted) {
        await micPermission.request();
        return;
      }

      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();    

      setTextRecording(recordingTexts[1]);

    } catch (err) {
      console.log(err)
      Alert.alert("No se pudo iniciar la grabación por el momento inténtalo más tarde")
    }
  };

  const stopRecording = async () => {
    try {
      await audioRecorder.stop();

      setRecording(audioRecorder.uri);

      setTextRecording(recordingTexts[2]);

    } catch (err) {
      Alert.alert("No se pudo iniciar la grabación por el momento inténtalo más tarde")
    }
  };

  return (
    <TouchableWithoutFeedback 
        onPressIn={startRecording}
        onPressOut={stopRecording}
    >
        <View
            style={{
                padding: 20,
                marginBottom: 50,
                borderRadius: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.primary + '10'
            }}
        >
            <View
                style={{
                    padding: 30,
                    borderRadius: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.secondary + '12'
                }}
            >
                <View
                    style={{
                        width: 180,
                        height: 180,
                        padding: 20,
                        borderRadius: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: colors.text.primary
                    }}
                >
                    <Image
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'cover'
                        }}
                        source={icons.microphoneIcon}
                    />
                </View>
            </View>
        </View>
        
    </TouchableWithoutFeedback>
  )
}

export default RecordButton