<template>
  <div class="top_cat">
    <div class="cyber_banner">
      <img src="../../assets/images/cyber-banner.webp" class="w-100 mt-10" alt="Cyber Banner" />
    </div>
    <div class="categories">
      <div class="title d-flex justify-center align-center px-5">
        <h2 class="text-center flex-grow-1" style="font-weight: 700;">Top Categories</h2>
        <a href="#" class="text-black"> Shop All</a>
      </div>
      <v-container>
        <v-row>
          <v-col cols="2" v-for="category in categories" :key="category.title">
            <v-card class="text-center" elevation="0">
              <v-hover v-slot="{ isHovering, props }">
                <img :src="category.image" alt="" v-bind="props" 
                  :style="`
                  cursor: pointer; 
                  transition: 0.4s all ease-in-out;
                  scale: ${isHovering ? 1.10 : 1};`">
              </v-hover>
              <v-card-text>{{ category.title }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TopCategories',
  data() {
    return {
      categories: [
        {
          title: 'Electronics',
          image: 'https://new-ella-demo.myshopify.com/cdn/shop/files/mobile-phones.png?v=10616357514144629263',
        },
        {
          title: 'Laptops',
          image: 'https://new-ella-demo.myshopify.com/cdn/shop/files/laptops-tablets.png?v=17546078654541140209',
        },
        {
          title: 'Home & Kitchen',
          image: 'https://new-ella-demo.myshopify.com/cdn/shop/files/televisions.png?v=792225267698738137',
        },
        {
          title: 'Health & Beauty',
          image: 'https://new-ella-demo.myshopify.com/cdn/shop/files/pcs-accessories.png?v=7913320403362682840',
        },
        {
          title: 'Sports & Outdoors',
          image: 'https://new-ella-demo.myshopify.com/cdn/shop/files/audio-video.png?v=17118273463527967791',
        },
        {
          title: 'Toys & Games',
          image: 'https://new-ella-demo.myshopify.com/cdn/shop/files/gaming-accessories.png?v=5365032838061682635',
        },
        {
          title: 'Books',
          image: 'https://new-ella-demo.myshopify.com/cdn/shop/files/gaming-accessories.png?v=5365032838061682635',
        },
        {
          title: 'Automotive',
          image: 'https://new-ella-demo.myshopify.com/cdn/shop/files/kitchen-appliances.png?v=912885117927234410',
        },
        {
          title: 'Books',
          image: 'https://new-ella-demo.myshopify.com/cdn/shop/files/cameras.png?v=10468174360605840515',
        },
        {
          title: 'Sports & Outdoors',
          image: 'https://new-ella-demo.myshopify.com/cdn/shop/files/consumables.png?v=1604898607781595964',
        },
        {
          title: 'Toys & Games',
          image: 'https://new-ella-demo.myshopify.com/cdn/shop/files/smart-homes.png?v=11511407578445752828',
        },
        {
          title: 'Automotive',
          image: 'https://new-ella-demo.myshopify.com/cdn/shop/files/accessories.png?v=16090558546215869367',
        },


      ]
    }
  }
}
</script>