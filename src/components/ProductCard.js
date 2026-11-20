import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { money } from '../helpers/formatters';

export default function ProductCard({ product, onOpen, onAdd, favorite, onFavorite, C, styles }) {
  return (
    <View style={styles.productCard}>
      <Pressable onPress={onOpen} style={styles.productImageWrap}>
        <Image source={product.image} style={styles.productImage} resizeMode="contain" />
        <View style={styles.productLabel}>
          <Text style={styles.productLabelText}>{product.label}</Text>
        </View>
      </Pressable>
      <Pressable
        onPress={onFavorite}
        style={styles.heartButton}
        accessibilityRole="button"
        accessibilityLabel={favorite ? 'Remove from favourites' : 'Add to favourites'}
      >
        <Text style={[styles.heartText, favorite && { color: C.deepPink }]}>
          {favorite ? '♥' : '♡'}
        </Text>
      </Pressable>
      <Pressable onPress={onOpen} style={styles.productInfo}>
        <Text style={styles.productCategory}>{product.category.toUpperCase()}</Text>
        <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
        <View style={styles.productPriceRow}>
          <Text style={styles.productPrice}>{money(product.price)}</Text>
        </View>
      </Pressable>
      <Pressable
        onPress={onAdd}
        style={styles.addMini}
        accessibilityRole="button"
        accessibilityLabel={`Add ${product.name} to cart`}
      >
        <Text style={styles.addMiniText}>+</Text>
      </Pressable>
    </View>
  );
}