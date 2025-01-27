<template>
    <div>
      <UpperBanner />
      <TheFeaturesApp />
      <TopOffers />
      <FlashDeals :products="flashDeals" />
    </div>
</template>

<script>
import TheFeaturesApp from '@/components/Home-page/TheFeaturesApp.vue';
import TopOffers from '@/components/Home-page/TopOffers.vue';
import UpperBanner from '@/components/Home-page/UpperBanner.vue';
import FlashDeals from '@/components/Home-page/FlashDeals.vue';
import { mapActions, mapState } from 'pinia';
import { useProductsStore } from '@/stores/products';
export default {
    name: 'MyHome',
    components: {
        UpperBanner,
        TheFeaturesApp,
        TopOffers,
        FlashDeals,
    },
    computed: {
    ...mapState(useProductsStore, ['flashDeals']),
    },
    methods: {
        ...mapActions(useProductsStore, ['getProducts']),
    },
    async mounted() {
        await this.getProducts();
    },
};
</script>
  
  