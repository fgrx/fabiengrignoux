<template>
  <div>
    <v-container>
      <v-row justify="center">
        <h1>Portfolio</h1>

        <v-col>
          <v-row>
            <v-col
              col="12"
              xs="6"
              sm="4"
              v-for="portfolio in portfolios"
              :key="portfolio.id"
            >
              <v-card>
                <Portfolio :portfolio="portfolio" />
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Portfolio from '../../components/Portfolio.vue'
import porfoliosQuery from '@/graphql/allPortfolios'

export default {
  components: {
    Portfolio
  },
  data() {
    return {
      portfolios: []
    }
  },
  apollo: {
    portfolios: {
      query: porfoliosQuery,
      variables: {
        limit: 20
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
