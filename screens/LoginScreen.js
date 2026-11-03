
import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function LoginScreen({
  C,
  styles,
  BrandMark,
  Button,
  authMode,
  setAuthMode,
  name,
  setName,
  username,
  setUsername,
  email,
  setEmail,
  emailError,
  setEmailError,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  handleAuth,
}) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.authScreen}
    >
      <ScrollView
        contentContainerStyle={styles.authScroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.authDecorTop}>
          <View style={styles.decorDotPink} />
          <View style={styles.decorDotBlue} />
          <Text style={styles.decorSparkle}>✦</Text>
        </View>

        <BrandMark />

        <Text style={styles.authBrand}>academia</Text>
        <Text style={styles.authTagline}>
          little things for big ideas
        </Text>

        <View style={styles.authIllustration}>
          <Image
            source={require('../assets/products/cloud-notebook.png')}
            style={styles.authProductArt}
            resizeMode="contain"
          />
          <View style={styles.authSticker}>
            <Text style={styles.authStickerText}>
              ✿ study happy ✿
            </Text>
          </View>
        </View>

        <View style={styles.authCard}>
          <Text style={styles.authHeading}>
            {authMode === 'login' ? 'Welcome!' : 'Join Academia!'}
          </Text>

          <Text style={styles.authSubheading}>
            {authMode === 'login'
              ? 'Your next favourite study essential awaits.'
              : 'Create an account for your stationery wishlist.'}
          </Text>

          {authMode === 'signup' && (
            <>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Full name"
                placeholderTextColor={C.muted}
                style={styles.input}
                autoCapitalize="words"
              />

              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Choose a username"
                placeholderTextColor={C.muted}
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </>
          )}

          <TextInput
            value={email}
            onChangeText={(value) => {
              setEmail(value);
              setEmailError('');
            }}
            placeholder={
              authMode === 'login'
                ? 'Email, username, or full name'
                : 'Email address'
            }
            placeholderTextColor={C.muted}
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {authMode === 'signup' && emailError !== '' && (
            <Text
              style={
                emailError === 'Email available'
                  ? styles.emailAvailableText
                  : styles.emailErrorText
              }
            >
              {emailError}
            </Text>
          )}

          <TextInput
            placeholder={
              authMode === 'signup'
                ? 'Create a password (6+ characters)'
                : 'Password'
            }
            placeholderTextColor={C.muted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={[styles.input, styles.passwordInput]}
          />

          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={styles.showPasswordButton}
          >
            <Text style={styles.showPasswordText}>
              {showPassword ? 'Hide password' : 'Show password'}
            </Text>
          </Pressable>

          <Button
            title={
              authMode === 'login'
                ? 'Log in  ♡'
                : 'Create my account  ✿'
            }
            onPress={handleAuth}
            style={{ marginTop: 8 }}
          />

          <Pressable
            onPress={() =>
              setAuthMode(authMode === 'login' ? 'signup' : 'login')
            }
            style={styles.authSwitch}
          >
            <Text style={styles.authSwitchText}>
              {authMode === 'login'
                ? 'New around here? '
                : 'Already part of the club? '}

              <Text style={styles.authSwitchStrong}>
                {authMode === 'login' ? 'Sign up' : 'Log in'}
              </Text>
            </Text>
          </Pressable>
        </View>

        <Text style={styles.demoNote}>
          Demo app · no real account or payment is created
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
