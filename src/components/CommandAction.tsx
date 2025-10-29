import React, { useEffect, useRef } from 'react';
import { Animated, Image, Text, View } from 'react-native';
import { colors } from '../constants/colors';
import fonts from '../constants/fonts';

interface CommandActionProps {
  name: string;
  icon: any;
  state: string;
  onHide?: () => void;
}

const CommandAction = ({ name, icon, state, onHide }: CommandActionProps) => {
  const opacity = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current; 

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0, duration: 400, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 40, duration: 400, useNativeDriver: true }),
      ]).start(({ finished }) => {
        if (finished && onHide) onHide();
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateY }],
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
      }}
    >
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
    </Animated.View>
  );
};

export default CommandAction;
