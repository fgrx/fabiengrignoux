<template>
  <div>
    <v-btn
      v-if="mode"
      :to="{ name: 'technos-slug', params: { slug: techno.slug } }"
      class="item__techno"
      fab
    >
      <v-img :src="image" :alt="'logo ' + techno.title" max-width="40px" />
      {{ techno.title }}
    </v-btn>

    <div v-if="!mode">
      <v-img :src="image" :alt="'logo ' + techno.title" max-width="40px" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    techno: {
      type: Object,
      default: {}
    },
    mode: {
      type: String,
      default: null
    }
  },
  computed: {
    image() {
      const imageDisplay =
        typeof this.techno.image.size == 'undefined'
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
