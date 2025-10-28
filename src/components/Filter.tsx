// Filter.tsx
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/colors';
import fonts from '../constants/fonts';
import { filters } from '../utils/generals';
import CustomSwitch from './CustomSwitch';

interface FilterProps {
  selectedFilter: any;
  bottomSheetRef: any;
  setSelectedFilter: any;
}

const Filter = ({ selectedFilter, setSelectedFilter, bottomSheetRef }: FilterProps) => {
  const snapPoints = ['60%'];

  const handleSelectFilters = (type: string, value: boolean) => {
    const updatedFilters = selectedFilter.map((f: any) =>
      f.filter === type ? { ...f, value } : f
    );
    setSelectedFilter(updatedFilters);
  };

  const handleResetFilters = () => {
    setSelectedFilter(filters);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: colors.background.primary }}
    >
      <BottomSheetView>
        
        <View
          style={{
            position: 'relative'
          }}
        >
          <View/>
          <Text
            style={{
              fontFamily: 'Bold',
              textAlign: 'center',
              color: colors.text.primary,
              fontSize: fonts.sizes.xlarge
            }}
          >
            Filtro
          </Text>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 8,
              right: 18,
            }}
            onPress={handleResetFilters}
          >
            <Text
              style={{
                fontFamily: 'Medium',
                color: colors.primary,
                fontSize: fonts.sizes.medium
              }}
            >
              Reset
            </Text> 
          </TouchableOpacity>
        </View>

        <View
          style={{
            paddingHorizontal: 10
          }}
        >
          <CustomSwitch name='Sensores' filter = {selectedFilter[0]} onChange={handleSelectFilters}/>
          <CustomSwitch name='Actuadores' filter = {selectedFilter[1]} onChange={handleSelectFilters}/>
        </View>

      </BottomSheetView>
    </BottomSheet>
  );
};

export default Filter;
