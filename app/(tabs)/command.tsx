import BackGround from '@/components/BackGround'
import { colors } from '@/constants/colors'
import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const command = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background.primary
      }}
    >
      <Text>command</Text>
      <BackGround/>
    </SafeAreaView>
  )
}

export default command