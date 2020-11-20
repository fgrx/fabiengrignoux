<template>
  <v-container>
    <div class="head">
      <h1>Liste de publications</h1>
    </div>
    <v-row>
      <v-col v-for="post in posts" :key="post.id" cols="12" sm="6">
        <ItemPost :post="post" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ItemPost from '../../components/ItemPost.vue'
import postsService from '@/services/posts'

export default {
  components: {
    ItemPost,
  },

  async asyncData({ app }) {
    const posts = await postsService.getPosts(app)

    return {
      posts,
    }
  },
}
</script>

<style lang="scss" scoped>
.head {
  margin-top: 2em;
}
</style>
