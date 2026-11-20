import { create } from 'zustand';
import { CATEGORIES, PRICE_RANGES } from '../helpers/catalog';
import { addCartItem, changeCartQuantity, removeCartItem } from '../helpers/cart';

const defaultFilters = { category: CATEGORIES[0], priceRange: PRICE_RANGES[0] };
let toastTimer;

export const useAppStore = create((set, get) => ({
  screen: 'auth',
  user: null,
  selectedProduct: null,
  search: '',
  category: defaultFilters.category,
  priceRange: defaultFilters.priceRange,
  filterDraft: { ...defaultFilters },
  filterOpen: false,
  cart: {},
  favourites: [],
  editProfile: false,
  toast: '',

  setSearch: (search) => set({ search }),
  setCategory: (category) => set({ category }),
  setPriceRange: (priceRange) => set({ priceRange }),
  setSelectedProduct: (selectedProduct) => set({ selectedProduct }),
  setEditProfile: (editProfile) => set({ editProfile }),
  updateUser: (updates) => set((state) => ({ user: { ...state.user, ...updates } })),
  openFilters: () => set((state) => ({
    filterDraft: { category: state.category, priceRange: state.priceRange },
    filterOpen: true,
  })),
  closeFilters: () => set({ filterOpen: false }),
  updateFilterDraft: (field, value) => set((state) => ({
    filterDraft: { ...state.filterDraft, [field]: value },
  })),
  clearFilterDraft: () => set({ filterDraft: { ...defaultFilters } }),
  applyFilters: () => set((state) => ({
    category: state.filterDraft.category,
    priceRange: state.filterDraft.priceRange,
    filterOpen: false,
  })),
  enterShop: (user) => set({ user, screen: 'home', editProfile: false }),
  navigate: (screen) => set((state) => ({
    screen: state.user ? screen : 'auth',
    editProfile: false,
  })),
  logout: () => set({
    screen: 'auth',
    user: null,
    cart: {},
    favourites: [],
    search: '',
    category: defaultFilters.category,
    priceRange: defaultFilters.priceRange,
    filterOpen: false,
    editProfile: false,
  }),
  addToCart: (product) => {
    set((state) => ({ cart: addCartItem(state.cart, product.id) }));
    get().showToast(`${product.name} added to your bag ♡`);
  },
  changeQuantity: (productId, amount) => set((state) => ({
    cart: changeCartQuantity(state.cart, productId, amount),
  })),
  removeFromCart: (productId) => set((state) => ({
    cart: removeCartItem(state.cart, productId),
  })),
  toggleFavorite: (productId) => set((state) => ({
    favourites: state.favourites.includes(productId)
      ? state.favourites.filter((item) => item !== productId)
      : [...state.favourites, productId],
  })),
  showToast: (toast) => {
    if (toastTimer) clearTimeout(toastTimer);
    set({ toast });
    toastTimer = setTimeout(() => set({ toast: '' }), 2200);
  },
  dismissToast: () => {
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = undefined;
    set({ toast: '' });
  },
}));