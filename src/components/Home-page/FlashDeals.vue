<template>
  <div class="flash-deals">
    <v-container fluid>
      <v-row v-if="products && products.length">
        <v-col
          cols="12"
          sm="6"
          md="3"
          v-for="product in products"
          :key="product.id"
        >
          <v-card elevation="0" class="pa-5">
            <img
              :src="selectedImages[product.id] || product.thumbnail"
              class="w-100"
              style="height: 200px; object-fit: cover"
            />
            <v-card-text>
              {{ truncateDescription(product.description) }}
            </v-card-text>
            <v-rating
              :model-value="product.rating"
              half-increments
              readonly
              color="yellow-darken-2"
              size="x-small"
              density="compact"
            >
            </v-rating>
            <v-card-text class="pl-0 pt-0">
              <del>${{ product.price }}</del>
              ${{
                calculateDiscountedPrice(
                  product.price,
                  product.discountPercentage
                )
              }}
            </v-card-text>
            <v-btn-toggle
              v-model="selectedImages[product.id]"
              mandatory
              class="overflow-x-auto"
            >
              <v-btn
                v-for="(pic, i) in product.images"
                :key="i"
                :value="pic"
                variant="text"
              >
                <img
                  :src="pic"
                  :alt="product.title"
                  width="50"
                  height="50"
                  style="object-fit: cover"
                />
              </v-btn>
            </v-btn-toggle>
            <div class="text-center mt-4">
              <v-btn 
  density="compact"
  class="py-3 px-7 d-flex align-center justify-center"
  style="text-transform: none; border-radius: 30px; min-width: 150px;"
  variant="outlined"
>
  Choose Options
</v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "FlashDeals",
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedImages: {},
    };
  },
  methods: {
    truncateDescription(description) {
      const words = description.split(" ");
      return words.length <= 10
        ? description
        : words.slice(0, 9).join(" ") + "...";
    },
    calculateDiscountedPrice(price, discountPercentage) {
      return Math.ceil(price - price * (discountPercentage / 100));
    },
  },
};
</script>
