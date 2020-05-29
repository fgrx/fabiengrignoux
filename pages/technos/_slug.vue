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
                      typeof techno.image.size === 'Object' && typeof techno.image.size.medium === 'Object'
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
      <v-col col="12" xs="6" sm="4" v-for="portfolio in techno.portfolios" :key="portfolio.id">
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
  -webkit-box-shadow: 4px 3px 35px -10px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 4px 3px 35px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 4px 3px 35px -10px rgba(0, 0, 0, 0.75);
  transform: rotate(-10deg) scale(1);
  transition-property: all ease-in-out;
  z-index: 2;
  transition-duration: 0.5s;
  &:hover {
    transform: rotate(0deg) scale(1.4);
  }
}
</style>
