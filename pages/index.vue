<template>
  <div class="content__home">
    <div class="container__index entete__box">
      <section>
        <v-container>
          <v-row align="center">
            <v-col cols="12" sm="6">
              <div
                v-if="premierePage.headsite"
                class="head__site"
                id="head__site"
                v-html="$md.render(premierePage.headsite)"
              ></div>
              <div id="contact__buttons">
                <v-btn
                  color="accent"
                  @click="contactAction"
                  width="230"
                  class="button__header"
                >
                  <v-icon>mdi-email-edit</v-icon>Me contacter
                </v-btn>
                <v-btn
                  @click="getDevisAction"
                  color="secondary"
                  width="230"
                  class="button__header"
                >
                  <v-icon>mdi-file-document-edit-outline</v-icon>Demander un
                  devis
                </v-btn>
              </div>
            </v-col>
            <v-col cols="12" sm="6">
              <AnimationFabien />
            </v-col>
          </v-row>
        </v-container>
      </section>
    </div>

    <section v-if="premierePage.pitch[0].content">
      <v-container class="container__index container__pitch">
        <v-row class="flex-sm-row-reverse">
          <v-col cols="12" sm="7">
            <h2>{{ premierePage.pitch[0].title }}</h2>
            <div v-html="$md.render(premierePage.pitch[0].content)"></div>
          </v-col>
          <v-col cols="12" sm="5">
            <AnimationFabien2 />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section>
      <v-container class="container__index centered services__box">
        <h2>En quoi puis-je vous aider ?</h2>

        <v-row>
          <v-col v-for="service in premierePage.services" :key="service.id">
            <div class="espace__logo">
              <img
                class="illustration"
                :src="require('@/assets/' + service.svg)"
                alt
              />
            </div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.content }}</p>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section>
      <div class="container__index portfolio__home">
        <v-container>
          <h2 class="centered">Portfolio</h2>

          <v-row no-gutters>
            <v-col
              col="12"
              xs="6"
              sm="4"
              v-for="portfolio in portfolios"
              :key="portfolio.id"
              class="pa-0 ma-0"
            >
              <Portfolio :portfolio="portfolio" />
            </v-col>
          </v-row>
          <v-container>
            <v-row justify="center">
              <v-btn to="./portfolio" color="secondary"
                >Voir plus de projets</v-btn
              >
            </v-row>
          </v-container>
        </v-container>
      </div>
    </section>

    <v-container class="container__index container__technos">
      <section>
        <PresentationPremPage
          v-if="premierePage.presentation"
          :presentation="premierePage.presentation"
        />
      </section>

      <section>
        <v-row align="center" justify="center" class="technos__block">
          <v-col cols="12" sm="5">
            <h3>Mes technos front-end</h3>
            <v-row>
              <v-col
                cols="6"
                sm="4"
                v-for="techno in technosfront"
                :key="techno.id"
              >
                <ItemTechno :techno="techno" mode="link" class="item__techno" />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" offset-md="2" sm="5" class="technos__block">
            <h3>Mes technos back-end</h3>
            <v-row>
              <v-col
                cols="6"
                sm="4"
                v-for="techno in technosback"
                :key="techno.id"
              >
                <ItemTechno :techno="techno" class="item__techno" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </div>
</template>

<script>
import ItemTechno from '../components/ItemTechno.vue'
import PresentationPremPage from '../components/PresentationPremPage.vue'
import gql from 'graphql-tag'
import porfoliosQuery from '@/graphql/allPortfolios'
import premPageQuery from '@/graphql/premPage'
import technosListQuery from '@/graphql/technosList'

import Portfolio from '../components/Portfolio.vue'
import Forme from '../components/Forme.vue'
import AnimationFabien from '@/components/AnimationFabien'
import AnimationFabien2 from '@/components/AnimationFabien2.vue'

export default {
  components: {
    AnimationFabien,
    AnimationFabien2,
    Forme,
    Portfolio,
    PresentationPremPage,
    ItemTechno
  },
  data() {
    return {
      portfolios: [],
      premierePage: {},
      technosback: [],
      technosfront: []
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: process.env.siteDescription
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: process.env.siteTitle
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: process.env.siteUrl
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: process.env.siteDescription
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
  },
  jsonld() {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      creator: 'Fabien Grignoux',
      author: 'Fabien Grignoux',
      url: process.env.siteUrl,
      about: process.env.siteDescription,
      contentLocation: 'Lyon France',
      inLanguage: 'fr',
      keywords:
        'Javascript, développeur, front,back, front-end,back-end fullstack, lyon, php, symfony, nuxt,vue.js,angular'
    }
  },
  apollo: {
    portfolios: {
      query: porfoliosQuery,
      variables: {
        limit: 6
      }
    },
    premierePage: {
      query: premPageQuery
    },
    technosback: {
      query: technosListQuery,
      variables: {
        type: 'back'
      },
      update: (data) => data.technos
    },
    technosfront: {
      query: technosListQuery,
      variables: {
        type: 'front'
      },
      update: (data) => data.technos
    }
  },
  mounted() {
    this.presentation = this.premierePage.presentation
  },
  methods: {
    contactAction() {
      this.$bus.$emit('openContact', true)
    },
    getDevisAction() {
      this.$bus.$emit('openDevis', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.container__index {
  margin-bottom: 2em;
}

.services__box {
  margin-top: 1.7em;
}

.content__home {
  background-image: url('~@/assets/formebackground.svg');
  background-position: top right;

  @media screen and (max-width: 1100px) {
    background-position: top 30%;
  }

  @media screen and (max-width: 640px) {
    background-position-y: top;
    background-position-x: 85%;
  }
}

.illustration {
  max-width: 200px;
}

.espace__logo {
  min-height: 160px;
}

.portfolio__home {
  // background: -webkit-linear-gradient(
  //   to right,
  //   #1d976cff,
  //   #93f9b9ff
  // ); /* Chrome 10-25, Safari 5.1-6 */
  // background: linear-gradient(
  //   to right,
  //   #1d976cff,
  //   #93f9b9ff
  // );

  background: #f3f0f0;

  //height: 50vh;
  color: white;

  padding-top: 0em;
  padding-bottom: 4em;
}

.container__technos {
  h2 {
    font-size: 2em !important;
  }

  h3 {
    text-align: center;
  }

  .technos__block {
    .row {
      border-left: 4px solid #50389a;
    }
  }
}

.container__pitch {
  h2 {
    font-size: 2em;
  }
  font-size: 1.2em;
}
</style>
