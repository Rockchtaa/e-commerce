<template>
  <div class="checkout-container">
    <div class="checkout-form">
      <div class="shipping-info">
        <h2>Shipping Information</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <input type="text" v-model="shippingInfo.fullName" placeholder="Full Name" required>
            <span class="error" v-if="errors.fullName">{{ errors.fullName }}</span>
          </div>
          <div class="form-group">
            <input type="email" v-model="shippingInfo.email" placeholder="Email" required>
            <span class="error" v-if="errors.email">{{ errors.email }}</span>
          </div>
          <div class="form-group">
            <input type="text" v-model="shippingInfo.address" placeholder="Address" required>
            <span class="error" v-if="errors.address">{{ errors.address }}</span>
          </div>
          <div class="form-group">
            <input type="text" v-model="shippingInfo.city" placeholder="City" required>
            <span class="error" v-if="errors.city">{{ errors.city }}</span>
          </div>
          <div class="form-group">
            <input type="text" v-model="shippingInfo.zipCode" placeholder="ZIP Code" required>
            <span class="error" v-if="errors.zipCode">{{ errors.zipCode }}</span>
          </div>
          <button type="submit" class="checkout-btn" :disabled="processing">
            {{ processing ? 'Processing...' : 'Place Order' }}
          </button>
        </form>
      </div>
      <div class="order-summary">
        <h2>Order Summary</h2>
        <div class="summary-items">
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <img :src="item.thumbnail || item.image" :alt="item.title || item.name" class="item-image">
            <div class="item-details">
              <h3>{{ item.title || item.name }}</h3>
              <p>Quantity: {{ item.quantity }}</p>
              <p>Price: ${{ (item.price * item.quantity).toFixed(2) }}</p>
            </div>
          </div>
        </div>
        <div class="total">
          <span>Subtotal:</span>
          <span>${{ subtotal }}</span>
        </div>
        <div class="total">
          <span>Shipping:</span>
          <span>{{ subtotal >= 42 ? 'Free' : '$' + shippingCost.toFixed(2) }}</span>
        </div>
        <div class="total final">
          <span>Total:</span>
          <span>${{ total }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import mitt from 'mitt';

const emitter = mitt();
export default {
  name: 'Checkout-page',
  inject: ['emitter'],
  setup() {
    const router = useRouter()
    const processing = ref(false)
    const errors = ref({})
    const cartItems = ref([])

    const shippingInfo = ref({
      fullName: '',
      email: '',
      address: '',
      city: '',
      zipCode: ''
    })

    const subtotal = computed(() => {
      return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)
    })
    
    const shippingCost = computed(() => {
      return parseFloat(subtotal.value) >= 42 ? 0 : 4.99
    })
    
    const total = computed(() => {
      return (parseFloat(subtotal.value) + shippingCost.value).toFixed(2)
    })

    const validateForm = () => {
      errors.value = {}
      if (!shippingInfo.value.fullName) errors.value.fullName = 'Name is required'
      if (!shippingInfo.value.email) errors.value.email = 'Email is required'
      if (!shippingInfo.value.address) errors.value.address = 'Address is required'
      if (!shippingInfo.value.city) errors.value.city = 'City is required'
      if (!shippingInfo.value.zipCode) errors.value.zipCode = 'ZIP Code is required'
      return Object.keys(errors.value).length === 0
    }

    const handleSubmit = async () => {
      if (!validateForm()) return

      processing.value = true
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Clear cart after successful order   ========> Optional, actually no need for it
        localStorage.removeItem('cartItems')
        cartItems.value = []
        emitter.emit('updateCartItems', [])
        
        // Redirect to success page
        router.push('/order-success')
      } catch (error) {
        console.error('Order submission failed:', error)
      } finally {
        processing.value = false
      }
    }

    onMounted(() => {
      const savedCart = localStorage.getItem('cartItems')
      if (savedCart) {
        cartItems.value = JSON.parse(savedCart)
      }
      emitter.on('updateCartItems', (items) => {
        cartItems.value = items
      })
      
      // Request latest cart items
      emitter.emit('getCartItems')
    })

    return {
      shippingInfo,
      cartItems,
      subtotal,
      shippingCost,
      total,
      processing,
      errors,
      emitter,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.checkout-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.checkout-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 20px;
}

.form-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.checkout-btn {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.checkout-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.checkout-btn:hover:not(:disabled) {
  background-color: #45a049;
}

.order-summary {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 4px;
}

.cart-item {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 15px;
}

.item-details h3 {
  margin: 0 0 5px 0;
  font-size: 16px;
}

.total {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.final {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
  font-weight: bold;
  font-size: 1.2em;
}

.error {
  color: red;
  font-size: 0.8em;
  margin-top: 5px;
}

@media (max-width: 768px) {
  .checkout-form {
    grid-template-columns: 1fr;
  }
}
</style>