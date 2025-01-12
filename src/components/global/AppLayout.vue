<template>
  <div class="layout">
    <v-layout class="position-relative">
      <CartDrawer />
      <v-main style="padding-top: 120px;">
        <slot></slot>
      </v-main>
      <Appnav />
      <MyAppFooter /> 
    </v-layout>
  </div>
</template>
<script>
import Appnav from "./AppNav";
import MyAppFooter from "./MyAppFooter";
import CartDrawer from "./CartDrawer";

export default {    
  components: {
    Appnav,
    MyAppFooter,
    CartDrawer,
  },        
};

</script>