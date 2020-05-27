<template>
  <div class="content__home">
    <div class="container__index entete__box">
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
              <v-btn color="accent" width="230" class="button__header">
                <v-icon>mdi-email-edit</v-icon>Me contacter
              </v-btn>
              <v-btn color="secondary" width="230" class="button__header">
                <v-icon>mdi-file-document-edit-outline</v-icon>Demander un devis
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <AnimationFabien />
          </v-col>
        </v-row>
      </v-container>
    </div>

    <v-container class="container__index centered services__box">
      <h2>Développez votre présence numérique</h2>

      <v-row>
        <v-col v-for="service in premierePage.services" :key="service.id">
          <div class="espace__logo">
            <img class="illustration" :src="require('@/assets/' + service.svg)" alt />
          </div>
          <h3>{{ service.title }}</h3>
          <p>{{ service.content }}</p>
        </v-col>
      </v-row>
    </v-container>

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
            <v-btn to="./portfolio" color="secondary">Voir plus de projets</v-btn>
          </v-row>
        </v-container>
      </v-container>
    </div>

    <v-container class="container__index">
      <PresentationPremPage
        v-if="premierePage.presentation"
        :presentation="premierePage.presentation"
      />

      <v-row>
        <v-col cols="12" sm="6">
          <h2>Mes technologies</h2>
        </v-col>
        <v-col cols="12" sm="6">
          <AnimationFabien2 />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PresentationPremPage from '../components/PresentationPremPage.vue'
import gql from 'graphql-tag'
import porfoliosQuery from '@/graphql/allPortfolios'
import premPageQuery from '@/graphql/premPage'

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
    PresentationPremPage
  },
  data() {
    return {
      portfolios: [],
      premierePage: {}
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
    }
  },
  mounted() {
    this.presentation = this.premierePage.presentation
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
</style>
