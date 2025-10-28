import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../constants/colors'
import fonts from '../constants/fonts'
import { Actuator } from '../models/Actuator'

const ActuatorCard = ({id, name, icon, commandOn, commandOff, state}: Actuator) => {
  return (
    <TouchableOpacity
      style={[
        {width: 150 , height: 135, padding: 10, borderRadius: 25, backgroundColor: colors.surface.secondary, justifyContent: 'space-between'}, 
        state.toLocaleLowerCase() === 'on' && 
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
          fontSize: fonts.sizes.xlarge,
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
    </TouchableOpacity>
  )
}

export default ActuatorCard