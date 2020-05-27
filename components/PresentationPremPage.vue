<template>
  <div>
    <v-row align="center">
      <v-col cols="12" sm="6">
        <AnimationFabien2 />
      </v-col>
      <v-col cols="12" sm="6">
        <h2>{{ presentation.title }}</h2>
        <div
          v-if="presentation.content"
          v-html="$md.render(presentation.content)"
        ></div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AnimationFabien2 from './AnimationFabien2.vue'

export default {
  components: {
    AnimationFabien2
  },
  props: {
    presentation: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style lang="scss" scoped></style>
