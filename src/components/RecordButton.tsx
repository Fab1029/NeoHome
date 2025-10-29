import { RecordingPresets, useAudioRecorder } from "expo-audio";
import React, { useRef, useState } from 'react';
import { Alert, Animated, Image, TouchableWithoutFeedback, View } from 'react-native';
import { colors } from '../constants/colors';
import icons from '../constants/icons';
import { actuators } from "../data/Actuators";
import APIClassifier from "../features/classifier/APIClassifier";
import { Classifier } from "../features/classifier/Classifier";
import { usePermission } from '../hooks/UsePermission';
import { recordingTexts } from "../utils/generals";

interface RecordButtonProps {
  setAction:any;
  setTextRecording: any;
  setProcessingAudio: any;
}

const RecordButton = ({setTextRecording, setAction, setProcessingAudio}: RecordButtonProps) => {
  const permissions = usePermission();
  const micPermission = permissions?.microphone;
  const classifier: Classifier = new APIClassifier();
  const [isDisableButton, setIsDisableButton] = useState(false);
  /*const converter: Converter = new Converter(new AudioConverter());*/
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  
  // Animaciones
  const outerScale = useRef(new Animated.Value(1)).current;
  const middleScale = useRef(new Animated.Value(1)).current;

  // Referencias a acciones dinamicas
  let loopAnimation: Animated.CompositeAnimation | null = null;
  const recordingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      startPulse(); 

      // Al comenzar la grabacion el usario unicamente podra grabar por 10 segundos
      recordingTimeoutRef.current = setTimeout(() => {
        stopRecording(); 
      }, 8000);

    } catch (err) {
      Alert.alert("No se pudo iniciar la grabación por el momento, inténtalo más tarde")
    }
  };

  const stopRecording = async () => {
    try {
      // Limpiar la referencia si se paro antes del tiempo acordado
      if (recordingTimeoutRef.current) {
        clearTimeout(recordingTimeoutRef.current);
        recordingTimeoutRef.current = null;
      }

      await audioRecorder.stop();

      setIsDisableButton(true);
      setProcessingAudio(true);
      setTextRecording(recordingTexts[2]);

      stopPulse(); 

      /* Realizar acciones de consultas a sistemas externos */
      //const audioUri = audioRecorder.uri;
      const commandResponse = await classifier.execute("Enciende el foco");
      
      if (commandResponse) {
        // Enviar el comando ARDUINO
        
        setTextRecording(recordingTexts[3]);
        const action = actuators.find(actuator => commandResponse === actuator.commandOn || commandResponse === actuator.commandOff);
        
        setAction(
          {
            icon: action?.icon,
            name: action?.name,
            state: action?.commandOn === commandResponse ? 'on' : 'off'
          }
        );
      }
      else {
        Alert.alert("No se pudo realizar el comando, inténtalo más tarde");
      }

    } catch (err) {
      Alert.alert("No se pudo iniciar la grabación por el momento, inténtalo más tarde");
    } finally {
      setIsDisableButton(false);
    }
  };

  return (
    <TouchableWithoutFeedback 
        disabled={isDisableButton}
        onPressIn={startRecording}
        onPressOut={stopRecording}
    >
      <Animated.View
        style={{
            transform: [{ scale: outerScale }],
            padding: 20,
            marginBottom: 50,
            borderRadius: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primary + '10'
        }}
      >
        <Animated.View
            style={{
                transform: [{ scale: middleScale }],
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
                  borderRadius: 100,
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
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

export default RecordButton;
