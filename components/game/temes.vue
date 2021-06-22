<template>
  <section class="categories">
    <v-row
      v-for="(cat, id) in gameCategories"
      :key="cat.en + id + 'cat'"
      class="pt-4"
    >
      <v-col cols="4">
        <v-card class="pa-2" elevation="1" outlined shaped>
          <h5 class="text-h5 pb-2">{{ cat.id }}</h5>
          <small class="text-subtitle-1">Категория: {{ cat.en }}</small>
          <div class="buttons pt-3">
            <v-btn depressed color="primary" @click="chouseHandler(cat.id)">
              <!-- <router-link tag="a" :to="`/words/learn/${cat.id}`"> -->
              Chouse
              <!-- </router-link> -->
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({ gameCategories: 'categories/gameCategories' }),
  },
  mounted() {
    this.getGameCategories();
  },
  methods: {
    ...mapActions({
      getGameCategories: 'categories/getGameCategories',
      chouseCategory: 'categories/chouseCategory',
    }),
    chouseHandler(id) {
      this.chouseCategory(id);
      this.$emit('swipeToSettings');
    },
  },
};
</script>
