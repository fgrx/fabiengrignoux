<template>
  <v-container>
    <v-row align="center" justify="center" class="flex-sm-row-reverse">
      <v-col cols="12" xs="12" sm="5" md="7" xl="9">
        <h1 v-if="portfolio.title">{{ portfolio.title }}</h1>

        <div class="description">{{ portfolio.description }}</div>

        <div class="links">
          <v-btn
            v-if="portfolio.url"
            :href="portfolio.url"
            target="blank"
            color="primary"
          >
            <v-icon>mdi-link</v-icon>Voir en ligne
          </v-btn>
          <v-btn
            v-if="portfolio.urlgithub"
            :href="portfolio.urlgithub"
            target="blank"
            color="secondary"
          >
            <v-icon>mdi-github</v-icon>Github
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" xs="12" sm="7" md="5" xl="3">
        <div class="portfolio__top">
          <div class="portfolio__container__row">
            <v-row align="center" justify="center">
              <div>
                <v-img
                  :src="image"
                  :alt="'logo de l\'article ' + portfolio.title"
                  class="portfolio__imagePrincipale"
                  max-width="350"
                ></v-img>
                <div class="portfolio__techno_list">
                  <div v-for="techno in portfolio.technos" :key="techno.id">
                    <ItemTechno
                      :techno="techno"
                      mode="link"
                      class="item__techno"
                    />
                  </div>
                </div>
              </div>
            </v-row>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="7">
        <div class="content" v-html="$md.render(portfolio.content)"></div>
        <div class="phrasechoc" v-if="portfolio.phrasechoc">
          {{ portfolio.phrasechoc }}
        </div>
      </v-col>

      <v-col cols="12" sm="5">
        <div class="capture">
          <div v-for="capture in portfolio.images" :key="capture.id">
            <v-card class="d-inline-block mx-auto">
              <v-img
                @click="openDialog(capture.url)"
                :src="
                  capture.size.medium ? capture.size.medium.url : capture.url
                "
                alt="Capture d'écran"
                class="portfolio__capture"
                max-width="350"
              ></v-img>
            </v-card>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="800" max-height="800">
      <v-img :src="imgToOpen" alt="Capture d'écran"></v-img>
    </v-dialog>
  </v-container>
</template>

<script>
import ItemTechno from '../../components/ItemTechno.vue'
import portfolioService from '@/services/portfolio'

export default {
  components: {
    ItemTechno,
  },

  data() {
    return {
      imgToOpen: '',
      dialog: false,
    }
  },

  async asyncData({ app, route }) {
    const portfolio = await portfolioService.getPortfolio(app, {
      slug: route.params.slug,
    })

    return {
      portfolio,
    }
  },

  computed: {
    image() {
      const imageDisplay =
        typeof this.portfolio.image.size !== 'Object' &&
        typeof this.portfolio.size == 'undefined'
          ? this.portfolio.image.url
          : this.portfolio.image.size.large.url

      return imageDisplay
    },
  },
  methods: {
    openDialog(img) {
      this.dialog = true
      this.imgToOpen = img
    },
  },
  head() {
    return {
      title:
        'Portfolio Fabien Grignoux, développeur web : ' + this.portfolio.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Portfolio développement frontend & backend : Développement du projet' +
            this.portfolio.description,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content:
            'Portfolio Fabien Grignoux, développeur web : ' +
            this.portfolio.title,
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: process.env.siteUrl + '/portfolio/' + this.portfolio.slug,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content:
            'Portfolio développement frontend & backend : Développement du projet' +
            this.portfolio.description,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: `${this.image}`,
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
.links {
  margin-top: 1.5em;
}

.portfolio__top {
  background: url('~@/assets/img/forme.svg') no-repeat;

  background-size: contain;
  background-position-x: center;
  height: 430px;
}

.portfolio__container__row {
  height: 90%;
  display: flex;
  align-items: center;
}

.portfolio__techno_list {
  margin-top: 1em;
  display: flex;
  text-align: center;
  justify-content: center;
  transform: rotate(-10deg);
}

.portfolio__imagePrincipale {
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

.portfolio__capture {
  cursor: pointer;
}
</style>
