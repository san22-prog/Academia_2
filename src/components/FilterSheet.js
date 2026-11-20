import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { CATEGORIES, PRICE_RANGES } from '../helpers/catalog';
import { useAppStore } from '../store';
import Button from './Button';
import Pill from './Pill';

export default function FilterSheet({ C, styles }) {
  const visible = useAppStore((state) => state.filterOpen);
  const filterDraft = useAppStore((state) => state.filterDraft);
  const updateFilterDraft = useAppStore((state) => state.updateFilterDraft);
  const closeFilters = useAppStore((state) => state.closeFilters);
  const clearFilterDraft = useAppStore((state) => state.clearFilterDraft);
  const applyFilters = useAppStore((state) => state.applyFilters);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={closeFilters}>
      <View style={styles.modalBackdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={closeFilters} />
        <View style={styles.filterSheet}>
          <View style={styles.sheetHandle} />
          <View style={styles.sheetHeader}>
            <View>
              <Text style={styles.sheetTitle}>Find your kind of cute</Text>
              <Text style={styles.sheetSubtitle}>A few little filters to help</Text>
            </View>
            <Pressable onPress={closeFilters} style={styles.sheetClose} accessibilityLabel="Close filters">
              <Text style={styles.sheetCloseText}>×</Text>
            </Pressable>
          </View>
          <Text style={styles.filterLabel}>CATEGORY</Text>
          <View style={styles.filterChips}>
            {CATEGORIES.map((item) => (
              <Pill
                key={item}
                title={item}
                active={filterDraft.category === item}
                onPress={() => updateFilterDraft('category', item)}
                styles={styles}
              />
            ))}
          </View>
          <Text style={styles.filterLabel}>PRICE RANGE</Text>
          <View style={styles.filterChips}>
            {PRICE_RANGES.map((item) => (
              <Pill
                key={item}
                title={item}
                active={filterDraft.priceRange === item}
                onPress={() => updateFilterDraft('priceRange', item)}
                styles={styles}
              />
            ))}
          </View>
          <View style={styles.filterActionRow}>
            <Button
              title="Reset"
              variant="secondary"
              onPress={clearFilterDraft}
              styles={styles}
              style={[styles.button, styles.button_secondary, { flex: 1 }]}
              textStyle={[styles.buttonText, styles.buttonText_secondary]}
            />
            <Button
              title="Show my finds"
              onPress={applyFilters}
              styles={styles}
              style={[styles.button, styles.button_primary, { flex: 1 }]}
              textStyle={[styles.buttonText, styles.buttonText_primary]}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}