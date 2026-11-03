import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Image,
} from 'react-native';


export default function HomeScreen({
  C,
  styles,
  user,
  search,
  setSearch,
  scrollViewRef,
  openFilters,
  category,
  setCategory,
  priceRange,
  setPriceRange,
  scrollToProducts,
  CATEGORIES,
  filteredProducts,
  ProductCard,
  Pill,
  setSelectedProduct,
  setScreen,
  addToCart,
  favourites,
  toggleFavorite,
  Button,
  renderHeader,
  BottomNav,
  navigate,
  cartCount,
}) {


return (
  <View style={{ flex: 1 }}>
    <>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.pageContent}
      >
        {renderHeader()}

        <View style={styles.greetingRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.eyebrow}>
              YOUR LITTLE STUDY CORNER
            </Text>
            <Text style={styles.greeting}>
              Hey, {user.name.split(' ')[0] || 'there'}!{' '}
              <Text style={{ color: C.deepPink }}>✿</Text>
            </Text>
            <Text style={styles.greetingSub}>
              Ready to romanticise your study routine?
            </Text>
          </View>
          <Text style={styles.greetingDoodle}>♡</Text>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Find your next desk bestie..."
              placeholderTextColor="#A19BAD"
              style={styles.searchInput}
              returnKeyType="search"
            />
          </View>
          <Pressable
            onPress={openFilters}
            style={styles.filterButton}
          >
            <Text style={styles.filterIcon}>≡</Text>
          </Pressable>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroCopy}>
            <View style={styles.heroTag}>
              <Text style={styles.heroTagText}>
                THE STUDY EDIT ✦
              </Text>
            </View>
            <Text style={styles.heroTitle}>
              Make space{' \n'}for big ideas.
            </Text>
            <Text style={styles.heroText}>
              Cute stationery. Clear mind. Your kind of study day.
            </Text>
            <Pressable
              onPress={() => {
                setCategory('All Products');
                setPriceRange('Any price');
                setSearch('');
                scrollToProducts();
              }}
              style={styles.heroButton}
            >
              <Text style={styles.heroButtonText}>
                Explore the edit →
              </Text>
            </Pressable>
          </View>

          <View style={styles.heroArt}>
            <Image
              source={require('../assets/products/comboset-001.jpeg')}
              style={styles.heroImage}
              resizeMode="contain"
            />
            <Text style={styles.heroStar}>✦</Text>
          </View>
          <View style={styles.heroBubble} />
        </View>

        <View
          nativeID="product-catalogue"
          style={styles.sectionTitleRow}
        >
          <View>
            <Text style={styles.sectionTitle}>Shop by mood</Text>
            <Text style={styles.sectionSubtitle}>
              A little category therapy
            </Text>
          </View>
          <Text style={styles.sectionDoodle}>♡</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {CATEGORIES.map((item) => (
            <Pill
              key={item}
              title={item}
              active={category === item}
              onPress={() => setCategory(item)}
            />
          ))}
        </ScrollView>

        <View style={styles.sectionTitleRow}>
          <View>
            <Text style={styles.sectionTitle}>
              {search ||
              category !== 'All Products' ||
              priceRange !== 'Any price'
                ? 'Your little finds'
                : 'Desk besties'}
            </Text>
            <Text style={styles.sectionSubtitle}>
              {filteredProducts.length} lovely{' '}
              {filteredProducts.length === 1 ? 'find' : 'finds'} for
              your pencil case
            </Text>
          </View>
          <Pressable onPress={openFilters}>
            <Text style={styles.refineText}>Refine ✧</Text>
          </Pressable>
        </View>

        {filteredProducts.length ? (
          <View style={styles.productGrid}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpen={() => {
                  setSelectedProduct(product);
                  setScreen('detail');
                }}
                onAdd={() => addToCart(product)}
                favorite={favourites.includes(product.id)}
                onFavorite={() => toggleFavorite(product.id)}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptySearch}>
            <Text style={styles.emptyEmoji}>🔎</Text>
            <Text style={styles.emptyTitle}>
              No stationery found just yet
            </Text>
            <Text style={styles.emptyText}>
              Try another search or give your filters a little reset.
            </Text>
            <Button
              title="Clear the filters"
              variant="secondary"
              onPress={() => {
                setSearch('');
                setCategory('All Products');
                setPriceRange('Any price');
              }}
            />
          </View>
        )}

        <View style={styles.footerNote}>
          <Text style={styles.footerNoteIcon}>✿</Text>
          <Text style={styles.footerNoteText}>
            You’re doing better than you think.
          </Text>
        </View>
      </ScrollView>

      <BottomNav
        active="home"
        onNavigate={navigate}
        cartCount={cartCount}
      />
    </>
  </View>
);
}
