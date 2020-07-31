<template>
  <v-app dark>
 

    <v-app-bar color="transparent" flat fixed >
      

       <!-- <v-toolbar-title><v-btn :to="{name:'index'}" text input-value="transparent">Fabien Grignoux - dev web</v-btn></v-toolbar-title> -->
      <v-spacer />



      <div class="d-none d-lg-block">
        <v-btn v-for="(item, i) in items" :key="i" :to="item.to" router exact text color="#091584">
          <i class="material-icons">{{ item.icon }}</i>
          {{ item.title }}
        </v-btn>
      </div>
     <v-btn icon @click.stop="rightDrawer = !rightDrawer" class="d-lg-none">
        <i class="material-icons">menu</i>
      </v-btn>


    </v-app-bar>


    <v-main>
      <v-container class="pa-0 ma-0" fluid>
        <nuxt />
      </v-container>
      <ContactForm />

    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed color="primary" dark>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content >
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
                  <i class="material-icons">email</i> fabien.grignoux@outlook.com
                </v-btn>
              </p>
                            <p>
                <v-btn href="tel:+33624867169" color="secondary" text>
                 <i class="material-icons">phone</i> 06.24.86.71.69
                </v-btn>
              </p>
                            <p>
                <v-btn
                  href="https://www.linkedin.com/in/fabien-grignoux-3ab9a4167/"
                  color="secondary"
                  text
                >
                  <i class="material-icons">face</i> LinkedIn
                </v-btn>
              </p>
            </v-col>
            <v-col>
              <p>
                <v-btn @click="openDialog" color="accent" width="230" class="button__header">
                  <i class="material-icons">email</i> Me contacter
                </v-btn>
              </p>
              <p>
                <v-btn @click="openDevis" color="secondary" width="230" class="button__header">
                <i class="material-icons">description</i> Demander un devis
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
          icon: 'home',
          title: 'Accueil',
          to: '/'
        },
        {
          icon: 'apps',
          title: 'Portfolio',
          to: '/portfolio'
        },
        {
          icon: 'book',
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
      $nuxt.$emit('openContact', true)
    },
    openDevis() {
      $nuxt.$emit('openDevis', true)
    }
  },


 
}
</script>


<style lang="scss">
pre{
  padding:1em;
  background:rgb(39, 39, 39) !important;
  color:white;
  margin-bottom:2em;
}

.v-application code {
  all: unset;
  background: rgb(39, 39, 39) !important;
  width: 100% !important;
}

.v-application code.code--custom {
  all: unset;
  color: #eee;
}
</style>

<style lang="scss" scoped>
.v-btn{
   text-transform:none !important;
}

.v-btn--active{
background:none;
}


</style>
