import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

interface DefaultButtonProps {
    icon: any 
    onPress: any;
}

const DefaultButton = ({icon, onPress}: DefaultButtonProps) => {
  return (
    <TouchableOpacity
        style={{
            width: 35,
            height: 35,
            padding: 5
        }}
        onPress={onPress}
    >
        <Image
            source={icon}
            style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover'
            }}
        />
    </TouchableOpacity>
  )
}

export default DefaultButton