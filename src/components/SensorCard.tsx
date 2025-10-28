import React from 'react'
import { Image, Text, View } from 'react-native'
import { colors } from '../constants/colors'
import fonts from '../constants/fonts'
import { Sensor } from '../models/Sensors'

const SensorCard = ({id, name, icon, command}: Sensor) => {
  return (
    <View
        style={{
            width: 150 , 
            height: 135, 
            padding: 10, borderRadius: 25, 
            backgroundColor: colors.surface.secondary, justifyContent: 'space-between'
        }}
    >
        <Text
            style={{
                fontFamily: 'Bold',
                fontSize: fonts.sizes.xlarge,
                color: colors.text.primary
            }}
        >
            {name}
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
                tintColor: colors.text.primary
                }}
                source={icon}
            />
        </View>
    </View>
  )
}

export default SensorCard