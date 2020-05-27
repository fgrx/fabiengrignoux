<template>
  <v-btn class="item__techno" text>
    <v-img :src="techno.image.url" :alt="'logo ' + techno.title" max-width="40px" />
  </v-btn>
</template>

<script>
export default {
  props: {
    techno: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style lang="scss" scoped>
.item__techno {
  display: inline;
}
</style>
