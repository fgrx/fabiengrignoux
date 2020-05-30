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
import postsQuery from '@/graphql/allPublications'

export default {
  components: {
    ItemPost
  },

  async asyncData({ app }) {
    const apolloQuery = await app.apolloProvider.defaultClient.query({
      query: postsQuery
    })

    const posts = apolloQuery.data.articles

    return {
      posts
    }
  }
}
</script>

<style lang="scss" scoped>
.head {
  margin-top: 2em;
}
</style>
