import React from 'react';
import { Pressable, Text } from 'react-native';

export default function Pill({ title, active, onPress, styles }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={[styles.pill, active && styles.pillActive]}
    >
      <Text style={[styles.pillText, active && styles.pillTextActive]}>{title}</Text>
    </Pressable>
  );
}