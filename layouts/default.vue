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
      <v-dialog v-model="dialogContact" max-width="600" max-height="600" overlay-color="white">
        <v-card>
          <v-card-title  class="headline"><span v-if="!isDevis">Contactez moi</span><span v-else>Parlez-moi de votre projet</span></v-card-title>


          <v-card-text>
            <form
              name="contact"
              action
              method="post"
              v-if="!submittedMessage"
              v-on:submit.prevent="sendMessage"
            >

                <p>
                <v-text-field
                  label="Votre nom"
                  v-model="nom"
                  required
                  type="text"
                  name="nom"
                ></v-text-field>
              </p>

             <p>
                <v-text-field
                  label="Votre email"
                  v-model="email"
                  required
                  type="email"
                  name="email"
                ></v-text-field>
              </p>

                           <p>
                <v-text-field
                  label="Votre Téléphone"
                  v-model="telephone"
                  type="text"
                  name="telephone"
                ></v-text-field>
              </p>

              <p>
                <v-text-field
                  label="Entreprise"
                  v-model="entreprise"
                
                  type="text"
                  name="entreprise"
                ></v-text-field>
              </p>



              <p>
                <v-textarea v-if="!isDevis" outlined name="message" v-model="message" label="Votre message" value></v-textarea>
                 <v-textarea v-if="isDevis" outlined name="message" v-model="message" label="Décrivez-moi votre projet" value></v-textarea>
              </p>
              <p>
                <v-btn color="accent" type="submit">Envoyer</v-btn>
                <v-btn color="secondary" @click="closeDialog">Annuler</v-btn>
              </p>
            </form>
            <div v-if="submittedMessage" v-html="submittedMessage"></div>
          </v-card-text>
        </v-card>
      </v-dialog>
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
          <v-snackbar
            v-model="snackbar"
          >
            {{ textSnackbar }}
            <v-btn
              color="primary"
              text
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </v-snackbar>
        </div>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      message: '',
      email: '',
      nom:"",
      entreprise:"",
      telephone:"",
      submittedMessage: '',
      notificationType: '',
      snackbar:"",
      textSnackbar:"",
      dialogContact: false,
      isDevis:false,
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
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      leftDrawer: false,
      title: 'Fabien Grignoux'
    }
  },
  created () {
    this.$bus.$on('openContact', data=> { 
      this.openDialog()
   }) 
    this.$bus.$on('openDevis', data=> { 
      this.openDevis()
   }) 
},
  methods: {
    closeDialog(){
      this.dialogContact = false
    },
    openDialog() {
      this.isDevis=false
      this.dialogContact = true
    },
    openDevis() {
      this.isDevis=true
      this.dialogContact = true
    },
       createMessage(){
        const corpsMessage = `Email : ${this.email}\n\nMessage : ${this.message}`
        if(!this.isDevis)return corpsMessage

        const corpsDevis = `Demande de devis \n\nNom : ${this.nom}\nEntreprise ${this.entreprise}\nTéléphone ${this.telephone}\n${corpsMessage}`
        return corpsDevis
      },
    async sendMessage() {
      this.dialogContact = false
      const urlMail =
        'https://wegfm6uwi8.execute-api.eu-central-1.amazonaws.com/sendmail/contact-me'


      const sendMessage=this.createMessage()

      const mail = {
        email: this.email,
        message: sendMessage
      }

      const result = await this.$axios({
        method: 'post',
        url: urlMail,
        data: mail
      })

      if ((result.status = 200)) {
        this.snackbar=true
        this.textSnackbar="Votre message a été envoyé avec succès"
       } else {
         this.snackbar=true
        this.textSnackbar="Une erreur est survenue :("      }
    }
  },

}
</script>
