import images from '@/src/constants/images'
import React from 'react'
import { Image, View } from 'react-native'

const BackGround = () => {
  return (
    <View
        style={{
            zIndex: -1,
            height: 200,
            bottom: 0,
            width: '100%',
            position: 'absolute',
        }}
    >
      <Image
        style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover'
        }}
        source={images.backGroundTabBar}
      />
    </View>
  )
}

export default BackGround