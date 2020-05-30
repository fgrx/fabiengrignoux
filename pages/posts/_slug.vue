<template>
  <v-container>
    <div class="post">
      <article>
        <v-row justify="center">
          <v-col cols="12" sm="9">
            <h1>{{ post.title }}</h1>
            <p class="subtitle">{{ post.subtitle }}</p>
          </v-col>

          <v-col cols="12" sm="12">
            <v-img :src="image" max-height="400" cover alt></v-img>
          </v-col>

          <v-col cols="12" sm="9">
            <div class="resume">{{ post.description }}</div>
            <div class="phrasechoc">{{ post.phrasechoc }}</div>
            <div class="video" v-if="post.video">{{ post.video }}</div>
            <div class="content" v-html="$md.render(post.content)"></div>
          </v-col>
        </v-row>
      </article>
    </div>
  </v-container>
</template>

<script>
import postQuery from '@/graphql/getPublication'
import Prism from '~/plugins/prism'

export default {
  async asyncData({ app, route }) {
    const apolloQuery = await app.apolloProvider.defaultClient.query({
      query: postQuery,
      variables: { slug: route.params.slug }
    })

    const post = apolloQuery.data.articles[0]

    return {
      post
    }
  },

  computed: {
    image() {
      const imageDisplay =
        typeof this.post.image.size !== 'Object' &&
        typeof this.post.size == 'undefined'
          ? this.post.image.url
          : this.post.image.size.large.url

      return imageDisplay
    }
  },

  head() {
    return {
      title: this.post.title + ' - Fabien Grignoux, développeur web ',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.description
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.post.title + 'Fabien Grignoux, développeur web '
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: process.env.siteUrl + '/portfolio/' + this.post.slug
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: +this.post.description
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: `${this.image}`
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
.post {
  font-family: 'Raleway', sans-serif;

  .subtitle {
    font-size: 1.3em;
    margin-top: 1em;
  }

  .resume {
    font-weight: bold;
  }
}

p {
  img {
    text-align: center !important;
    margin-left: auto;
    margin-right: auto;
  }
}

.post {
  margin-top: 2em;
}
</style>
