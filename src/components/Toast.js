import React from 'react';
import { Text, View } from 'react-native';
import { useAppStore } from '../store';

export default function Toast({ screen, styles }) {
  const toast = useAppStore((state) => state.toast);
  if (!toast || screen === 'auth') return null;

  return (
    <View pointerEvents="none" style={styles.toast} accessibilityLiveRegion="polite">
      <Text style={styles.toastText}>{toast}</Text>
    </View>
  );
}