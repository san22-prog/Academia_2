import { Platform, StyleSheet } from 'react-native';
import theme from './theme';

export const shellStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.cream },
  background: { flex: 1, backgroundColor: theme.cream },
  screenFrame: { flex: 1 },
});

export const navigationStyles = StyleSheet.create({
  bottomNav: {
    minHeight: 70,
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderTopWidth: 1,
    borderTopColor: '#F1E7ED',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: Platform.OS === 'ios' ? 4 : 2,
    paddingTop: 7,
  },
  navItem: { alignItems: 'center', justifyContent: 'center', width: '33.3%' },
  navIconWrap: {
    width: 37,
    height: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  navIconWrapActive: { backgroundColor: theme.blush },
  navIcon: { fontSize: 21, color: '#A5A0B0', lineHeight: 25 },
  navIconActive: { color: theme.deepPink },
  navLabel: { color: '#A5A0B0', fontSize: 9, marginTop: 2, fontWeight: '700' },
  navLabelActive: { color: theme.deepPink, fontWeight: '900' },
  navBadge: {
    position: 'absolute',
    right: -3,
    top: -3,
    minWidth: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: theme.deepPink,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: theme.white,
  },
  navBadgeText: { color: theme.white, fontSize: 8, fontWeight: '900' },
});