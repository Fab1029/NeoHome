import BackGround from '@/src/components/BackGround'
import { colors } from '@/src/constants/colors'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const notify = () => {
  const snapPoints = ['20%', '80%'];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background.primary
      }}
    >
      <BackGround/>
    </SafeAreaView>
  )
}

export default notify