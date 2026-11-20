import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';

export default function ProductDetailScreen({
  C,
  styles,
  selectedProduct,
  setScreen,
  toggleFavorite,
  favourites,
  money,
  Button,
  addToCart,
}) {
  if (!selectedProduct) {
    return null;
  }

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.pageContent}
      >
        <View style={styles.detailTopBar}>
          <Pressable
            onPress={() => setScreen('home')}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>‹</Text>
          </Pressable>

          <Text style={styles.detailTopTitle}>
            A little something for you
          </Text>

          <Pressable
            onPress={() => toggleFavorite(selectedProduct.id)}
            style={styles.detailHeart}
          >
            <Text
              style={[
                styles.heartText,
                favourites.includes(selectedProduct.id) && {
                  color: C.deepPink,
                },
              ]}
            >
              {favourites.includes(selectedProduct.id) ? '♥' : '♡'}
            </Text>
          </Pressable>
        </View>

        <View
          style={[
            styles.detailImagePanel,
            { backgroundColor: selectedProduct.color },
          ]}
        >
          <View style={styles.detailImageOrb} />

          <Image
            source={selectedProduct.image}
            style={styles.detailImage}
            resizeMode="contain"
          />

          <Text style={styles.detailSparkleOne}>✦</Text>
          <Text style={styles.detailSparkleTwo}>✧</Text>
        </View>

        <View style={styles.detailMetaRow}>
          <Text style={styles.detailCategory}>
            {selectedProduct.category.toUpperCase()}
          </Text>
        </View>

        <Text style={styles.detailName}>
          {selectedProduct.name}
        </Text>

        <Text style={styles.detailPrice}>
          {money(selectedProduct.price)}
        </Text>

        <View style={styles.detailLabel}>
          <Text style={styles.detailLabelText}>
            ✿ {selectedProduct.label}
          </Text>
        </View>

        <Text style={styles.detailDescription}>
          {selectedProduct.description}
        </Text>

        <View style={styles.detailFeatureRow}>
          <View style={styles.detailFeature}>
            <Text style={styles.detailFeatureIcon}>♡</Text>
            <Text style={styles.detailFeatureText}>
              Made for{' \n'}everyday study
            </Text>
          </View>

          <View style={styles.detailFeature}>
            <Text style={styles.detailFeatureIcon}>✦</Text>
            <Text style={styles.detailFeatureText}>
              Cute desk{' \n'}energy
            </Text>
          </View>

          <View style={styles.detailFeature}>
            <Text style={styles.detailFeatureIcon}>✓</Text>
            <Text style={styles.detailFeatureText}>
              Student{' \n'}approved
            </Text>
          </View>
        </View>

        <Button
          title={`Add to my bag · ${money(selectedProduct.price)}`}
          onPress={() => addToCart(selectedProduct)}
          styles={styles}
          style={{ marginTop: 22 }}
        />

        <Button
          title="Keep browsing"
          variant="secondary"
          onPress={() => setScreen('home')}
          styles={styles}
          style={{ marginTop: 10 }}
        />
      </ScrollView>

    </>
  );
}
