import { defineStore } from "pinia";
import axios from 'axios';


export const useProductsStore = defineStore("productsModule", {
    state: () => ({
        flashDeals: [],
    }),
    actions: {
        async getProducts() {
            await axios
            .get("https://dummyjson.com/products")
            .then((response) => {
                this.flashDeals = response.data.products.slice(0, 8);
            })}
    },
})