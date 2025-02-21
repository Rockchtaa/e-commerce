<template>
  <div class="app-footer">
    <v-footer :app="true" absolute class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <!-- Shop -->
          <v-col cols="12" sm="6" md="3">
            <h4 class="font-weight-bold mb-3">SHOP</h4>
            <div class="footer-links">
              <router-link
                v-for="category in categories"
                :key="category.title"
                :to="{
                  name: 'Product_category',
                  params: { category: category.route.substring(1) },
                }"
                class="footer-link"
              >
                {{ category.title }}
              </router-link>
            </div>
          </v-col>

          <!-- Further Info -->
          <v-col cols="12" sm="6" md="3">
            <h4 class="font-weight-bold mb-3">FURTHER INFO.</h4>
            <div class="footer-links">
              <router-link
                v-for="item in infoLinks"
                :key="item.title"
                :to="item.route"
                class="footer-link"
              >
                {{ item.title }}
              </router-link>
            </div>
          </v-col>

          <!-- Customer Service -->
          <v-col cols="12" sm="6" md="3">
            <h4 class="font-weight-bold mb-3">CUSTOMER SERVICE</h4>
            <div class="footer-links">
              <router-link
                v-for="item in serviceLinks"
                :key="item.title"
                :to="item.route"
                class="footer-link"
              >
                {{ item.title }}
              </router-link>
            </div>
          </v-col>

          <!-- Contact Info -->
          <v-col cols="12" sm="6" md="3">
            <h4 class="font-weight-bold text-h5 mb-15">ellamart+</h4>
            <p class="mb-3">
              <v-icon small class="mr-5">mdi-map-marker</v-icon> 685 Market
              Street, San Francisco,
            </p>
            <p class="ml-11">CA 94105, USA</p>
            <p class="mb-3">
              <v-icon small class="mr-5">mdi-phone</v-icon> (415) 555-5555
            </p>
            <p>
              <v-icon small class="mr-5">mdi-email</v-icon> example@domain.com
            </p>

            <!-- Social Media -->
            <div class="d-flex mt-10">
              <v-btn icon class="mx-1"><v-icon>mdi-facebook</v-icon></v-btn>
              <v-btn icon class="mx-1"><v-icon>mdi-instagram</v-icon></v-btn>
              <v-btn icon class="mx-1"><v-icon>mdi-pinterest</v-icon></v-btn>
              <v-btn icon class="mx-1"><v-icon>mdi-snapchat</v-icon></v-btn>
              <v-btn icon class="mx-1"><v-icon>mdi-twitter</v-icon></v-btn>
            </div>
          </v-col>
        </v-row>

        <!-- Payment & Security Logos -->
        <v-row class="mt-5 justify-center">
          <v-col cols="auto" v-for="logo in securityLogos" :key="logo">
            <img :src="logo" contain height="30" />
          </v-col>
        </v-row>

        <!-- Copyright & Shopify Branding -->
        <v-row class="mt-3 text-center">
          <v-col cols="12">
            <p class="text-caption">
              © 2025 Yassine EL-Brahmi. All Rights Reserved. Powered By me.
            </p>
            <p class="text-caption">Ecommerce Theme</p>
          </v-col>
        </v-row>

        <!-- Payment Logos -->
        <v-row class="mt-3 justify-center">
          <v-col cols="auto" v-for="logo in paymentLogos" :key="logo">
            <img :src="logo" contain height="30" />
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </div>
</template>

<script>
import { useProductsStore } from "@/stores/products";
import { mapState } from "pinia";

export default {
  name: "AppFooter",
  data() {
    return {
      infoLinks: [
        { title: "About", route: "/about" },
        { title: "Customer Service", route: "/customer-service" },
        { title: "Reward Program", route: "/rewards" },
        { title: "Shipping & Returns", route: "/shipping-returns" },
        { title: "Privacy Policy", route: "/privacy-policy" },
        { title: "Terms & Conditions", route: "/terms" },
        { title: "Blog", route: "/blog" },
      ],
      serviceLinks: [
        { title: "Search Terms", route: "/search" },
        { title: "Advanced Search", route: "/advanced-search" },
        { title: "Orders And Returns", route: "/orders-returns" },
        { title: "Contact Us", route: "/contact" },
        { title: "Theme FAQs", route: "/faqs" },
        { title: "Consultant", route: "/consultant" },
        { title: "Store Locations", route: "/locations" },
      ],
      securityLogos: [require("@/assets/images/cart-page-cards.webp")],
      paymentLogos: [
        require("@/assets/images/shopify.png"),
        require("@/assets/images/paypal.png"),
        require("@/assets/images/bitcoin.png"),
      ],
    };
  },
  computed: {
    ...mapState(useProductsStore, ["categories"]),
  },
};
</script>

<style scoped>
.v-footer {
  border-top: 1px solid #ddd;
  font-size: 14px;
  background: linear-gradient(to right, #f8f9fa, #ffffff);
}

.v-btn {
  background: none !important;
  transition: transform 0.2s;
}

.v-btn:hover {
  transform: translateY(-2px);
  color: #1976d2;
}

h4 {
  position: relative;
  padding-bottom: 8px;
}

h4::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 2px;
  background-color: #1976d2;
}

.social-icons .v-btn {
  border-radius: 50%;
  border: 1px solid #e0e0e0;
}

.footer-links {
  display: flex;
  flex-direction: column;
}

.footer-link {
  padding: 8px 0;
  color: rgba(0, 0, 0, 0.87);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #1976d2;
  cursor: pointer;
}
</style>
