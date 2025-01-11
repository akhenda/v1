import { StyleSheet } from 'react-native';
import type { BaseToastProps, ToastShowParams } from 'react-native-toast-message';
import Toast, { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';

export interface ToasterType extends ToastShowParams {
  type?: 'success' | 'error' | 'info';
}

const fontFamily = {
  light: 'WorkSans-Light',
  regular: 'WorkSans-Regular',
  medium: 'WorkSans-Medium',
  bold: 'WorkSans-Bold',
};

const styles = StyleSheet.create({
  // Global styles
  wrapper: { height: 'auto', width: '90%', paddingVertical: 8 },
  container: { paddingHorizontal: 16 },
  text1: { fontFamily: fontFamily.regular, fontSize: 16, lineHeight: 24, fontWeight: '600' },
  text2: { fontFamily: fontFamily.regular, fontSize: 14, lineHeight: 17 },

  // Scoped styles
  success: { borderLeftColor: '#2a9d8f' },
  error: { borderLeftColor: '#ef233c' },
  info: { borderLeftColor: '#e9c46a' },
});

/**
 * Configuration for the Toast component.
 */
export const toastConfig = {
  /**
   * Toast component for success messages.
   * @param props Props for the BaseToast component.
   * @returns A JSX element for the success toast.
   */
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      contentContainerStyle={styles.container}
      style={[styles.wrapper, styles.success]}
      text1Style={styles.text1}
      text2NumberOfLines={2}
      text2Style={styles.text2}
    />
  ),
  /**
   * Toast component for error messages.
   * @param props Props for the ErrorToast component.
   * @returns A JSX element for the error toast.
   */
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      contentContainerStyle={styles.container}
      style={[styles.wrapper, styles.error]}
      text1Style={styles.text1}
      text2NumberOfLines={2}
      text2Style={styles.text2}
    />
  ),
  /**
   * Toast component for informational messages.
   * @param props Props for the InfoToast component.
   * @returns A JSX element for the info toast.
   */
  info: (props: BaseToastProps) => (
    <InfoToast
      {...props}
      contentContainerStyle={styles.container}
      style={[styles.wrapper, styles.info]}
      text1Style={styles.text1}
      text2NumberOfLines={2}
      text2Style={styles.text2}
    />
  ),
};

/**
 * Utility functions for showing and hiding toasts.
 */
export const Toaster = {
  /**
   * Show a toast with given parameters.
   * @param showParams Parameters for the toast.
   * If type is not provided, it defaults to 'error'.
   * If visibilityTime is not provided, it defaults to 5000.
   * If topOffset is not provided, it defaults to 50.
   */
  show(showParams: ToasterType) {
    Toast.show({ type: 'error', visibilityTime: 5000, topOffset: 50, ...showParams });
  },

  /**
   * Hide the currently visible toast.
   */
  hide() {
    Toast.hide();
  },
};
