<template>
  <div class="new-products pt-12">
    <v-container fluid>
      <h2 class="text-h4 text-center font-weight-bold mb-8">New Products</h2>
      <v-row>
        <v-col cols="7" style="margin-top: 125px;">
          <Swiper :pagination="{ el: '.swiper-pagination', clickable: true }" :modules="modules" :slides-per-view="4"
            :space-between="20" :autoplay="{ delay: 3000 }">

            <swiper-slide v-for="product in products" :key="product.id">
              <v-card elevation="0" class="pa-5">
                <img :src="selectedImages[product.id] || product.thumbnail" class="w-100"
                  style="height: 200px; object-fit: cover" />
                <v-card-text>
                  {{ truncateDescription(product.description) }}
                </v-card-text>
                <v-rating :model-value="product.rating" half-increments readonly color="yellow-darken-2" size="x-small"
                  density="compact">
                </v-rating>
                <v-card-text class="pl-0 pt-0">
                  <del>${{ product.price }}</del> ${{
                    calculateDiscountedPrice(
                      product.price,
                      product.discountPercentage
                    )
                  }}
                </v-card-text>
                <v-btn-toggle v-model="selectedImages[product.id]" mandatory class="overflow-x-auto">
                  <v-btn v-for="(pic, i) in product.images" :key="i" :value="pic" variant="text">
                    <img :src="pic" :alt="product.title" width="50" height="50" style="object-fit: cover" />
                  </v-btn>
                </v-btn-toggle>
                <div class="text-center mt-4">
                  <v-btn density="compact" class="py-3 px-7 d-flex align-center justify-center" style="
                text-transform: none;
                border-radius: 30px;
                min-width: 150px;
              " variant="outlined"
                    @click="navigateToProductDetails(product.id)">
                    Choose Options
                  </v-btn>
                </div>
              </v-card>
            </swiper-slide>
            <div class="swiper-pagination"></div>
          </Swiper>
        </v-col>
        <v-col cols="5">
          <img src="../../assets//images/vr-banner.webp" alt="VR Banner" class="w-100" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Pagination, Autoplay } from "swiper/modules";
export default {
  name: "FlashDeals",
  props: { products: { type: Array, required: true } },
  setup() {
    return {
      modules: [Pagination, Autoplay],
    };
  },
  components: { Swiper, SwiperSlide },
  data() {
    return { selectedImages: {} };
  },
  methods: {
    truncateDescription(description) {
      const words = description.split(" ");
      return words.length <= 4
        ? description
        : words.slice(0, 4).join(" ");
    },
    calculateDiscountedPrice(price, discountPercentage) {
      return Math.ceil(price - price * (discountPercentage / 100));
    },
    navigateToProductDetails(productId) {
        this.$router.push({ name: 'ProductDetails', params: { id: productId } });
    }
  },
};
</script>
<style scoped>
pagination-bullets,
.swiper-pagination-bullets.swiper-pagination-horizontal {
  bottom: -6px;
}

.v-btn-group {
  display: block;
}
</style>
