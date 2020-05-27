<template>
  <div>
    <v-row align="right">
      <v-col cols="12" sm="4">
        <v-img :src="presentation.image.url" alt="Portrait Fabien Grignoux" class="portrait"></v-img>
      </v-col>
      <v-col cols="12" sm="6">
        <h2>{{ presentation.title }}</h2>
        <div v-if="presentation.content" v-html="$md.render(presentation.content)"></div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    presentation: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
