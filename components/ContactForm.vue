<template>
  <div>
    <v-dialog
      v-model="dialogContact"
      max-width="600"
      max-height="600"
      overlay-color="white"
    >
      <v-card>
        <v-card-title class="headline">
          <span v-if="!isDevis">Contactez moi</span>
          <span v-else>Parlez-moi de votre projet</span>
        </v-card-title>

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
                v-if="isDevis"
                v-model="telephone"
                type="text"
                name="telephone"
              ></v-text-field>
            </p>

            <p>
              <v-text-field
                v-if="isDevis"
                label="Entreprise"
                v-model="entreprise"
                type="text"
                name="entreprise"
              ></v-text-field>
            </p>

            <p>
              <v-textarea
                v-if="!isDevis"
                outlined
                name="message"
                v-model="message"
                label="Votre message"
                value
              ></v-textarea>
              <v-textarea
                v-if="isDevis"
                outlined
                name="message"
                v-model="message"
                label="Décrivez-moi votre projet"
                value
              ></v-textarea>
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
    <v-snackbar v-model="snackbar">
      {{ textSnackbar }}
      <v-btn color="primary" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      email: '',
      nom: '',
      entreprise: '',
      telephone: '',
      isDevis: false,
      submittedMessage: '',
      notificationType: '',
      snackbar: '',
      textSnackbar: '',
      dialogContact: false
    }
  },
  created() {
    this.$nuxt.$on('openContact', (data) => {
      this.openDialog()
    })
    this.$nuxt.$on('openDevis', (data) => {
      this.openDevis()
    })
  },
  methods: {
    initDialog() {
      this.message = ''
      this.email = ''
      this.nom = ''
      this.entreprise = ''
      this.telephone = ''
      this.isDevis = false
      this.submittedMessage = ''
      this.notificationType = ''
      this.dialogContact = false
    },
    closeDialog() {
      this.initDialog()
    },
    openDialog() {
      this.isDevis = false
      this.dialogContact = true
    },
    openDevis() {
      this.isDevis = true
      this.dialogContact = true
    },
    createMessage() {
      const corpsMessage = `Email : ${this.email}\n\nMessage : ${this.message}`
      if (!this.isDevis) return corpsMessage

      const corpsDevis = `Demande de devis \n\nNom : ${this.nom}\nEntreprise ${this.entreprise}\nTéléphone ${this.telephone}\n${corpsMessage}`
      return corpsDevis
    },
    async sendMessage() {
      const urlMail =
        'https://wegfm6uwi8.execute-api.eu-central-1.amazonaws.com/sendmail/contact-me'

      const sendMessage = this.createMessage()

      const mail = {
        email: this.email,
        message: sendMessage
      }

      const result = await this.$axios({
        method: 'post',
        url: urlMail,
        data: mail
      })
      this.closeDialog()
      if ((result.status = 200)) {
        this.snackbar = true
        this.textSnackbar = 'Votre message a été envoyé avec succès'
      } else {
        this.snackbar = true
        this.textSnackbar = 'Une erreur est survenue :('
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
