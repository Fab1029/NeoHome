import { Tabs } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const TabsLayout = () => {
  return (
    <Tabs>
        <Tabs.Screen
            name='index'
            options={{
                title: 'Voz',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <View></View>
                )
                
            }}
        />
    </Tabs>
  )
}

export default TabsLayout