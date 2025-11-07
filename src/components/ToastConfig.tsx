import { colors } from '@/src/constants/colors';
import fonts from '@/src/constants/fonts';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
  // ✅ Toast de ÉXITO
  success: (props:any) => (
    <BaseToast
      {...props}
      style={{
        padding:5,
        borderLeftColor: colors.primary,
        backgroundColor: colors.secondary + '20',
        borderRadius: 14,
        borderWidth: 0,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
      }}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      text1Style={{
        fontSize: fonts.sizes.large,
        fontFamily: 'Bold',
        color: colors.text.primary,
      }}
      text2Style={{
        fontSize: fonts.sizes.medium,
        fontFamily: fonts.fonts.Regular,
        color: colors.text.secondary,
      }}
    />
  ),

  // ⚠️ Toast de ERROR
  error: (props:any) => (
    <ErrorToast
      {...props}
      style={{
        padding:5,
        borderLeftColor: colors.error,
        backgroundColor: colors.error + '20',
        borderRadius: 14,
        borderWidth: 0,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
      }}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      text1Style={{
        fontSize: fonts.sizes.large,
        fontFamily: 'Bold',
        color: colors.text.primary,
      }}
      text2Style={{
        fontSize: fonts.sizes.medium,
        fontFamily: fonts.fonts.Regular,
        color: colors.text.secondary,
      }}
    />
  ),

  // ℹ️ Toast de INFORMACIÓN
  info: (props:any) => (
    <BaseToast
      {...props}
      style={{
        padding:5,
        borderLeftColor: colors.success,
        backgroundColor: colors.success + '20',
        borderRadius: 14,
        borderWidth: 0,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
      }}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      text1Style={{
        fontSize: fonts.sizes.large,
        fontFamily: 'Bold',
        color: colors.text.primary,
      }}
      text2Style={{
        fontSize: fonts.sizes.medium,
        fontFamily: fonts.fonts.Regular,
        color: colors.text.secondary,
      }}
    />
  ),
};
