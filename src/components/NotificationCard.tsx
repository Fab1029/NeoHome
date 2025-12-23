import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { colors } from '../constants/colors'
import fonts from '../constants/fonts'
import { notifyLevels } from '../data/Notifications'
import { Notification } from '../models/Notification'

const NotificationCard = ({id, title, message, time, type}: Notification) => {
    const [color, setColor] = useState(colors.surface.secondary);
    
    
    useEffect(() => {
        switch(type.toLocaleLowerCase()){
            case notifyLevels[0].toLocaleLowerCase():
                setColor(colors.warning);
            break;
            case notifyLevels[1].toLocaleLowerCase():
                setColor(colors.error);
            break;
        }

    }, [type]);

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
            {title}
        </Text>
        <Text>
            {message}
        </Text>
        <Text>
            {time}
        </Text>
        <View
            style={{
                backgroundColor: '#fff',
                width: 60,
                borderRadius: 30,
                paddingVertical: 5,
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-end',
                borderWidth: 1,
                borderColor: color,
                borderStyle: "dashed"
            }}
        >
            <Text>
                {type.toLocaleLowerCase()}
            </Text>
        </View>
        
    </View>
  )
}

export default NotificationCard