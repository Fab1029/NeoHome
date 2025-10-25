import { colors } from '@/src/constants/colors'
import fonts from '@/src/constants/fonts'
import React from 'react'
import { Image, Text, View } from 'react-native'

interface TabIconProps {
    icon: any,
    focused: boolean,
    title: string
}

const TabIcon = ({icon, focused, title}: TabIconProps) => {
  return (
    <View
        style={{
            minWidth: 80,
            alignItems: 'center',
            justifyContent: 'center'
        }}
    >
      <Image
        style={[
            {width: 32, height: 32},
            focused && {tintColor: colors.primary}
        ]}
        source={icon}
      />
      <Text
        style={[
            {fontFamily: 'Bold', fontSize: fonts.sizes.small, color: colors.text.primary},
            focused && {color: colors.primary}
        ]}
      >
        {title}
      </Text>
    </View>
  )
}

export default TabIcon