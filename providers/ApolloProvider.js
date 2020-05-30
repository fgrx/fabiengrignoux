const ApolloProvider = {
  async test(request) {
    const res = await this.$apollo
      .queries({
        mutation: request.query,
        variables: request.variables
      })
      .then(({ data }) => console.log(data))
    console.log('fin!')
  }
}

export default ApolloProvider
