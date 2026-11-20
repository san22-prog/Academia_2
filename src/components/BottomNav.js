import React, { useEffect, useRef } from 'react';
import { Animated, Platform, Pressable, Text, View } from 'react-native';
import { navigationStyles as styles } from '../styles';

const tabs = [
  { key: 'home', icon: '⌂', label: 'Home' },
  { key: 'cart', icon: '♡', label: 'My bag' },
  { key: 'profile', icon: '☺', label: 'Profile' },
];

function NavItem({ tab, active, onPress, cartCount }) {
  const scale = useRef(new Animated.Value(active ? 1 : 0.96)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: active ? 1 : 0.96,
      stiffness: 280,
      damping: 22,
      mass: 0.7,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  }, [active, scale]);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={styles.navItem}
    >
      <Animated.View
        style={[
          styles.navIconWrap,
          active && styles.navIconWrapActive,
          { transform: [{ scale }] },
        ]}
      >
        <Text style={[styles.navIcon, active && styles.navIconActive]}>{tab.icon}</Text>
        {tab.key === 'cart' && cartCount > 0 ? (
          <View style={styles.navBadge}>
            <Text style={styles.navBadgeText}>{cartCount}</Text>
          </View>
        ) : null}
      </Animated.View>
      <Text style={[styles.navLabel, active && styles.navLabelActive]}>{tab.label}</Text>
    </Pressable>
  );
}

export default function BottomNav({ active, onNavigate, cartCount }) {
  return (
    <View style={styles.bottomNav}>
      {tabs.map((tab) => (
        <NavItem
          key={tab.key}
          tab={tab}
          active={active === tab.key}
          onPress={() => onNavigate(tab.key)}
          cartCount={cartCount}
        />
      ))}
    </View>
  );
}