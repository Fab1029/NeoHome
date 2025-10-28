import { Skeleton } from "moti/skeleton";
import React from 'react';
import { Image, Text, View } from 'react-native';
import { colors } from '../constants/colors';
import fonts from '../constants/fonts';

interface CommandProps {
    name: string;
    icon: any;
    state: string;
    isLoading: boolean
}

const CommandAction = ({name, icon, state, isLoading}: CommandProps) => {

  if (isLoading) {
    return (
        <View
            style={{
                padding: 10,   
                width: '70%',    
                borderRadius: 25,

                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: state.toLowerCase() === 'on' ? colors.secondary : colors.surface.secondary
            }}
        >
            <Skeleton colorMode='light' width={40} height={40} radius={100}/>
            <Skeleton colorMode='light' width={100} height={40} radius={100}/>
            <Skeleton colorMode='light' width={40} height={25} radius={10}/>
        </View>
    )
  }
  
  return (
    <View
        style={{
            padding: 10,   
            width: '70%',    
            borderRadius: 25,

            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: state.toLowerCase() === 'on' ? colors.secondary : colors.surface.secondary
            
        }}
    >
        <View
            style={{
                width: 40,
                height: 40,
                padding: 5,
                alignItems: 'center',
                borderRadius: '100%',
                justifyContent: 'center',
                backgroundColor: colors.surface.primary,
            }}
        >
            <Image 
                source={icon}
                style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                    tintColor: state.toLowerCase() === 'on' ? colors.text.tertiary : colors.text.primary
                }}
            />
        </View>
        <Text
            style={{
                fontFamily: 'Bold',
                fontSize: fonts.sizes.large,
                color: state.toLowerCase() === 'on' ? colors.text.tertiary : colors.text.primary
            }}
        >
            {name}
        </Text>
        <View
            style={{
                borderRadius: 15,
                paddingVertical: 5,
                paddingHorizontal: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.surface.primary,
            }}
        >
            <Text
                style={{
                    fontFamily: 'Bold',
                    fontSize: fonts.sizes.medium,
                    color: state.toLowerCase() === 'on' ? colors.text.tertiary : colors.text.primary
                }}
            >
                {state}
            </Text>
        </View> 
    </View>
  )
}

export default CommandAction