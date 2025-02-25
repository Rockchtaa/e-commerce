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
        <v-list-item-group>
          <v-list-item v-for="item in cartItems" :key="item.id">
            <v-list-item-avatar>
              <v-img :src="item.thumbnail" width="80" height="80" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.size }} - ${{ item.price }}</v-list-item-subtitle>
              <v-list-item-subtitle>Quantity: {{ item.quantity }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="removeItem(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-divider></v-divider>

      <div class="d-flex justify-space-between mb-2">
        <span class="text-body-1">Subtotal:</span>
        <span class="text-body-1">${{ subtotal }}</span>
      </div>

      <v-btn color="primary" @click="checkout">Proceed to Checkout</v-btn>
    </div>

    <div v-else class="text-center">
      <v-icon size="64" color="grey">mdi-cart-outline</v-icon>
      <div class="text-h6 mt-4">Your cart is empty</div>
      <div class="text-body-2 text-grey">Add some items to get started</div>
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
  mounted() {
    this.emitter.on('cartUpdated', (items) => {
      this.cartItems = items;
    });
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    removeItem(item) {
      const index = this.cartItems.indexOf(item);
      if (index > -1) {
        this.cartItems.splice(index, 1);
        this.emitter.emit('cartUpdated', this.cartItems); 
      }
    },
    checkout() {
      console.log('Proceeding to checkout with items:', this.cartItems);
    },
  },
};
</script>

<style scoped>

</style>
