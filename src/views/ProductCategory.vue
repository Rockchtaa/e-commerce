<template>
    <div class="product-category-page">
      <v-container>
        <!-- Category Header -->
        <v-row class="mb-6">
          <v-col cols="12">
            <h1 class="text-h4 font-weight-bold">{{ formattedCategoryTitle }}</h1>
            <v-breadcrumbs :items="breadcrumbs" divider=">" class="px-0"></v-breadcrumbs>
          </v-col>
        </v-row>
  
        <!-- Filters and Sorting -->
        <v-row class="mb-4">
          <v-col cols="12" md="3">
            <!-- Category Filters -->
            <v-card class="mb-4" > 
              <v-card-title class="text-subtitle-1 font-weight-medium">
                Filters
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-expansion-panels flat>
                  <v-expansion-panel>
                    <v-expansion-panel-title>Price Range</v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <v-range-slider
                        v-model="priceRange"
                        :min="0"
                        :max="2000"
                        @update:model-value="filterProducts"
                        class="mt-4"
                      ></v-range-slider>
                      <div class="d-flex justify-space-between">
                        <span>${{ priceRange[0] }}</span>
                        <span>${{ priceRange[1] }}</span>
                      </div>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                  
                  <v-expansion-panel>
                    <v-expansion-panel-title>Brand</v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <v-checkbox
                        v-for="brand in availableBrands"
                        :key="brand"
                        v-model="selectedBrands"
                        :label="brand"
                        :value="brand"
                        @update:model-value="filterProducts"
                        hide-details
                        dense
                      ></v-checkbox>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                  
                  <v-expansion-panel>
                    <v-expansion-panel-title>Rating</v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <v-checkbox
                        v-for="rating in [5, 4, 3, 2, 1]"
                        :key="rating"
                        v-model="selectedRatings"
                        :label="`${rating} stars & up`"
                        :value="rating"
                        @update:model-value="filterProducts"
                        hide-details
                        dense
                      ></v-checkbox>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card-text>
            </v-card>
          </v-col>
  
          <v-col cols="12" md="9">
            <!-- Sorting and View Options -->
            <v-row class="mb-4">
              <v-col cols="12" sm="6">
                <v-select
                  v-model="sortBy"
                  :items="sortOptions"
                  label="Sort By"
                  outlined
                  dense
                  @update:model-value="sortProducts"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" class="d-flex justify-end align-center">
                <span class="mr-2">View:</span>
                <v-btn-toggle v-model="viewMode" mandatory>
                  <v-btn value="grid">
                    <v-icon>mdi-view-grid</v-icon>
                  </v-btn>
                  <v-btn value="list">
                    <v-icon>mdi-view-list</v-icon>
                  </v-btn>
                </v-btn-toggle>
              </v-col>
            </v-row>
  
            <!-- Products Grid -->
            <v-row v-if="viewMode === 'grid'">
              <v-col
                v-for="product in displayedProducts"
                :key="product.id"
                cols="12"
                sm="6"
                md="4"
              >
                <v-card  @click="navigateToProductDetails(product.id)" class="product-card h-100" hover>
                  <div class="position-relative">
                    <v-img
                      :src="product.thumbnail"
                      height="240"
                      cover
                      class="product-image"
                    >
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular indeterminate color="primary"></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                    <v-chip v-if="product.discountPercentage > 10" color="red" class="discount-chip white--text">
                      -{{ Math.round(product.discountPercentage) }}%
                    </v-chip>
                  </div>
                  <v-card-title class="product-title">{{ product.title }}</v-card-title>
                  <v-card-text>
                    <div class="d-flex align-center mb-2">
                      <v-rating
                        :model-value="product.rating"
                        color="amber"
                        density="compact"
                        size="small"
                        readonly
                      ></v-rating>
                      <span class="text-subtitle-2 ml-2">{{ product.rating }}</span>
                    </div>
                    <div class="d-flex align-center mb-3">
                      <span class="text-h6 mr-2">${{ product.price }}</span>
                      <span v-if="product.discountPercentage > 0" class="text-decoration-line-through text-body-2 text-grey">
                        ${{ Math.round(product.price * (100 / (100 - product.discountPercentage))) }}
                      </span>
                    </div>
                    <p class="text-body-2 text-truncate-2">{{ product.description }}</p>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn block color="primary" @click="addToCart(product)">Add to Cart</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
  
            <!-- Products List View -->
            <div v-else>
              <v-card @click="navigateToProductDetails(product.id)" v-for="product in displayedProducts" :key="product.id" class="mb-4 product-list-item" hover>
                <div class="d-flex flex-column flex-sm-row">
                  <v-img
                    :src="product.thumbnail"
                    width="200"
                    height="200"
                    cover
                    class="flex-shrink-0"
                  >
                    <v-chip v-if="product.discountPercentage > 10" color="red" class="discount-chip white--text">
                      -{{ Math.round(product.discountPercentage) }}%
                    </v-chip>
                  </v-img>
                  <div class="pa-4 d-flex flex-column flex-grow-1">
                    <div>
                      <h3 class="text-h6 mb-2">{{ product.title }}</h3>
                      <div class="d-flex align-center mb-2">
                        <v-rating
                          :model-value="product.rating"
                          color="amber"
                          density="compact"
                          size="small"
                          readonly
                        ></v-rating>
                        <span class="text-subtitle-2 ml-2">{{ product.rating }}</span>
                      </div>
                      <p>{{ product.description }}</p>
                    </div>
                    <div class="mt-auto">
                      <div class="d-flex align-center mb-3">
                        <span class="text-h6 mr-2">${{ product.price }}</span>
                        <span v-if="product.discountPercentage > 0" class="text-decoration-line-through text-body-2 text-grey">
                          ${{ Math.round(product.price * (100 / (100 - product.discountPercentage))) }}
                        </span>
                      </div>
                      <div class="d-flex">
                        <v-btn block color="primary" @click="addToCart(product)">Add to Cart</v-btn>
                        <v-btn icon variant="text">
                          <v-icon>mdi-heart-outline</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                </div>
              </v-card>
            </div>
  
            <!-- Pagination -->
            <v-row v-if="filteredProducts.length > 0">
              <v-col cols="12" class="d-flex justify-center mt-4">
                <v-pagination
                  v-model="page"
                  :length="Math.ceil(filteredProducts.length / perPage)"
                  total-visible="7"
                ></v-pagination>
              </v-col>
            </v-row>
  
            <!-- No Products Found -->
            <v-alert v-if="filteredProducts.length === 0" type="info" class="mt-4">
              No products found matching your criteria. Try adjusting your filters.
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script>
// import { useProductsStore } from "@/stores/products";
import axios from "axios";
  
  export default {
    inject: ['emitter'],
    name: "ProductCategory",
    data() {
      return {
        products: [],
        loading: true,
        error: null,
        viewMode: "grid",
        page: 1,
        perPage: 9,
        sortBy: "featured",
        priceRange: [0, 2000],
        selectedBrands: [],
        selectedRatings: [],
        sortOptions: [
          { title: "Featured", value: "featured" },
          { title: "Price: Low to High", value: "price_asc" },
          { title: "Price: High to Low", value: "price_desc" },
          { title: "Rating: High to Low", value: "rating_desc" },
          { title: "Newest First", value: "newest" }
        ]
      };
    },
    computed: {
      categorySlug() {
        return this.$route.params.category;
      },
      formattedCategoryTitle() {
        return this.categorySlug
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      },
      breadcrumbs() {
        return [
          {
            title: 'Home',
            disabled: false,
            href: '/',
          },
          {
            title: this.formattedCategoryTitle,
            disabled: true,
          },
        ];
      },
      filteredProducts() {
        let result = [...this.products];
        
        // Filter by price range
        result = result.filter(product => 
          product.price >= this.priceRange[0] && 
          product.price <= this.priceRange[1]
        );
        
        // Filter by brands
        if (this.selectedBrands.length > 0) {
          result = result.filter(product => 
            this.selectedBrands.includes(product.brand)
          );
        }
        
        // Filter by ratings
        if (this.selectedRatings.length > 0) {
          const minRating = Math.min(...this.selectedRatings);
          result = result.filter(product => product.rating >= minRating);
        }
        
        // Apply sorting
        this.applySorting(result);
        
        return result;
      },
      displayedProducts() {
        const start = (this.page - 1) * this.perPage;
        const end = start + this.perPage;
        return this.filteredProducts.slice(start, end);
      },
      availableBrands() {
        const brands = this.products.map(product => product.brand);
        return [...new Set(brands)].sort();
      }
    },
    watch: {
      categorySlug: {
        immediate: true,
        handler() {
          this.fetchProducts();
        }
      }
    },
    methods: {
      async fetchProducts() {
        this.loading = true;
        this.error = null;
        
        try {
          // Using DummyJSON API to get products based on category
          const category = this.categorySlug.replace(/-/g, '');
          const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
          
          if (response.data.products && response.data.products.length > 0) {
            this.products = response.data.products;
          } else {
            // Fallback: Get all products and filter locally if category doesn't exist in API
            const allProductsResponse = await axios.get('https://dummyjson.com/products?limit=100');
            this.products = allProductsResponse.data.products.filter(product => 
              product.category.toLowerCase().includes(this.categorySlug.replace(/-/g, ''))
            );
            
            // If still no products, just show some products as samples
            if (this.products.length === 0) {
              this.products = allProductsResponse.data.products.slice(0, 12);
            }
          }
        } catch (error) {
          console.error('Error fetching products:', error);
          this.error = 'Failed to load products. Please try again later.';
          this.products = [];
        } finally {
          this.loading = false;
        }
      },
      filterProducts() {
        // Reset to first page when filters change
        this.page = 1;
      },
      sortProducts() {
        // Just trigger recompute of filteredProducts
        this.page = 1;
      },
      applySorting(productsArray) {
        switch (this.sortBy) {
          case 'price_asc':
            productsArray.sort((a, b) => a.price - b.price);
            break;
          case 'price_desc':
            productsArray.sort((a, b) => b.price - a.price);
            break;
          case 'rating_desc':
            productsArray.sort((a, b) => b.rating - a.rating);
            break;
          case 'newest':
            // Using id as proxy for newest since API doesn't have date
            productsArray.sort((a, b) => b.id - a.id);
            break;
          default:
            // Default sorting (featured) - use API default order
            break;
        }
      },
      navigateToProductDetails(productId) {
        this.$router.push({ name: 'ProductDetails', params: { id: productId } });
      },
      addToCart(product) {
        this.emitter.emit('addToCart', { ...product, quantity: 1 });
      }
    }
  };
  </script>
  
<style scoped>
  .product-card {
    transition: transform 0.3s, box-shadow 0.3s;
    position: relative;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  .product-image {
    transition: opacity 0.3s;
  }
  
  .product-card:hover .product-image {
    opacity: 0.9;
  }
  
  .product-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .text-truncate-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .discount-chip {
    position: absolute;
    top: 10px;
    right: 10px;
    font-weight: bold;
  }
  
  .product-list-item {
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .product-list-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
</style>