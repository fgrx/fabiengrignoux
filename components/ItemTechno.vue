<template>
  <v-btn class="item__techno" text>
    <v-img :src="image" :alt="'logo ' + techno.title" max-width="40px" />
    {{techno.title}}
  </v-btn>
</template>

<script>
export default {
  props: {
    techno: {
      type: Object,
      default: {}
    }
  },
  computed: {
    image() {
      const imageDisplay =
        typeof this.techno.image.size.thumbnail == 'undefined'
          ? this.techno.image.url
          : this.techno.image.size.thumbnail.url

      return imageDisplay
    }
  }
}
</script>

<style lang="scss" scoped>
.item__techno {
  display: inline;
}
</style>
