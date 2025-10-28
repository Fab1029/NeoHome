import { RecordingPresets, useAudioRecorder } from "expo-audio";
import React, { useRef } from 'react';
import { Alert, Animated, Image, TouchableWithoutFeedback, View } from 'react-native';
import { colors } from '../constants/colors';
import icons from '../constants/icons';
import { usePermission } from '../hooks/UsePermission';
import { recordingTexts } from "../utils/generals";

interface RecordButtonProps {
    setRecording: any;
    setTextRecording: any;
    isLoading: boolean;
    setIsLoading : (value: boolean) => void;
}

const RecordButton = ({setTextRecording, setRecording, isLoading ,setIsLoading}: RecordButtonProps) => {
  const permissions = usePermission();
  const micPermission = permissions?.microphone;
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  // Animations
  const outerScale = useRef(new Animated.Value(1)).current;
  const middleScale = useRef(new Animated.Value(1)).current;

  let loopAnimation: Animated.CompositeAnimation | null = null;

  const startPulse = () => {
    // Animación que “respira” los círculos
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

    } catch (err) {
      console.log(err)
      Alert.alert("No se pudo iniciar la grabación por el momento, inténtalo más tarde")
    }
  };

  const stopRecording = async () => {
    try {
      await audioRecorder.stop();
      setIsLoading(true);
      setRecording(audioRecorder.uri);
      setTextRecording(recordingTexts[2]);

      stopPulse(); 

    } catch (err) {
      Alert.alert("No se pudo iniciar la grabación por el momento, inténtalo más tarde")
    }
  };

  return (
    <TouchableWithoutFeedback 
        disabled={isLoading}
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
