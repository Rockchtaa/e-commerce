<template>
  <div class="top-offers">
    <v-container fluid>
      <v-row>
        <!-- First Column with Hover Effect for All Images -->
        <v-col cols="4">
          <v-hover v-slot:default="{ isHovering, props }">
            <div
              class="parent"
              v-bind="props"
              style="overflow: hidden; height: 1000%"
            >
              <img
                src="../../assets/images/playstations.webp"
                :style="getImageStyle(isHovering)"
              />
            </div>
          </v-hover>
        </v-col>

        <!-- Second Column -->
        <v-col cols="4">
          <v-hover v-slot:default="{ isHovering, props }">
            <div
              class="parent"
              v-bind="props"
              style="overflow: hidden; height: 1000%"
            >
              <img
                src="../../assets/images/chairs.webp"
                :style="getImageStyle(isHovering)"
              />
            </div>
          </v-hover>
        </v-col>

        <!-- Third Column -->
        <v-col cols="4">
          <v-hover v-slot:default="{ isHovering, props }">
            <div
              class="parent"
              v-bind="props"
              style="overflow: hidden; height: 100%"
            >
              <img
                src="../../assets/images/headset.webp"
                :style="getImageStyle(isHovering)"
              />
            </div>
          </v-hover>
        </v-col>

        <!-- Fourth Column -->
        <v-col cols="6">
          <v-hover v-slot:default="{ isHovering, props }">
            <div
              class="parent"
              v-bind="props"
              style="overflow: hidden; height: 100%"
            >
              <img
                src="../../assets/images/iphones.webp"
                :style="getImageStyle(isHovering)"
              />
            </div>
          </v-hover>
        </v-col>

        <!-- Fifth Column -->
        <v-col cols="6">
          <v-hover v-slot:default="{ isHovering, props }">
            <div
              class="parent"
              v-bind="props"
              style="overflow: hidden; height: 100%"
            >
              <img
                src="../../assets/images/laptops.webp"
                :style="getImageStyle(isHovering)"
              />
            </div>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "TopOffers",
  methods: {
    getImageStyle(isHovering = false) {
      return {
        width: "100%",
        cursor: "pointer",
        transition: "0.5s all ease-in-out",
        transform: isHovering ? "scale(1.1)" : "scale(1)",
      };
    },
  },
};
</script>

<style scoped>
.parent {
  position: relative;
}
</style>
