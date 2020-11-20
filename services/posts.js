import postsQuery from '@/graphql/allPublications'
import postQuery from '@/graphql/getPublication'

export default {
  async getPosts(app) {
    const postsRequest = await app.apolloProvider.defaultClient.query({
      query: postsQuery
    })

    return postsRequest.data.articles
  },

  async getSinglePost(app, slug) {
    const singlePostRequest = await app.apolloProvider.defaultClient.query({
      query: postQuery,
      variables: { slug }
    })

    return singlePostRequest.data.articles[0]
  }
}
