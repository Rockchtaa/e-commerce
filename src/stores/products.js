import { defineStore } from "pinia";
import axios from "axios";

export const useProductsStore = defineStore("productsModule", {
  state: () => ({
    flashDeals: [],
    newProducts: [],
    categories: [
    {
      title : "Fragrances",
      route: "/fragrances",
    },
    {
      title : "Furniture",
      route: "/furniture",
    },
    {
      title : "Beauty",
      route: "/beauty",
    },
    {
      title : "Groceries",
      route: "/groceries",
    },
    {
      title : "Mobile-accessories",
      route: "/mobile-accessories",
    },
    {
      title : "Skin-care",
      route: "/skin-care",
    }
  ],
  }),
  actions: {
    async getProducts() {
      await axios.get("https://dummyjson.com/products").then((response) => {
        console.log(response.data);
        this.newProducts = response.data.products.filter(
          (product) => product.category === "fragrances"
        );
        this.flashDeals = response.data.products.slice(0, 8);
      });
    },
  },
});
