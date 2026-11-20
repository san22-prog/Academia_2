import { useAppStore } from '../src/store';

const product = { id: 'P001', name: 'Notebook' };

beforeEach(() => {
  useAppStore.getState().dismissToast();
  useAppStore.setState({
    screen: 'auth',
    user: null,
    selectedProduct: null,
    search: '',
    category: 'All Products',
    priceRange: 'Any price',
    filterDraft: { category: 'All Products', priceRange: 'Any price' },
    filterOpen: false,
    cart: {},
    favourites: [],
    editProfile: false,
    toast: '',
  });
});

describe('shared app state', () => {
  test('keeps filter drafts separate until apply and supports reset', () => {
    const store = useAppStore.getState();
    store.openFilters();
    store.updateFilterDraft('category', 'Art Supplies');
    expect(useAppStore.getState().category).toBe('All Products');
    store.applyFilters();
    expect(useAppStore.getState()).toMatchObject({ category: 'Art Supplies', filterOpen: false });
    useAppStore.getState().openFilters();
    useAppStore.getState().clearFilterDraft();
    expect(useAppStore.getState().filterDraft).toEqual({ category: 'All Products', priceRange: 'Any price' });
  });

  test('updates favourites and cart quantities', () => {
    useAppStore.getState().toggleFavorite(product.id);
    expect(useAppStore.getState().favourites).toEqual([product.id]);
    useAppStore.getState().toggleFavorite(product.id);
    useAppStore.getState().addToCart(product);
    useAppStore.getState().changeQuantity(product.id, 1);
    expect(useAppStore.getState().cart).toEqual({ P001: 2 });
    useAppStore.getState().changeQuantity(product.id, -2);
    expect(useAppStore.getState().cart).toEqual({});
  });

  test('requires authentication for protected navigation and clears private state on logout', () => {
    const store = useAppStore.getState();
    store.enterShop({ name: 'Ada', email: 'ada@example.com' });
    store.setEditProfile(true);
    store.navigate('profile');
    expect(useAppStore.getState()).toMatchObject({ screen: 'profile', editProfile: false });
    store.updateUser({ name: 'Ada Lovelace' });
    store.addToCart(product);
    useAppStore.getState().logout();
    expect(useAppStore.getState()).toMatchObject({ screen: 'auth', user: null, cart: {}, favourites: [] });
    ['home', 'detail', 'cart', 'profile'].forEach((destination) => {
      useAppStore.getState().navigate(destination);
      expect(useAppStore.getState()).toMatchObject({ screen: 'auth', user: null });
    });
  });

  test('expires and replaces toast notifications', () => {
    jest.useFakeTimers();
    const store = useAppStore.getState();
    store.showToast('First');
    jest.advanceTimersByTime(1100);
    store.showToast('Second');
    jest.advanceTimersByTime(1100);
    expect(useAppStore.getState().toast).toBe('Second');
    jest.advanceTimersByTime(1100);
    expect(useAppStore.getState().toast).toBe('');
    jest.useRealTimers();
  });
});