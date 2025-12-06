import { healthCheck, uploadAudio } from "@/services/backend";
import { RecordingPresets, setAudioModeAsync, useAudioRecorder } from "expo-audio";
import React, { useRef, useState } from "react";
import { Animated, Image, TouchableWithoutFeedback, View } from "react-native";
import Toast from "react-native-toast-message";
import { colors } from "../constants/colors";
import icons from "../constants/icons";
import { useActuatorState } from "../context/ActionContext";
import { actuators } from "../data/Actuators";
import { usePermission } from "../hooks/UsePermission";
import { recordingTexts } from "../utils/generals";

interface RecordButtonProps {
  setAction: any;
  setTextRecording: any;
  setProcessingAudio: any;
}

const RecordButton = ({ setTextRecording, setAction, setProcessingAudio }: RecordButtonProps) => {
  const permissions = usePermission();
  const micPermission = permissions?.microphone;
  const { setActuatorState } = useActuatorState();

  const [isDisableButton, setIsDisableButton] = useState(false);
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  

  // Animaciones
  const outerScale = useRef(new Animated.Value(1)).current;
  const middleScale = useRef(new Animated.Value(1)).current;

  let loopAnimation: Animated.CompositeAnimation | null = null;
  const recordingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** ============ ANIMACIONES ============ **/
  const startPulse = () => {
    loopAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(outerScale, { toValue: 1.05, duration: 900, useNativeDriver: true }),
        Animated.timing(outerScale, { toValue: 0.95, duration: 900, useNativeDriver: true }),
        Animated.timing(outerScale, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    );

    const middleLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(middleScale, { toValue: 1.005, duration: 900, useNativeDriver: true }),
        Animated.timing(middleScale, { toValue: 0.905, duration: 900, useNativeDriver: true }),
        Animated.timing(middleScale, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    );

    Animated.parallel([loopAnimation, middleLoop]).start();
  };

  const stopPulse = () => {
    if (loopAnimation) {
      loopAnimation.stop();
    }
    Animated.parallel([
      Animated.spring(outerScale, { toValue: 1, useNativeDriver: true }),
      Animated.spring(middleScale, { toValue: 1, useNativeDriver: true }),
    ]).start();
  };

  /** ============ GRABACIÓN ============ **/
  const startRecording = async () => {
    try {
      if (!micPermission) 
        throw new Error('Sin permisos de microfono');

      const granted = await micPermission.isGranted();
      if (!granted) {
        await micPermission.request();
        return;
      }

      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true
      });

      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();

      setTextRecording(recordingTexts[1]);
      startPulse();

      // Limitar a 8 segundos máximo
      recordingTimeoutRef.current = setTimeout(() => {
        stopRecording();
      }, 8000);

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: `${error}`,
        text2: 'Intentalo nuevamente',
        visibilityTime: 3000
      });
    }
  };

  const stopRecording = async () => {
    try {
      
      if (recordingTimeoutRef.current) {
        clearTimeout(recordingTimeoutRef.current);
        recordingTimeoutRef.current = null;
      }

      if (audioRecorder.isRecording) {
        await audioRecorder.stop();
        stopPulse();
        setIsDisableButton(true);

        const audioUri = audioRecorder.uri;
        
        if(!audioUri)
          throw new Error('Audio file error');

        setProcessingAudio(true);
        setTextRecording(recordingTexts[2]);
        
        await healthCheck();
        const command =  await uploadAudio(audioUri);

        setTextRecording(recordingTexts[3]);

        const action = actuators.find(
          (a) => command.command === a.commandOn || command.command === a.commandOff
        );
        
        if(!action) {
          throw new Error('Action not match');
        }
        
        setAction({
          icon: action?.icon,
          name: action?.name,
          state: action?.commandOn === command.command ? "on" : "off",
        });
        
        setActuatorState(action.id, action?.commandOn === command.command ? "On" : "Off");
      }
    } catch (error) {
      setTextRecording(recordingTexts[0]);
      Toast.show({
        type: 'error',
        text1: `${error}`,
        text2: 'Se produjo un error',
        visibilityTime: 3000
      });
    } finally {
      stopPulse();
      setIsDisableButton(false);
      setProcessingAudio(false);
    }
  };

  /** ============ RENDER ============ **/
  return (
    <TouchableWithoutFeedback
      disabled={isDisableButton}
      onLongPress={startRecording}
      onPressOut={stopRecording}
      delayLongPress={500} // tiempo mínimo presionado antes de iniciar (ms)
    >
      <Animated.View
        style={{
          transform: [{ scale: outerScale }],
          padding: 20,
          marginBottom: 50,
          borderRadius: '100%',
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.primary + "10",
        }}
      >
        <Animated.View
          style={{
            transform: [{ scale: middleScale }],
            padding: 30,
            borderRadius: '100%',
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.secondary + "12",
          }}
        >
          <View
            style={{
              width: 180,
              height: 180,
              padding: 20,
              borderRadius: '100%',
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.text.primary,
            }}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
              }}
              source={icons.microphoneIcon}
            />
          </View>
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default RecordButton;
