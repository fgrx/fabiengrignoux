<template>
  <div class="portfolio__item">
    <v-card
      flat
      tile
      :to="{ name: 'portfolio-slug', params: { slug: portfolio.slug } }"
    >
      <v-img :src="image" class="portfolio__image">
        <div class="portfolio__details">
          <div>
            <v-card-title>
              <h3>{{ portfolio.title }}</h3>
            </v-card-title>

            <div class="portfolio__techno_list">
              <div
                v-for="techno in portfolio.technos"
                :key="techno.id"
                class="item-techno"
              >
                <ItemTechno :techno="techno" class="item__techno" />
              </div>
            </div>

            <v-btn color="primary" outlined>
              <v-icon>$vuetify.icons.mdiEye</v-icon>Voir
            </v-btn>
          </div>
        </div>
      </v-img>
    </v-card>
  </div>
</template>

<script>
import ItemTechno from './ItemTechno.vue'

export default {
  components: { ItemTechno },
  props: ['portfolio'],

  computed: {
    image() {
      const sizeImage = (size) => {
        if (
          this.portfolio.image.size[size] &&
          this.portfolio.image.size[size].url
        )
          return this.portfolio.image.size[size].url
      }

      return sizeImage('medium')
        ? sizeImage('medium')
        : this.portfolio.image.url
    }
  }
}
</script>

<style lang="scss" scoped>
.item__techno {
  margin-bottom: 15px;
}

.portfolio__item,
.portfolio__image {
  height: 250px;
}

.portfolio__techno_list {
  display: flex;
  justify-content: center;
}

.portfolio__details {
  opacity: 0;
  transition: 0.3s;
  height: 100%;
  text-align: center;
  color: black;
  background-color: #f3f0f0;
  justify-content: center;
  align-items: center;
  display: flex;
  &:hover {
    opacity: 1;
  }

  .item-techno {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>
