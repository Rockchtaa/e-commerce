<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>View Cart</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-toolbar>

    <v-divider></v-divider>

    <div v-if="cartItems.length > 0">
      <v-list>
        <v-list-item v-for="item in cartItems" :key="item.id" class="mb-4">
          <v-card class="w-100" outlined>
            <div class="d-flex align-center pa-3">
              <v-img :src="item.thumbnail" width="180" height="180" contain class="rounded-lg"></v-img>
              <div class="ml-3 flex-grow-1">
                <div class="text-subtitle-1 font-weight-medium">{{ item.title }}</div>
                <div class="text-body-2 text-grey" v-if="item.size">{{ item.size }}</div>
                <div class="text-body-1">${{ item.price }} each</div>
                <div class="d-flex align-center mt-2">
                  <v-btn size="x-small" icon variant="outlined" @click="updateQuantity(item, -1)">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <span class="mx-2">{{ item.quantity }}</span>
                  <v-btn size="x-small" icon variant="outlined" @click="updateQuantity(item, 1)">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
              </div>
              <div class="text-right">
                <div class="text-h6 mb-2">${{ (item.price * item.quantity).toFixed(2) }}</div>
                <v-btn icon variant="text" size="small" @click="removeItem(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </div>
          </v-card>
        </v-list-item>
      </v-list>

      <v-divider class="my-4"></v-divider>

      <v-card class="pa-4 mb-4">
        <div class="d-flex justify-space-between mb-2">
          <span class="text-body-1">Subtotal:</span>
          <span class="text-body-1">${{ subtotal }}</span>
        </div>

        <div class="d-flex justify-space-between mb-2">
          <span class="text-body-1">Shipping:</span>
          <span class="text-body-1">{{ subtotal >= 42 ? 'Free' : '$4.99' }}</span>
        </div>

        <div v-if="subtotal < 42" class="text-body-2 text-grey mb-2">
          Add ${{ (42 - subtotal).toFixed(2) }} more to qualify for FREE shipping
        </div>

        <v-divider class="my-2"></v-divider>

        <div class="d-flex justify-space-between mb-2">
          <span class="text-h6">Total:</span>
          <span class="text-h6">${{ calculateTotal() }}</span>
        </div>
      </v-card>

      <div class="d-flex flex-column flex-sm-row justify-content-between gap-4 w-50">
        <v-btn block color="primary" @click="checkout" class="mb-2 mb-sm-0">
          Proceed to Checkout
        </v-btn>
        <v-btn block variant="outlined" @click="continueShopping">
          Continue Shopping
        </v-btn>
      </div>
    </div>

    <div v-else class="text-center pa-8">
      <v-icon size="64" color="grey">mdi-cart-outline</v-icon>
      <div class="text-h6 mt-4">Your cart is empty</div>
      <div class="text-body-2 text-grey mb-4">Add some items to get started</div>
      <v-btn color="primary" @click="continueShopping">Continue Shopping</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'ViewCart',
  inject: ['emitter'],
  data() {
    return {
      cartItems: [],
    };
  },
  computed: {
    subtotal() {
      return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    },
  },
  created() {
    // Load cart items from localStorage when component is created
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
    }

    // Also request cart items via event system for sync
    this.emitter.emit('getCartItems');
  },
  mounted() {
    this.emitter.on('updateCartItems', (items) => {
      this.cartItems = items;
    });
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    updateQuantity(item, change) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        item.quantity = newQuantity;
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        this.emitter.emit('updateCart', this.cartItems);
      } else {
        this.removeItem(item);
      }
    },
    removeItem(item) {
      const index = this.cartItems.indexOf(item);
      if (index > -1) {
        this.cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        this.emitter.emit('updateCart', this.cartItems);
      }
    },
    calculateTotal() {
      const subtotalValue = parseFloat(this.subtotal);
      const shipping = subtotalValue >= 42 ? 0 : 4.99;
      return (subtotalValue + shipping).toFixed(2);
    },
    checkout() {
      console.log('Proceeding to checkout with items:', this.cartItems);
    },
    continueShopping() {
      this.$router.push('/');
    }
  },
};
</script>


<style scoped>
.v-card {
  transition: box-shadow 0.3s ease;
}

.v-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 600px) {
  .flex-sm-row {
    flex-direction: column;
  }
}
</style>