<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12">
          <h1>Portfolio</h1>
          <p>
            Après 15 années de développement web, je ne vais pas vous ennuyer
            avec tous les projets que j'ai pu réaliser. Voici donc une sélection
            d'une partie d'entre eux qui me tiennent à coeur aujourd'hui.
          </p>
        </v-col>
        <v-col>
          <v-row>
            <v-col
              cols="12"
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
import portfolioService from '@/services/portfolio'

export default {
  components: {
    Portfolio,
  },

  async asyncData({ app, route }) {
    const portfolios = await portfolioService.getPortfolios(app, { limit: 20 })

    return {
      portfolios,
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
            'Voici quelques projets front et back end utilisant mes technologies favorites : Javascript, Vue, Php & Symfony',
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content:
            'Portfolio de Fabien Grignoux, développeur front-end et back-end à Lyon',
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: process.env.siteUrl + '/portfolio',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content:
            'Voici quelques projets front et back end utilisant mes technologies favorites : Javascript, Vue, Php & Symfony',
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: `${process.env.siteUrl}/ogimage.jpg`,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'développeur, front,back, front-end,back-end fullstack, lyon, php, symfony, nuxt,vue.js,angular,Javascript',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
h1 {
  margin-top: 1em;
}
</style>
