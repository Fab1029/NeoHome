import { RecordingPresets, setAudioModeAsync, useAudioRecorder } from "expo-audio";
import React, { useRef, useState } from "react";
import { Animated, Image, TouchableWithoutFeedback, View } from "react-native";
import Toast from "react-native-toast-message";
import { colors } from "../constants/colors";
import icons from "../constants/icons";
import { useBLEContext } from "../context/BLEContext";
import { actuators } from "../data/Actuators";
import APIClassifier from "../features/classifier/APIClassifier";
import Classifier from "../features/classifier/Classifier";
import APISpeechToText from "../features/convert/APISpeechToText";
import Converter from "../features/convert/Converter";
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
  const [isDisableButton, setIsDisableButton] = useState(false);
  const converter: Converter = new Converter(new APISpeechToText());
  const classifier: Classifier = new Classifier(new APIClassifier());
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const { sendData } = useBLEContext();

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
      if (!micPermission) return;

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

    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error al iniciar grabación',
        text2: 'Verifica permisos o inténtalo nuevamente.',
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
        if (audioUri) {
          setProcessingAudio(true);
          setTextRecording(recordingTexts[2]);

          const command = await converter.convert(audioUri);
          
          if (command) {
            const commandResponse = await classifier.clasify(command);
            if (commandResponse) {
              setTextRecording(recordingTexts[3]);

              const action = actuators.find(
                (a) => commandResponse === a.commandOn || commandResponse === a.commandOff
              );
               /* Esta accion se muestra como una card al momento de realizarse */
              setAction({
                icon: action?.icon,
                name: action?.name,
                state: action?.commandOn === commandResponse ? "on" : "off",
              });
              sendData(commandResponse);
            }
            else{
              setTextRecording(recordingTexts[0]);
              Toast.show({
                type: 'error',
                text1: 'Error de acción',
                text2: 'Acción no deinida en el aplicativo',
              });
            }
          }
          else{    
            setTextRecording(recordingTexts[0]);
            Toast.show({
              type: 'error',
              text1: 'Error al convertir el audio',
              text2: 'Se produjo un error al convertir el audio, inténtalo nuevamente',
            });
          }
        }
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error en grabación',
        text2: 'Se produjo un error la grabar el audio, inténatalo nuevamente',
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
