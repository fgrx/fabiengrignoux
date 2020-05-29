<template>
  <v-card :to="{ name: 'posts-slug', params: { slug: post.slug } }" class="item__post">
    <v-img :src="image" class="post__image"></v-img>
    <v-card-title>
      <h3>{{ post.title }}</h3>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: {}
    }
  },
  computed: {
    image() {
      const imageDisplay =
        typeof this.post.image.size == 'undefined'
          ? this.post.image.url
          : this.post.image.size.medium.url

      return imageDisplay
    }
  }
}
</script>

<style lang="scss" scoped>
h3 {
  font-size: 1em;
}

.item__post {
  height: 100%;
}
</style>