# Academia Stationery Shop

Academia is an Expo React Native stationery-shop demo. It includes a local product catalog and front-end-only account, shopping, and profile flows.

## Features

- Sign up with name, username, valid email, and a password of at least six characters; duplicate email addresses are rejected. Login accepts email, username, or name. An account is required to access the shop.
- Search products and combine the search with category and price filters.
- Open product details, toggle favourites, and add products to the cart.
- Increase/decrease quantities, remove cart items, and view subtotal, delivery, and total. Delivery is Rs 40 below Rs 500 and free from Rs 500.
- Edit the current profile, log out, and receive toast notifications for cart and profile actions.
- Browse locally bundled product images; no product image server is required.

## Requirements

- Node.js 22.13.x is the supported runtime. `package.json` declares `>=22.13.0 <23`.
- npm, installed with Node.js.
- Expo Go for a physical device, or a browser / Android or iOS emulator.

## Install and run

From the project directory:

```bash
npm install
npm start
```

Use the Expo terminal menu to open the app on a device or emulator. To run the web version directly:

```bash
npm run web
```

## Tests and web export

```bash
npm test
npm exec -- expo export --platform web
```

Jest uses a Node-only Babel transform for the pure logic tests; Expo/Metro uses `babel-preset-expo` for the application bundle.

## Demo limitations

There is no backend, real authentication, stock service, or payment processing. Demo accounts are saved locally with AsyncStorage for login testing; do not use a real password. Guest/account profile edits, favourites, and cart state are client-side demo data, and signing out clears the current shopping session. Checkout only displays a preview.

## Project structure

```text
Academia/
├── App.js                         # App shell, screen routing, auth orchestration
├── app.json                       # Expo configuration
├── babel.config.js                # Expo preset with a separate Jest environment
├── jest.config.js                 # Focused Node logic tests
├── products.js                    # Local product catalog and image references
├── screens/                       # Auth, Home, Detail, Cart, and Profile views
├── src/
│   ├── catalog.js                  # Catalog exports
│   ├── theme.js                   # Shared color theme
│   ├── styles.js                  # Shell and navigation styles
│   ├── screenStyles.js             # Shared screen styles
│   ├── components/                # Buttons, product cards, filter, nav, toast
│   ├── helpers/                   # Auth, cart, catalog filtering, formatting
│   └── store/                     # Shared Zustand app state
├── tests/                          # Auth, cart, catalog, and store tests
├── assets/products/               # Product images bundled with the app
└── docs/                           # Coursework report files
```
