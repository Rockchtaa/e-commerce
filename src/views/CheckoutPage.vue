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
            <img :src="item.image" :alt="item.name" class="item-image">
            <div class="item-details">
              <h3>{{ item.name }}</h3>
              <p>Quantity: {{ item.quantity }}</p>
              <p>Price: ${{ item.price * item.quantity }}</p>
            </div>
          </div>
        </div>
        <div class="total">
          <span>Subtotal:</span>
          <span>${{ subtotal }}</span>
        </div>
        <div class="total">
          <span>Shipping:</span>
          <span>${{ shippingCost }}</span>
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
import { useCartStore } from '../stores/cart'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Checkout-page',
  setup() {
    const cartStore = useCartStore()
    const router = useRouter()
    const processing = ref(false)
    const errors = ref({})

    const shippingInfo = ref({
      fullName: '',
      email: '',
      address: '',
      city: '',
      zipCode: ''
    })

    const cartItems = computed(() => cartStore.items)
    const subtotal = computed(() => cartStore.total)
    const shippingCost = computed(() => 10.00)
    const total = computed(() => subtotal.value + shippingCost.value)

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
        
        // Clear cart after successful order
        cartStore.clearCart()
        
        // Redirect to success page
        router.push('/order-success')
      } catch (error) {
        console.error('Order submission failed:', error)
      } finally {
        processing.value = false
      }
    }

    return {
      shippingInfo,
      cartItems,
      subtotal,
      shippingCost,
      total,
      processing,
      errors,
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