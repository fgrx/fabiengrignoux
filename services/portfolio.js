import porfoliosQuery from '@/graphql/allPortfolios'
import singlePortfolioQuery from '@/graphql/getPortfolio'

export default {
  async getPortfolios(app, variables) {
    const portfoliosRequest = await app.apolloProvider.defaultClient.query({
      query: porfoliosQuery,
      variables
    })
    return portfoliosRequest.data.portfolios
  },

  async getPortfolio(app, variables) {
    const portfolioRequest = await app.apolloProvider.defaultClient.query({
      query: singlePortfolioQuery,
      variables
    })

    const porfolios = portfolioRequest.data.portfolios

    return porfolios[0]
  }
}
