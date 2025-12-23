import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'
import { colors } from '../constants/colors'
import fonts from '../constants/fonts'
import { sensorLevels } from '../data/Sensors'
import { Sensor } from '../models/Sensors'

const SensorCard = ({id, name, icon, data}: Sensor) => {
    const [color, setColor] = useState(colors.surface.secondary);


    useEffect(() => {
        switch(data.toLocaleLowerCase()){
            case sensorLevels[0].toLocaleLowerCase():
                setColor("gray");
            break;
            case sensorLevels[1].toLocaleLowerCase():
                setColor(colors.warning);
            break;
            case sensorLevels[2].toLocaleLowerCase():
                setColor(colors.error);
            break;
        }

    }, [data]);

  return (
    <View
        style={{
            width: '100%' , 
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
        <Text>
            {data}
        </Text>
        
        <View
            style={{
                padding: 5,
                height: 40,
                width: 40,
                borderRadius: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'flex-end',
                backgroundColor: colors.surface.primary,
                borderWidth: 1,
                borderColor: color,
                borderStyle: "dashed"
            }}
        >
            <Image
                style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
                tintColor: color
                }}
                source={icon}
            />
        </View>
    </View>
  )
}

export default SensorCard