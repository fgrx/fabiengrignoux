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
import Portfolio from '../../components/ItemPortfolio.vue'
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
  },
  head() {
    return {
      title:
        'Portfolio de Fabien Grignoux, développeur front-end et back-end à Lyon',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Voici quelques projets front et back end utilisant mes technologies favorites : Javascript, Vue, Php & Symfony'
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content:
            'Portfolio de Fabien Grignoux, développeur front-end et back-end à Lyon'
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: process.env.siteUrl + '/portfolio'
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content:
            'Voici quelques projets front et back end utilisant mes technologies favorites : Javascript, Vue, Php & Symfony'
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: `${process.env.siteUrl}/ogimage.jpg`
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'développeur, front,back, front-end,back-end fullstack, lyon, php, symfony, nuxt,vue.js,angular,Javascript'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
