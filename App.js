import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import AuthScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import ButtonComponent from './src/components/Button';
import BrandMark from './src/components/BrandMark';
import BottomNav from './src/components/BottomNav';
import FilterSheet from './src/components/FilterSheet';
import Pill from './src/components/Pill';
import ProductCard from './src/components/ProductCard';
import Toast from './src/components/Toast';
import { products as PRODUCTS, CATEGORIES, filterProducts } from './src/catalog';
import { findLoginAccount, normalizeEmail, validateSignup } from './src/helpers/auth';
import { getCartItems, getCartSummary } from './src/helpers/cart';
import { money } from './src/helpers/formatters';
import { useAppStore } from './src/store';
import C from './src/theme';
import { shellStyles } from './src/styles';
import styles from './src/screenStyles';
import {
  Alert,
  Animated,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';

const Button = (props) => <ButtonComponent {...props} styles={styles} />;

export default function App() {
  const screen = useAppStore((state) => state.screen);
  const user = useAppStore((state) => state.user);
  const search = useAppStore((state) => state.search);
  const category = useAppStore((state) => state.category);
  const priceRange = useAppStore((state) => state.priceRange);
  const selectedProduct = useAppStore((state) => state.selectedProduct);
  const cart = useAppStore((state) => state.cart);
  const favourites = useAppStore((state) => state.favourites);
  const editProfile = useAppStore((state) => state.editProfile);
  const setScreen = useAppStore((state) => state.navigate);
  const setSearch = useAppStore((state) => state.setSearch);
  const setCategory = useAppStore((state) => state.setCategory);
  const setPriceRange = useAppStore((state) => state.setPriceRange);
  const setSelectedProduct = useAppStore((state) => state.setSelectedProduct);
  const setEditProfile = useAppStore((state) => state.setEditProfile);
  const updateUser = useAppStore((state) => state.updateUser);
  const addToCart = useAppStore((state) => state.addToCart);
  const changeQuantity = useAppStore((state) => state.changeQuantity);
  const removeFromCart = useAppStore((state) => state.removeFromCart);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const notify = useAppStore((state) => state.showToast);
  const enterShop = useAppStore((state) => state.enterShop);
  const logout = useAppStore((state) => state.logout);
  const openFilters = useAppStore((state) => state.openFilters);
  const scrollViewRef = useRef(null);
  const scrollToProducts = () => scrollViewRef.current?.scrollTo({ y: 700, animated: true });
  const [authMode, setAuthMode] = useState('login');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const activeScreen = user ? screen : 'auth';

useEffect(() => {
  const loadAccounts = async () => {
    try {
      const savedAccounts = await AsyncStorage.getItem('academia_accounts');

      if (savedAccounts) {
        const parsedAccounts = JSON.parse(savedAccounts);
        if (Array.isArray(parsedAccounts)) setAccounts(parsedAccounts);
      }
    } catch (error) {
      console.error('Could not load accounts:', error);
    }
  };

  loadAccounts();
}, []);


useEffect(() => {
  if (authMode !== 'signup') {
    setEmailError('');
    return;
  }

  const cleanEmail = normalizeEmail(email);

  if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    setEmailError('');
    return;
  }

  const emailExists = accounts.some((account) => normalizeEmail(account.email) === cleanEmail);

  setEmailError(emailExists ? 'Email unavailable' : 'Email available');
}, [email, accounts, authMode]);




const fade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    fade.setValue(0.96);
    Animated.timing(fade, {
      toValue: 1,
      duration: 180,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  }, [activeScreen, fade]);

const cartItems = useMemo(() => getCartItems(cart, PRODUCTS), [cart]);
const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
const { subtotal, delivery, total } = getCartSummary(cartItems);
const filteredProducts = useMemo(
  () => filterProducts(PRODUCTS, search, category, priceRange),
  [category, priceRange, search],
);


  const showAlert = (title, message) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleAuth = async () => {
    if (authMode === 'signup') {
      const validationError = validateSignup({ name, username, email, password }, accounts);
      if (validationError) {
        if (validationError === 'email-taken') {
          setEmailError('Email unavailable');
          return;
        }

        const messages = {
          required: ['Missing information', 'Please complete every field.'],
          email: ['Invalid email', 'Please enter a valid email address.'],
          password: ['Password too short', 'Use at least 6 characters.'],
        };
        showAlert(...messages[validationError]);
        return;
      }

      const account = {
        name: name.trim(),
        username: username.trim(),
        email: normalizeEmail(email),
        password,
      };

      try {
        const updatedAccounts = [...accounts, account];
        await AsyncStorage.setItem('academia_accounts', JSON.stringify(updatedAccounts));
        setAccounts(updatedAccounts);
        enterShop({ name: account.name, email: account.email });
        setName('');
        setUsername('');
        setEmail('');
        setPassword('');
        showAlert('Welcome to Academia!', 'Your account has been created.');
      } catch (error) {
        showAlert('Error', 'Could not save your account. Please try again.');
        console.error('Could not save account:', error);
      }
      return;
    }

    if (!email.trim() || !password) {
      showAlert('Missing information', 'Enter your email or username and password.');
      return;
    }

    const account = findLoginAccount(email, password, accounts);
    if (!account) {
      showAlert('Login unsuccessful', 'Your login details do not match an account.');
      return;
    }

    enterShop({ name: account.name, email: account.email });
    setName('');
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const renderHeader = (title = 'academia', subtitle = 'little things for big ideas') => (
    <View style={styles.topHeader}>
      <View style={styles.headerLeft}>
        <BrandMark small styles={styles} />
        <View><Text style={styles.headerBrand}>{title}</Text>
        <Text style={styles.headerSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <Pressable onPress={() => setScreen('profile')} style={styles.avatarButton}>
        <Text style={styles.avatarButtonText}>{(user.name || 'A').trim().charAt(0).toUpperCase()}</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={shellStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={C.cream} />
      <View style={shellStyles.background}>
        <Animated.View style={[shellStyles.screenFrame, { opacity: fade }]}>
          {activeScreen === 'auth' ? (
            <AuthScreen
              C={C}
              styles={styles}
              BrandMark={BrandMark}
              Button={Button}
              authMode={authMode}
              setAuthMode={setAuthMode}
              name={name}
              setName={setName}
              username={username}
              setUsername={setUsername}
              email={email}
              setEmail={setEmail}
              emailError={emailError}
              setEmailError={setEmailError}
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              handleAuth={handleAuth}
            />
          ) : screen === 'home' ? (
            <HomeScreen
              C={C}
              styles={styles}
              user={user}
              search={search}
              setSearch={setSearch}
              scrollViewRef={scrollViewRef}
              openFilters={openFilters}
              category={category}
              setCategory={setCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              scrollToProducts={scrollToProducts}
              CATEGORIES={CATEGORIES}
              filteredProducts={filteredProducts}
              ProductCard={ProductCard}
              Pill={Pill}
              setSelectedProduct={setSelectedProduct}
              setScreen={setScreen}
              addToCart={addToCart}
              favourites={favourites}
              toggleFavorite={toggleFavorite}
              Button={Button}
              renderHeader={renderHeader}
            />
          ) : screen === 'detail' ? (
            <ProductDetailScreen
              C={C}
              styles={styles}
              selectedProduct={selectedProduct}
              setScreen={setScreen}
              toggleFavorite={toggleFavorite}
              favourites={favourites}
              money={money}
              Button={Button}
              addToCart={addToCart}
            />
          ) : screen === 'cart' ? (
            <CartScreen
              C={C}
              styles={styles}
              cartItems={cartItems}
              cartCount={cartCount}
              subtotal={subtotal}
              delivery={delivery}
              total={total}
              setScreen={setScreen}
              setSelectedProduct={setSelectedProduct}
              changeQuantity={changeQuantity}
              removeFromCart={removeFromCart}
              onCheckout={(amount) => showAlert(
                'Checkout preview',
                `Your Academia order total is ${money(amount)}. This prototype does not process real payments.`,
              )}
              money={money}
              Button={Button}
              renderHeader={renderHeader}
            />
          ) : (
            <UserProfileScreen
              C={C}
              styles={styles}
              user={user}
              updateUser={updateUser}
              editProfile={editProfile}
              setEditProfile={setEditProfile}
              favourites={favourites}
              cartCount={cartCount}
              Button={Button}
              onLogout={() => {
                setPassword('');
                setEmail('');
                setAuthMode('login');
                logout();
              }}
              onAlert={showAlert}
              notify={notify}
              renderHeader={renderHeader}
            />
          )}
        </Animated.View>
        {activeScreen !== 'auth' ? (
          <BottomNav
            active={activeScreen === 'detail' ? 'home' : activeScreen}
            onNavigate={setScreen}
            cartCount={cartCount}
          />
        ) : null}
        <FilterSheet C={C} styles={styles} />
        <Toast screen={activeScreen} styles={styles} />
      </View>
    </SafeAreaView>
  );
}

