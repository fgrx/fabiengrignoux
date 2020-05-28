<template>
  <v-row justify="center" align="center" class="flex-sm-row-reverse">
    <v-col cols="12" sm="8">
      <h2>{{ presentation.title }}</h2>
      <div
        v-if="presentation.content"
        v-html="$md.render(presentation.content)"
      ></div>
    </v-col>
    <v-col cols="12" sm="3">
      <v-img
        :src="image"
        alt="Portrait Fabien Grignoux"
        class="portrait"
      ></v-img>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    presentation: {
      type: Object,
      default: {}
    }
  },
  computed: {
    image() {
      const imageDisplay =
        typeof this.presentation.image.size.medium == 'undefined'
          ? this.presentation.image.url
          : this.presentation.image.size.medium.url
      return imageDisplay
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  font-size: 2.5em;
}
</style>
