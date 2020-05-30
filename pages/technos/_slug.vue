<template>
  <v-container>
    <v-row align="center" justify="center" class="flex-sm-row-reverse">
      <v-col cols="12" xs="12" sm="5">
        <h1 v-if="techno.title">{{ techno.title }}</h1>

        <div class="description">{{ techno.description }}</div>
      </v-col>
      <v-col cols="12" xs="12" sm="6" class="techno__top">
        <v-row class="techno__logo" align="center" justify="center">
          <v-img
            :src="
              typeof techno.image.size !== 'undefined' &&
              typeof techno.image.size.medium === 'Object'
                ? techno.image.size.medium.url
                : techno.image.url
            "
            :alt="'Projets ' + techno.title"
            class="techno__imagePrincipale"
            max-width="300"
          ></v-img>
        </v-row>
      </v-col>
    </v-row>

    <h2>Projets {{ techno.title }}</h2>
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
import Portfolio from '../../components/ItemPortfolio.vue'
import technoQuery from '@/graphql/getTechno'
import ApolloProvider from '@/providers/ApolloProvider'

export default {
  components: {
    Portfolio
  },

  async asyncData({ app, route }) {
    const apolloQuery = await app.apolloProvider.defaultClient.query({
      query: technoQuery,
      variables: { slug: route.params.slug }
    })

    const techno = apolloQuery.data.technos[0]

    return {
      techno
    }
  },
  head() {
    return {
      title: 'Fabien Grignoux - projets développés avec ' + this.techno.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'portfolio front-end & backend : Liste des projets réalisés avec' +
            this.title
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content:
            'Fabien Grignoux - projets développés avec ' + this.techno.title
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: process.env.siteUrl + '/technos/' + this.techno.slug
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content:
            'portfolio front-end & backend : Liste des projets réalisés avec' +
            this.techno.title
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

<style lang="scss" scoped>
.techno__top {
  background: url('~@/assets/img/forme.svg') no-repeat;
  text-align: center;
  background-size: contain;
  background-position-x: center;
  height: 430px;

  .techno__logo {
    height: 100%;
  }
}

.techno__imagePrincipale {
  transform: rotate(-10deg) scale(1);
  transition-property: all ease-in-out;
  z-index: 2;
  transition-duration: 0.5s;
  &:hover {
    transform: rotate(0deg) scale(1.4);
  }
}
</style>
