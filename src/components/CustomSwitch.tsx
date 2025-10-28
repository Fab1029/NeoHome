import React from 'react';
import { Switch, Text, View } from 'react-native';
import { colors } from '../constants/colors';
import fonts from '../constants/fonts';

interface CustomSwitchProps {
  name: string;
  filter: any;
  onChange: (type: string, value: boolean) => void;
}

const CustomSwitch = ({ name, filter, onChange }: CustomSwitchProps) => {

  const handleOnChange = (newValue: boolean) => {
    onChange(filter.filter, newValue);
  };

  return (
    <View
      style={{
        gap: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Switch
        value={filter.value}
        onValueChange={handleOnChange}
        thumbColor={colors.text.primary}
        trackColor={{
          false: colors.background.secondary,
          true: colors.primary,
        }}
      />
      <Text
        style={{
          fontFamily: 'Regular',
          color: colors.text.primary,
          fontSize: fonts.sizes.medium,
        }}
      >
        {name}
      </Text>
    </View>
  );
};

export default CustomSwitch;
