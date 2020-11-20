import technosListQuery from '@/graphql/technosList'

export default {
  async getTechnos(app, type) {
    const technosRequest = await app.apolloProvider.defaultClient.query({
      query: technosListQuery,
      variables: {
        type
      },
      update: (data) => data.technos
    })

    return technosRequest.data.technos
  }
}
