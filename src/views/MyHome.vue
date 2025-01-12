<template>
    <div>
      <UpperBanner />
      <TheFeaturesApp />
    </div>
</template>

<script>
import TheFeaturesApp from '@/components/Home-page/TheFeaturesApp.vue';
import UpperBanner from '@/components/Home-page/UpperBanner.vue';

export default {
    name: 'MyHome',
    components: {
        UpperBanner,
        TheFeaturesApp
    }
}
</script>
  
  