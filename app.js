const { createApp } = Vue;

createApp({
  data() {
    return {
      products: [], loading: true, loadError: false,
      categories: ['Todos', 'Rostro', 'Labios', 'Ojos'],
      selectedCategory: 'Todos', search: '', favorites: [], cartCount: 0,
      showBag: false, lastAdded: '', email: '', subscribeMessage: ''
    };
  },
  computed: {
    filteredProducts() {
      const term = this.search.trim().toLocaleLowerCase('es');
      return this.products.filter(product =>
        (this.selectedCategory === 'Todos' || product.category === this.selectedCategory) &&
        (!term || `${product.name} ${product.category}`.toLocaleLowerCase('es').includes(term))
      );
    }
  },
  async mounted() {
    try {
      const response = await fetch('productos.json');
      if (!response.ok) throw new Error('No se pudo cargar el catálogo');
      this.products = await response.json();
    } catch (error) {
      this.loadError = true;
    } finally {
      this.loading = false;
    }
  },
  methods: {
    addToBag(product) {
      this.cartCount += 1;
      this.lastAdded = product.name;
      this.showBag = true;
      window.clearTimeout(this.toastTimer);
      this.toastTimer = window.setTimeout(() => { this.showBag = false; }, 3000);
    },
    toggleFavorite(id) {
      this.favorites = this.favorites.includes(id)
        ? this.favorites.filter(favorite => favorite !== id)
        : [...this.favorites, id];
    },
    subscribe() {
      this.subscribeMessage = '¡Gracias! Te tendremos presente para las próximas novedades.';
      this.email = '';
    }
  }
}).mount('#app');
