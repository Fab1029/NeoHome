import ActuatorCard from '@/src/components/ActuatorCard'
import BackGround from '@/src/components/BackGround'
import DefaultButton from '@/src/components/DefaultButton'
import Filter from '@/src/components/Filter'
import SensorCard from '@/src/components/SensorCard'
import { colors } from '@/src/constants/colors'
import fonts from '@/src/constants/fonts'
import icons from '@/src/constants/icons'
import { actuators } from '@/src/data/Actuators'
import { sensors } from '@/src/data/Sensors'
import { filters } from '@/src/utils/generals'
import BottomSheet from '@gorhom/bottom-sheet'
import React, { useRef, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Command = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedFilter, setSelectedFilter] = useState(filters);
  
  const handleOpenFilter = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        position: 'relative',
        backgroundColor: colors.background.primary
      }}
    >
      <View
        style={{
          marginTop: 10,
          marginRight: 20, 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'flex-end',   
        }}
      >
        <DefaultButton icon={icons.filterIcon} onPress={handleOpenFilter}/>
      </View>
      
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 100
        }}
      >
        {selectedFilter.find((f) => f.filter === filters[0].filter)?.value && (
          <>
            <Text
              style={{
                fontFamily: 'Bold',
                fontSize: fonts.sizes.xlarge,
                color: colors.text.primary,
                marginBottom: 10
              }}
            >
              Sensores
            </Text>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                rowGap: 10
              }}
            >
              {sensors.map((item) => (
                <SensorCard key={item.id} {...item} />
              ))}
            </View>
          </>
          
        )}
        
        {selectedFilter.find((f) => f.filter === filters[1].filter)?.value && (
          <>
            <Text
              style={{
                fontFamily: 'Bold',
                fontSize: fonts.sizes.xlarge,
                color: colors.text.primary,
                marginVertical: 15
              }}
            >
              Actuadores
            </Text>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              rowGap: 10
            }}
          >
            {actuators.map((item) => (
              <ActuatorCard key={item.id} {...item} />
            ))}
          </View>
          </>
          
        )}
        
      </ScrollView>
      <Filter bottomSheetRef={bottomSheetRef} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter}/>
      <BackGround />
    </SafeAreaView>
  )
}

export default Command
