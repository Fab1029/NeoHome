import { Skeleton } from "moti/skeleton";
import React from 'react';
import { View } from 'react-native';
import { colors } from '../constants/colors';

const LoadingSkeleton = () => {
  return (
    <View
        style={{
            padding: 10,   
            width: '70%',    
            borderRadius: 25,

            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: colors.surface.primary
        }}
    >
        <Skeleton colorMode='light' width={40} height={40} radius={100}/>
        <Skeleton colorMode='light' width={100} height={40} radius={100}/>
        <Skeleton colorMode='light' width={40} height={25} radius={10}/>
    </View>
  )
}

export default LoadingSkeleton