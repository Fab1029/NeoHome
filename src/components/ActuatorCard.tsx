import { healthCheck, sendAction } from "@/services/backend"
import Slider from '@react-native-community/slider'
import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import Toast from "react-native-toast-message"
import { colors } from '../constants/colors'
import fonts from '../constants/fonts'
import { useActuatorState } from '../context/ActionContext'
import { Actuator } from '../models/Actuator'

type Props = Actuator & {
  onPress: () => void;
};

const ActuatorCard = ({id, name, icon, commandOn, commandOff, state, angleValue, intensity, onPress}: Props) => {
  const [sliderValue, setSliderValue] = useState(50);

  const hasSlider = (intensity || angleValue) ? true : false;
  const { toggleActuatorState, setActuatorIntensity } = useActuatorState();

  const handlePress = async () => {
    try {
      await healthCheck();
 
      state.toLocaleLowerCase() === 'on' 
        ? await sendAction(commandOff)
        : await sendAction(commandOn);
     
      onPress(); 
      toggleActuatorState(id);

    }catch(error) {
      Toast.show({
        type: 'error',
        text1: `${error}`,
        text2: 'Intente nuevamente',
        visibilityTime: 3000
      });
    }
    
  }

  const handleSliderComplete = async(value: number) => {
    const roundedValue = Math.round(value);
    
    let sliderCommand = '';

    if (angleValue) {
      const angle = Math.round((roundedValue / 100) * 180); 
      
      const prefix = angleValue.charAt(0);
      
      sliderCommand = `${prefix}${angle}#`;
      
      setActuatorIntensity(id, sliderCommand);
      console.log(`Enviando Ángulo para ${name}: ${sliderCommand} (Valor Slider: ${roundedValue})`);
      
    } else if (intensity) {
      const prefixMatch = intensity.match(/([a-zA-Z]+)/);
      const prefix = prefixMatch ? prefixMatch[1] : '';
      
      let finalValue = roundedValue; 

      finalValue = Math.round((roundedValue / 100) * 255);
      sliderCommand = `${prefix}${finalValue}#`; 

      console.log(`Enviando Intensidad para ${name}: ${sliderCommand} (Valor Slider: ${roundedValue})`);
    }
    if (sliderCommand) {
      try {
        await healthCheck();
        sendAction(sliderCommand);
      }catch(error) {
        Toast.show({
          type: 'error',
          text1: `${error}`,
          text2: 'Intente nuevamente',
          visibilityTime: 3000
        });
      }
    }
  };

  const isOn = state.toLocaleLowerCase() === 'on';

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        {width: '45%' , height: 160, padding: 10, borderRadius: 25, backgroundColor: colors.surface.secondary, justifyContent: 'space-between'}, 
        isOn && 
        {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.25,
          shadowRadius: 10,
          elevation: 10,
          backgroundColor: colors.secondary
        }
      ]}
    >
      <Text
        style={{
          fontFamily: 'Bold',
          fontSize: fonts.sizes.large,
          color: state.toLocaleLowerCase() === 'on' ? colors.text.tertiary : colors.text.primary
        }}
      >
        {name}
      </Text>

      <Text
        style={{
          fontFamily: 'Medium',
          fontSize: fonts.sizes.medium,
          color: state.toLocaleLowerCase() === 'on' ? colors.text.tertiary : colors.text.primary
        }}
      >
        {state}
      </Text>
      <View
        style={{
          padding: 5,
          height: 40,
          width: 40,
          borderRadius: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.surface.primary
        }}
      >
        <Image
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
            tintColor: state.toLocaleLowerCase() === 'on' ? colors.text.tertiary : colors.text.primary
          }}
          source={icon}
        />
      </View>

      {isOn && hasSlider && (
        <View
          style={{flexDirection:'row', alignItems:'center', gap:5}}
        >
          <Slider
          style={{ flex: 1, height: 30, transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
          /*style={{ flex: 1, height: 30 }}*/ //para iphone
          minimumValue={0}
          maximumValue={100}
          step={1}
          minimumTrackTintColor={colors.background.primary}
          maximumTrackTintColor={colors.surface.primary}
          thumbTintColor={colors.text.primary}
          value={sliderValue}
          onValueChange={setSliderValue}
          onSlidingComplete={handleSliderComplete}
        />
        <Text style={{color: colors.background.primary}}>
          {sliderValue}%
        </Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

export default ActuatorCard