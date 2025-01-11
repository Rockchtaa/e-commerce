<template>
  <div class="layout">
    <v-layout>
      <CartDrawer />
      <v-main>
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