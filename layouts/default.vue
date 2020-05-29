<template>
  <v-app dark>
    <v-app-bar color="transparent" light flat dense class="app-bar" fixed>
      <v-spacer />

      <div class="d-none d-lg-block">
        <v-btn v-for="(item, i) in items" :key="i" :to="item.to" router exact text color="#091584">
          <v-icon>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </div>

      <v-btn icon @click.stop="rightDrawer = !rightDrawer" class="d-lg-none">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container class="pa-0 ma-0" fluid>
        <nuxt />
      </v-container>
      <ContactForm />

    </v-content>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed color="primary" dark>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer class="footerPage">
      <v-container>
        <div class="piedPage">
          <v-row>
            <v-col>
              <span class='footer__text footer__fg'>Fabien Grignoux</span></br>
              <span class='footer__text footer__devlyon'>Développeur web basé à Lyon</span></br >
              <span class='footer__text footer__frontback' >front-end & back-end</span>
            </v-col>
            <v-col>

              <p>
                <v-btn href="mailto:fabien.grignoux@outlook.com" color="secondary" text>
                  <v-icon>mdi-email</v-icon>fabien.grignoux@outlook.com
                </v-btn>
              </p>
                            <p>
                <v-btn href="tel:+33624867169" color="secondary" text>
                  <v-icon>mdi-phone</v-icon>06.24.86.71.69
                </v-btn>
              </p>
                            <p>
                <v-btn
                  href="https://www.linkedin.com/in/fabien-grignoux-3ab9a4167/"
                  color="secondary"
                  text
                >
                  <v-icon>mdi-linkedin</v-icon>LinkedIn
                </v-btn>
              </p>
            </v-col>
            <v-col>
              <p>
                <v-btn @click="openDialog" color="accent" width="230" class="button__header">
                  <v-icon>mdi-email-edit</v-icon>Me contacter
                </v-btn>
              </p>
              <p>
                <v-btn @click="openDevis" color="secondary" width="230" class="button__header">
                  <v-icon>mdi-file-document-edit-outline</v-icon>Demander un devis
                </v-btn>
              </p>
            </v-col>

          </v-row>

        </div>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import ContactForm from '../components/ContactForm.vue'
export default {
  components: {
    ContactForm,
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,

      items: [
        {
          icon: 'mdi-home',
          title: 'Accueil',
          to: '/'
        },
        {
          icon: 'mdi-apps',
          title: 'Portfolio',
          to: '/portfolio'
        },
        {
          icon: 'mdi-book-open-page-variant ',
          title: 'Publications',
          to: '/posts'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      leftDrawer: false,
      title: 'Fabien Grignoux'
    }
  },

  methods: {
    openDialog() {
      this.$bus.$emit('openContact', true)
    },
    openDevis() {
      this.$bus.$emit('openDevis', true)
    }
  },


 
}
</script>
