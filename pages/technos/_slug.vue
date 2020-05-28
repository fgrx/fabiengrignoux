<template>
  <v-container>
    <h1>Projets {{ techno.title }}</h1>
    <p>{{ techno.description }}</p>

    <v-row>
      <v-col
        col="12"
        xs="6"
        sm="4"
        v-for="portfolio in techno.portfolios"
        :key="portfolio.id"
      >
        <v-card>
          <Portfolio :portfolio="portfolio" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Portfolio from '../../components/Portfolio.vue'
import technoQuery from '@/graphql/getTechno'

export default {
  components: {
    Portfolio
  },
  data() {
    return {
      techno: {}
    }
  },
  apollo: {
    techno: {
      query: technoQuery,
      variables() {
        return { slug: this.$route.params.slug }
      },
      update: (data) => data.technos[0]
    }
  }
}
</script>

<style lang="scss" scoped></style>
