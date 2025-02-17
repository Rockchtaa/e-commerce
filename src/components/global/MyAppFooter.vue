<template>
  <div class="app-footer">
    <v-footer :app="true" absolute class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <!-- Shop -->
          <v-col cols="12" sm="6" md="3">
            <h4 class="font-weight-bold mb-3">SHOP</h4>
            <v-list dense>
              <v-list-item v-for="item in shopCategories" :key="item">
                <v-list-item-content>{{ item }}</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>

          <!-- Further Info -->
          <v-col cols="12" sm="6" md="3">
            <h4 class="font-weight-bold mb-3">FURTHER INFO.</h4>
            <v-list dense>
              <v-list-item v-for="item in infoLinks" :key="item">
                <v-list-item-content>{{ item }}</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>

          <!-- Customer Service -->
          <v-col cols="12" sm="6" md="3">
            <h4 class="font-weight-bold mb-3">CUSTOMER SERVICE</h4>
            <v-list dense>
              <v-list-item v-for="item in serviceLinks" :key="item">
                <v-list-item-content>{{ item }}</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>

          <!-- Contact Info -->
          <v-col cols="12" sm="6" md="3">
            <h4 class="font-weight-bold text-h5 mb-15">ellamart+</h4>
            <p class="mb-3"><v-icon small class="mr-5">mdi-map-marker</v-icon> 685 Market Street, San Francisco,</p> <p class="ml-11">CA 94105, USA</p>
            <p class="mb-3"><v-icon small class="mr-5">mdi-phone</v-icon> (415) 555-5555</p>
            <p><v-icon small class="mr-5">mdi-email</v-icon> example@domain.com</p>

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
            <img :src="logo" contain height="30">
          </v-col>
        </v-row>

        <!-- Copyright & Shopify Branding -->
        <v-row class="mt-3 text-center">
          <v-col cols="12">
            <p class="text-caption">© 2025 Yassine EL-Brahmi. All Rights Reserved. Powered By me.</p>
            <p class="text-caption">Ecommerce Theme </p>
          </v-col>
        </v-row>

        <!-- Payment Logos -->
        <v-row class="mt-3 justify-center">
          <v-col cols="auto" v-for="logo in paymentLogos" :key="logo">
            <img :src="logo" contain height="30">
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: "AppFooter",
  data() {
    return {
      shopCategories: [
        "Electronics",
        "Computers & Laptops",
        "Smartphones & Tablets",
        "Cameras",
        "Video Games & Systems",
        "Home Furniture",
        "Weekly Special",
      ],
      infoLinks: [
        "About",
        "Customer Service",
        "Reward Program",
        "Shipping & Returns",
        "Privacy Policy",
        "Terms & Conditions",
        "Blog",
      ],
      serviceLinks: [
        "Search Terms",
        "Advanced Search",
        "Orders And Returns",
        "Contact Us",
        "Theme FAQs",
        "Consultant",
        "Store Locations",
      ],
      securityLogos: [
          require("@/assets/images/cart-page-cards.webp"),  
      ],
      paymentLogos: [
        require("@/assets/images/shopify.png"),   
        require("@/assets/images/paypal.png"),   
        require("@/assets/images/bitcoin.png"),   
      ],
    };
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
  color: #1976D2;
}

h4 {
  position: relative;
  padding-bottom: 8px;
}

h4::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 2px;
  background-color: #1976D2;
}

.social-icons .v-btn {
  border-radius: 50%;
  border: 1px solid #e0e0e0;
}

.v-list-item:hover {
  color: #1976D2;
  cursor: pointer;
}
</style>
