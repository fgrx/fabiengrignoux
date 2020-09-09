<template>
  <div class="content__home">
    <div class="container__index entete__box">
      <section>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <div
                v-if="premierePage.headsite"
                class="head__site"
                id="head__site"
                v-html="$md.render(premierePage.headsite)"
              ></div>
              <div id="contact__buttons">
                <v-btn
                  color="#000080"
                  dark
                  @click="contactAction"
                  width="230"
                  class="button__header"
                >
                  <i class="material-icons">email</i>
                  Me contacter
                </v-btn>
                <v-btn
                  @click="getDevisAction"
                  dark
                  color="#50389a"
                  width="230"
                  class="button__header"
                >
                  <i class="material-icons">description</i>
                  Demander un devis
                </v-btn>
              </div>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="animationFabien1">
                <AnimationFabien />
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>
    </div>

    <section v-for="pitch in premierePage.pitch" :key="pitch.id">
      <v-container class="container__index container__pitch">
        <v-row class="flex-sm-row-reverse">
          <v-col cols="12" sm="7">
            <h2>{{ pitch.title }}</h2>
            <div v-html="$md.render(pitch.content)"></div>
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

        <v-row v-view.once="viewHandlerServices">
          <v-col
            cols="12"
            sm="4"
            v-for="(service, index) in premierePage.services"
            :key="index"
          >
            <div :class="'espace__logo espace__logo__' + index">
              <img
                :class="'illustration__service illustration__service__' + index"
                :src="require('@/assets/img/' + service.svg)"
                alt
              />
            </div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.content }}</p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- <section>
      <div class="container__mes__clients">
        <v-container>
          <h2>Mes clients</h2>
          <h3>
            Je travaille aussi bien avec des institutions que des PME ou des
            indépendants.
          </h3>
          <v-row>
            <v-col v-for="client in clients" :key="client.id">
              <v-card outlined>
                <v-img
                  :src="client.image.url"
                  :alt="'logo ' + client.title"
                  max-width="200"
                  min-height="300"
                ></v-img>
                <v-card-title>{{ client.title }}</v-card-title>
                <v-card-subtitle>{{ client.subtitle }}</v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </section>-->

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
                v-for="techno in technosFront"
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
                v-for="techno in technosBack"
                :key="techno.id"
              >
                <ItemTechno :techno="techno" mode="link" class="item__techno" />
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
//import clientsListQuery from '@/graphql/clientsList'

import Portfolio from '../components/ItemPortfolio.vue'
import Forme from '../components/Forme.vue'
import Loading from '@/components/Loading'

import { gsap } from 'gsap'

export default {
  components: {
    AnimationFabien: () => ({
      component: import('@/components/AnimationFabien'),
      loading: Loading,
      delay: 10,
      timeout: 6000
    }),
    AnimationFabien2: () => ({
      component: import('@/components/AnimationFabien2'),
      loading: Loading,
      delay: 10,
      timeout: 6000
    }),
    Forme,
    Portfolio,
    PresentationPremPage,
    ItemTechno
  },
  data() {
    return {
      portfolios: [],
      premierePage: {},
      technosBack: [],
      technosFront: []
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

  async asyncData({ app }) {
    const premierePageQuery = await app.apolloProvider.defaultClient.query({
      query: premPageQuery
    })
    const premierePage = premierePageQuery.data.premierePage

    const portfoliosQuery = await app.apolloProvider.defaultClient.query({
      query: porfoliosQuery,
      variables: {
        limit: 6
      }
    })
    const portfolios = portfoliosQuery.data.portfolios

    const technosBackQuery = await app.apolloProvider.defaultClient.query({
      query: technosListQuery,
      variables: {
        type: 'back'
      },
      update: (data) => data.technos
    })
    const technosBack = technosBackQuery.data.technos

    const technosFrontQuery = await app.apolloProvider.defaultClient.query({
      query: technosListQuery,
      variables: {
        type: 'front'
      },
      update: (data) => data.technos
    })
    const technosFront = technosFrontQuery.data.technos

    return {
      premierePage,
      portfolios,
      technosBack,
      technosFront
    }
  },

  apollo: {
    // clients: {
    //   query: clientsListQuery
    // },
  },
  mounted() {
    this.presentation = this.premierePage.presentation
    gsap.to('.animationFabien1', {
      y: -100,
      opacity: 1,
      duration: 2,
      ease: 'back'
    })
  },
  methods: {
    contactAction() {
      $nuxt.$emit('openContact', true)
    },
    getDevisAction() {
      $nuxt.$emit('openDevis', true)
    },
    viewHandlerServices() {
      let tl = gsap.timeline({ repeat: 0 })
      for (let i = 0; this.premierePage.services.length > i; i++) {
        tl.to(
          '.illustration__service__' + i,
          { y: 50, opacity: 1, duration: 1 },
          '<.3'
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.animationFabien1 {
  opacity: 0;
  margin-top: 100px;
}

.illustration__service {
  opacity: 0;
  margin-top: -50px;
  max-width: 200px;
}

.espace__logo {
  min-height: 160px;
}

.services__box {
  margin-top: 1.7em;
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

h2 {
  font-family: 'Raleway', sans-serif;
  padding: 1em 0 0.5em 0;
  font-size: 3em;
  &.homepage {
    font-size: 2em !important;
  }
  @media screen and (max-width: 640px) {
    text-align: center;
    font-size: 2em;
  }
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

.head__site {
  margin-top: 2em;
  @media screen and (min-width: 1000px) {
    margin-top: 4em;
  }
}
</style>
