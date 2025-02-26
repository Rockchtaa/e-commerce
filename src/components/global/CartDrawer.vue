<template>
  <div class="drawer">
    <v-navigation-drawer location="right" v-model="drawer" width="350" app>
      <v-toolbar density="compact" class="bg-primary">
        <v-toolbar-title class="text-h6 white--text">Shopping Cart</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="drawer = false">
          <v-icon class="white--text">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <div v-if="cartItems.length > 0" class="pa-4">
        <div class="text-body-1">
          {{ cartItems.length }} item{{ cartItems.length > 1 ? 's' : '' }}
        </div>
        <div class="text-body-2 text-grey mb-2">
          {{ subtotal >= 42 ? 'You have Free Shipping!' : `Only $${(42 - subtotal).toFixed(2)} away from Free Shipping` }}
        </div>

        <v-divider></v-divider>

        <div v-for="item in cartItems" :key="item.id" class="mb-4">
          <v-card class="elevation-2" outlined>
            <div class="d-flex align-center pa-3">
              <v-img
                :src="item.thumbnail"
                width="80"
                height="80"
                cover
                class="rounded-lg"
              ></v-img>
              <div class="ml-3 flex-grow-1">
                <div class="text-subtitle-2 font-weight-medium">{{ item.title }}</div>
                <div class="text-body-2 text-grey" v-if="item.size">{{ item.size }}</div>
                <div class="text-body-2">${{ item.price }}</div>
                <div class="d-flex align-center mt-2">
                  <v-btn
                    size="x-small"
                    icon
                    variant="outlined"
                    @click="updateQuantity(item, -1)"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <span class="mx-2">{{ item.quantity }}</span>
                  <v-btn
                    size="x-small"
                    icon
                    variant="outlined"
                    @click="updateQuantity(item, 1)"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
              </div>
              <v-btn
                icon
                variant="text"
                size="small"
                @click="removeItem(item)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </v-card>
        </div>

        <v-divider class="my-4"></v-divider>

        <div class="d-flex justify-space-between mb-2">
          <span class="text-body-1">Subtotal:</span>
          <span class="text-body-1">${{ subtotal }}</span>
        </div>

        <div class="d-flex justify-space-between mb-2">
          <span class="text-body-1">Total:</span>
          <span class="text-body-1">${{ subtotal }}</span>
        </div>

        <div class="text-body-2 text-grey mb-4">
          Tax included and shipping calculated at checkout
        </div>

        <v-checkbox
          label="I agree with Terms & Conditions"
          color="primary"
          class="mb-4"
        ></v-checkbox>

        <v-btn color="secondary" block class="mt-4" @click="checkout">
          Checkout
        </v-btn>

        <v-btn block class="mt-4" @click="goToCart">
          View Cart
        </v-btn>
      </div>

      <div v-else class="pa-4 text-center">
        <v-icon size="64" color="grey">mdi-cart-outline</v-icon>
        <div class="text-h6 mt-4">Your cart is empty</div>
        <div class="text-body-2 text-grey">Add some items to get started</div>
      </div>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  name: 'ShoppingCartDrawer',
  inject: ['emitter'],
  data: () => ({
    drawer: false,
    cartItems: []
  }),
  computed: {
    subtotal() {
      return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    }
  },
  mounted() {
    // Load cart items from localStorage when component mounts
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
    }
    
    // Original event listeners
    this.emitter.on('toggleCart', () => {
      this.drawer = !this.drawer;
    });
   
    this.emitter.on('addToCart', (product) => {
      this.addItem(product);
      this.drawer = true;
    });
   
    // New event listeners for cart synchronization
    this.emitter.on('getCartItems', () => {
      this.emitter.emit('updateCartItems', this.cartItems);
    });
   
    this.emitter.on('updateCart', (updatedItems) => {
      this.cartItems = updatedItems;
      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      this.emitter.emit('updateCartItems', this.cartItems);
    });
  },
  methods: {
    addItem(product) {
      const existingItem = this.cartItems.find(item => item.id === product.id);
     
      if (existingItem) {
        existingItem.quantity += product.quantity || 1;
      } else {
        this.cartItems.push({
          ...product,
          quantity: product.quantity || 1
        });
      }
     
      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      
      // Emit event to update any other components using cart data
      this.emitter.emit('updateCartItems', this.cartItems);
    },
    updateQuantity(item, change) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        item.quantity = newQuantity;
      } else {
        this.removeItem(item);
      }
     
      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      
      // Emit event to update any other components using cart data
      this.emitter.emit('updateCartItems', this.cartItems);
    },
    removeItem(item) {
      const index = this.cartItems.indexOf(item);
      if (index > -1) {
        this.cartItems.splice(index, 1);
      }
     
      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      
      // Emit event to update any other components using cart data
      this.emitter.emit('updateCartItems', this.cartItems);
    },
    checkout() {
      this.drawer = false;
      this.$router.push('/checkout-page');
    },
    goToCart() {
      this.drawer = false;
      this.$router.push({ name: 'view-cart' });
    },
  }
};
</script>
<style scoped>
.drawer {
  z-index: 1000;
}

.v-card {
  transition: box-shadow 0.3s ease;
}

.v-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.text-body-1 {
  font-weight: bold;
}

.text-body-2 {
  color: #9e9e9e;
}

.v-btn {
  transition: background-color 0.2s ease;
}

.v-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.v-divider {
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>