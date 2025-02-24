<template>
  <div class="product-detail-page">
    <v-container v-if="product">
      <v-row>
        <!-- Left Side: Product Images -->
        <v-col cols="12" md="6" class="text-center">
          <v-img :src="selectedImage || product.thumbnail" height="400" cover class="mb-4"></v-img>
          
          <!-- Image Thumbnails -->
          <v-btn-toggle v-model="selectedImage" mandatory class="d-flex justify-center">
            <v-btn v-for="(pic, i) in product.images" :key="i" :value="pic" variant="text">
              <img :src="pic" :alt="product.title" width="60" height="60" style="object-fit: cover; border-radius: 4px;" />
            </v-btn>
          </v-btn-toggle>
        </v-col>

        <!-- Right Side: Product Details -->
        <v-col cols="12" md="6">
          <h1 class="text-h4 font-weight-bold">{{ product.title }}</h1>
          <div class="d-flex align-center mb-2">
            <v-rating :model-value="product.rating" color="amber" density="compact" size="small" readonly></v-rating>
            <span class="text-subtitle-2 ml-2">{{ product.rating }}</span>
          </div>
          <p class="text-body-1 mb-4">{{ product.description }}</p>
          <div class="d-flex align-center mb-4">
            <span class="text-h5 mr-2">${{ product.price * quantity }}</span>
            <span v-if="product.discountPercentage > 0" class="text-decoration-line-through text-body-2 text-grey">
              ${{ Math.round(product.price * (100 / (100 - product.discountPercentage))) }}
            </span>
          </div>

          <v-btn color="primary" class="mr-2" @click="addToCart">Add to Cart</v-btn>
          <v-btn icon variant="text">
            <v-icon>mdi-heart-outline</v-icon>
          </v-btn>
          <!-- Quantity Selector Under Add to Cart -->
          <div class="d-flex align-center justify-start mt-4">
            <v-btn icon @click="decreaseQuantity">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <v-text-field 
              v-model="quantity" 
              type="number" 
              min="1" 
              class="mx-2 text-center" 
              dense 
              hide-details 
              style="max-width: 80px; text-align: center;"
            ></v-text-field>
            <v-btn icon @click="increaseQuantity">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>

        </v-col>
      </v-row>
    </v-container>
    
    <v-container v-else-if="loading">
      <v-row class="fill-height">
        <v-col class="text-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-col>
      </v-row>
    </v-container>
    
    <v-container v-else>
      <v-alert type="error">{{ error }}</v-alert>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  inject: ['emitter'],
  name: "ProductDetails",
  data() {
    return {
      product: null,
      loading: true,
      error: null,
      selectedImages: {},
      quantity: 1,
      selectedImage: null, // Default to null, will be set to the main image
    };
  },
  created() {
    this.fetchProductDetails();
  },
  methods: {
    async fetchProductDetails() {
      this.loading = true;
      this.error = null;
      try {
        const productId = this.$route.params.id;
        const response = await axios.get(`https://dummyjson.com/products/${productId}`);
        this.product = response.data;
        console.log("Product details:", this.product);
        this.selectedImage = this.product.thumbnail; // Set the default image
      } catch (error) {
        console.error("Error fetching product details:", error);
        this.error = "Failed to load product details. Please try again later.";
      } finally {
        this.loading = false;
      }
    },
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) this.quantity--;
    },
    addToCart() {
      this.emitter.emit('addToCart', { ...this.product, quantity: this.quantity });
    },
  },
};
</script>
