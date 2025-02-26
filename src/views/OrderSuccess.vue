<template>
  <div class="success-container">
    <div class="success-content">
      <i class="fas fa-check-circle"></i>
      <h1>Order Successful!</h1>
      <p>Thank you for your purchase. Your order has been received.</p>
      <button @click="goToHome" class="home-button">Continue Shopping</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderSuccess',
  methods: {
    goToHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.success-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  text-align: center;
}

.success-content {
  padding: 40px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.fa-check-circle {
  color: #4CAF50;
  font-size: 64px;
  margin-bottom: 20px;
}

.home-button {
  background-color: #4CAF50;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

.home-button:hover {
  background-color: #45a049;
}
</style>