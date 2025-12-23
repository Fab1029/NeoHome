import BackGround from '@/src/components/BackGround'
import NotificationCard from '@/src/components/NotificationCard'
import { colors } from '@/src/constants/colors'
import fonts from '@/src/constants/fonts'
import { useWebSocketStore } from '@/store/webSocketStore'
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const notify = () => {
  
  const { lastMessage } = useWebSocketStore();
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
      if (lastMessage?.type === 'alert') {
        setNotifications(prev => [... prev, {
          id: notifications.length + 1,
          title: lastMessage.title,
          message: lastMessage.message,
          time: new Date().toDateString(),
          type: lastMessage.level
        }]) 
      }
      
    }, [lastMessage]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.background.primary,
        paddingBottom: 80
      }}
    >
      <View style={{ marginTop: 10, marginBottom: 16 }}>
        <Text
          style={{
            fontFamily: 'Bold',
            fontSize: fonts.sizes.xxlarge,
            color: colors.text.primary,
            marginVertical: 15
          }}
        >
          Notificaciones
        </Text>
      </View>
      
      <ScrollView  showsVerticalScrollIndicator={false} style={{paddingHorizontal: 20}}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            rowGap: 10
          }}
        >
          {notifications.map((item) => (
            <NotificationCard 
              key={item.id}
              {...item}
            />
          ))}
        </View>
      </ScrollView>
      <BackGround/>
    </SafeAreaView>
  )
}

export default notify