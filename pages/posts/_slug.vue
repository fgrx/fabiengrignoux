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
  data() {
    return {
      post: {}
    }
  },

  apollo: {
    post: {
      query: postQuery,
      prefetch: true,
      variables() {
        return { slug: this.$route.params.slug }
      },
      update: (data) => data.articles[0]
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
  mounted() {
    //Prism.highlightAll()
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
