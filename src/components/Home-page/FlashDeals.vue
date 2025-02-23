<template>
  <div class="flash-deals">
    <Swiper
      :pagination="{ el: '.swiper-pagination', clickable: true }"
      :navigation="true"
      :modules="modules"
      :slides-per-view="4"
      :space-between="20"
      :autoplay="{ delay: 3000 }"
    >
      <swiper-slide v-for="product in products" :key="product.id">
        <div class="card-wrapper">
          <v-card elevation="0" class="pa-5" style="position: relative">
            <img
              :src="selectedImages[product.id] || product.thumbnail"
              class="w-100"
              style="height: 300px; object-fit: contain"
            />
            <v-btn
              density="compact"
              width="80"
              variant="outlined"
              height="30"
              class="bg-white quick-view"
              style="
                text-transform: none;
                position: absolute;
                top: 35%;
                left: 50%;
                transform: translate(-50%, -50%);
                border-radius: 30px;
                transition: 0.2s all ease-in-out;
              "
              @click="openQuickView(product)"
            >
              Quick View
            </v-btn>
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
            />
            <v-card-text class="pl-0 pt-0">
              <del>${{ product.price }}</del>
              {{
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
                style="
                  text-transform: none;
                  border-radius: 30px;
                  min-width: 150px;
                "
                variant="outlined"
                @click="navigateToProductDetails(product.id)"
              >
                Choose Options
              </v-btn>
            </div>
          </v-card>
        </div>
      </swiper-slide>
      <div class="swiper-pagination"></div>
    </Swiper>

    <!-- Quick View Dialog -->
    <v-dialog v-model="quickViewOpen" max-width="600px">
      <v-card>
        <v-card-title justify="space-between">
          {{ selectedProduct?.title }}
          <v-btn icon class="float-right" @click="quickViewOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <img
            :src="
              selectedImages[selectedProduct?.id] || selectedProduct?.thumbnail
            "
            class="w-100 mb-4"
            style="height: 300px; object-fit: cover"
          />
          <div>{{ selectedProduct?.description }}</div>
          <div class="mt-2">
            <v-rating
              :model-value="selectedProduct?.rating"
              half-increments
              readonly
              color="yellow-darken-2"
              size="small"
            />
          </div>
          <div class="mt-2">
            <del>${{ selectedProduct?.price }}</del>
            <span class="ml-2">
              {{
                calculateDiscountedPrice(
                  selectedProduct?.price,
                  selectedProduct?.discountPercentage
                )
              }}
            </span>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="quickViewOpen = false">Close</v-btn>
          <v-btn
            color="primary"
            @click="navigateToProductDetails(selectedProduct?.id)"
          >
            View Details
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
export default {
  name: "FlashDeals",
  props: { products: { type: Array, required: true } },
  setup() {
    return {
      modules: [Pagination, Navigation, Autoplay],
    };
  },
  components: { Swiper, SwiperSlide },
  data() {
    return {
      selectedImages: {},
      quickViewOpen: false,
      selectedProduct: null,
    };
  },
  methods: {
    truncateDescription(description) {
      const words = description.split(" ");
      return words.length <= 9
        ? description
        : words.slice(0, 9).join(" ") + "...";
    },
    calculateDiscountedPrice(price, discountPercentage) {
      return Math.ceil(price - price * (discountPercentage / 100));
    },
    navigateToProductDetails(productId) {
      this.$router.push({ name: "ProductDetails", params: { id: productId } });
    },
    openQuickView(product) {
      this.selectedProduct = product;
      if (!this.selectedImages[product.id]) {
        this.selectedImages[product.id] = product.thumbnail;
      }
      this.quickViewOpen = true;
    },
  },
};
</script>

<style scoped>
.card-wrapper {
  position: relative;
}

.card-wrapper:hover .quick-view {
  opacity: 1;
}

.quick-view {
  opacity: 0;
}
</style>
