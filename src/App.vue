<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>

<script>

import AppLayout from './components/global/AppLayout.vue';
export default {
  components: {
    AppLayout,
  }
}
</script>
