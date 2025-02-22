<template>
  <div class="nav-bar">
    <!-- Primary Header -->

    <v-app-bar color="primary" dark>
      <v-container fluid>
        <v-row align="center" justify="space-between">
          <!-- Logo Section -->
          <v-col cols="3" class="d-flex align-center" @click="navigateToHome">
            <img src="../../assets/images/logo.png" alt="logo" class="logo" />
          </v-col>

          <!-- Search Bar Section -->
          <v-col cols="6" class="search-container">
            <div class="search-wrapper">
              <input type="search" name="navSearch" id="navSearch" placeholder="Search the store"
                class="search-input" />
              <v-icon class="search-icon">mdi-magnify</v-icon>
            </div>
          </v-col>

          <!-- Action Icons Section -->
          <v-col cols="3" class="action-icons d-flex justify-end align-center">
            <div class="info">
              <p>Available 24/7 at</p>
              <p>(090) 123-4567</p>
            </div>
            <v-btn icon>
              <v-icon color="yellow">mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon color="yellow">mdi-account</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon color="yellow">mdi-cart</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <!-- Secondary Navigation Bar -->
    <v-app-bar color="blue darken-3" dense flat>
      <v-app-bar-nav-icon @click="toggleCart"></v-app-bar-nav-icon>

      <v-container fluid>
        <v-row align="center" justify="space-between">
          <!-- Navigation Links -->
          <v-col class="d-flex align-center nav-links" cols="9">
            <router-link 
              v-for="category in categories" 
              :key="category.title" 
              :to="{ name: 'Product_category', params: { category: category.route.substring(1) }}" 
              :class="{ 'router-link-active': $route.params.category === category.route.substring(1) }" 
              class="nav-link"
            >
              {{ category.title }}
            </router-link> 
          </v-col>

          <!-- Help & Language Section -->
          <v-col cols="3" class="d-flex justify-end align-center">
            <v-icon color="white">mdi-headset</v-icon>
            <span class="help-text">Help</span>
            <div class="d-flex align-center">
              <!-- Activator for the language menu -->
              <div id="language-select" class="language-select d-flex align-center">
                <img :src="selectedFlag" :alt="selectedLanguage" class="flag-icon" />
                <span style="margin-left: 8px">{{ selectedLanguage }}</span>
                <v-icon color="white">mdi-chevron-down</v-icon>
              </div>

              <!-- Language Dropdown Menu -->
              <v-menu activator="#language-select" offset-y>
                <v-list>
                  <v-list-item 
                    v-for="option in languageOptions" 
                    :key="option.code"
                    @click="selectLanguage(option)"
                  >
                    <v-list-item-title>{{ option.label }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
import { useProductsStore } from "@/stores/products";
import { mapState } from 'pinia';

export default {
  inject: ['emitter'],
  data() {
    return {
      selectedLanguage: "EN / USD",
      selectedFlag: "https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg",
      languageOptions: [
        {
          label: "EN / USD",
          code: "en",
          flag: "https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg",
        },
        {
          label: "DE / EUR",
          code: "de",
          flag: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg",
        },
      ],
    };
  },
  methods: {
    selectLanguage(option) {
      this.selectedLanguage = option.label;
      this.selectedFlag = option.flag;
    },

    toggleCart() {
      this.emitter.emit("toggleCart");
    },
    navigateToHome() {
      this.$router.push({ name: "Home" });
    }
  },
  computed: {
    ...mapState(useProductsStore, ['categories']),
  },
};
</script>

<style scoped>
.logo {
  max-height: 40px;
  width: auto;
}

.search-container {
  display: flex;
  justify-content: center;
}

.search-wrapper {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 50px;
  padding: 5px 15px;
  width: 100%;
}

.search-input {
  border: none;
  flex: 1;
  font-size: 16px;
  padding: 10px;
  outline: none;
}

.search-icon {
  font-size: 24px;
  color: gray;
  margin-left: 10px;
}

.action-icons {
  gap: 10px;
}

.info {
  margin-right: 15px;
  text-align: right;
  color: white;
}

.info p {
  margin: 0;
  font-size: 12px;
}

.v-btn {
  background: none;
}

.v-btn:hover {
  background: none;
}

.v-icon {
  font-size: 24px;
}

.nav-links span {
  margin: 0 15px;
  font-size: 14px;
  color: white;
  cursor: pointer;
}

.nav-links span:hover {
  text-decoration: underline;
}

.language-select {
  display: flex;
  align-items: center;
  margin-left: 15px;
  color: white;
}

.flag-icon {
  width: 20px;
  height: auto;
  margin-right: 5px;
}

.help-text {
  margin: 0 15px;
  font-size: 14px;
  color: white;
}

.nav-link {
  margin: 0 15px;
  font-size: 14px;
  color: white;
  text-decoration: none;
  position: relative;
  padding: 8px 0;
  transition: all 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #FFC107;
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: #FFC107;
}

.nav-link:hover::after {
  width: 100%;
}

.router-link-active {
  color: #FFC107;
}

.router-link-active::after {
  width: 100%;
  background-color: #FFC107;
}
</style>