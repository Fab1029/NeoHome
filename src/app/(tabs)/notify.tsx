import BackGround from '@/src/components/BackGround'
import { colors } from '@/src/constants/colors'
import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const notify = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background.primary
      }}
    >
      <Text>notify</Text>
      <BackGround/>
    </SafeAreaView>
  )
}

export default notify