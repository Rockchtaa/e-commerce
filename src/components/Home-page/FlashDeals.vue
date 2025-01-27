<template>
    <div class="flash-deals">
      <v-container fluid>
        <v-row>
          <v-col
            v-for="product in products"
            :key="product.id"
            cols="4"
          >
            <h3>{{ product.title }}</h3>
            <img :src="product.thumbnail" alt="product image" />
            <p><strong>Price:</strong> ${{ product.price }}</p>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FlashDeals',
    props: {
      products: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  