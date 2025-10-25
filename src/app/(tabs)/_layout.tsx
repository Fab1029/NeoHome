import TabIcon from '@/src/components/TabIcon'
import { colors } from '@/src/constants/colors'
import icons from '@/src/constants/icons'
import { Tabs } from 'expo-router'
import React from 'react'

const TabsLayout = () => {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          marginTop: 10,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarStyle: {
          marginBottom:25,
          borderRadius: 50,
          marginHorizontal:20,
          
          height: 60,
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.surface.primary
        }
      }}
    >
      <Tabs.Screen
          name='command'
          options={{
              title: 'Comandos',
              headerShown: false,
              tabBarIcon: ({focused}) => (
                  <TabIcon icon={icons.commandTabIcon} focused={focused} title='Comandos'/>
              )
              
          }}
      />

      <Tabs.Screen
          name='index'
          options={{
              title: 'Voz',
              headerShown: false,
              tabBarIcon: ({focused}) => (
                  <TabIcon icon={icons.voiceTabIcon} focused={focused} title='Voz'/>
              )
              
          }}
      />

      <Tabs.Screen
          name='notify'
          options={{
              title: 'Notificaciones',
              headerShown: false,
              tabBarIcon: ({focused}) => (
                  <TabIcon icon={icons.notificationTabIcon} focused={focused} title='Notificaciones'/>
              )
              
          }}
      />
      
      
    </Tabs>
  )
}

export default TabsLayout