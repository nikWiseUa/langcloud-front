<template>
  <div>
    <h2>Choose what you will be improved now!</h2>
    <v-row class="pt-4">
      <v-col
        v-for="(cat, id) in allCategories"
        :key="cat.en + id + 'cat'"
        cols="4"
      >
        <v-card class="pa-2" elevation="1" outlined shaped>
          <h4 class="text-h5">{{ cat.en }}</h4>
          <small class="text-subtitle-1 text--disabled"
            >Category id: {{ cat.id }}</small
          >
          <div class="buttons pt-3">
            <v-btn depressed color="primary">
              <router-link tag="a" :to="`/words/group/${cat.id}`">
                Learn words
              </router-link>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({ allCategories: 'categories/allCategories' }),
  },
  mounted() {
    this.getAllCategories();
  },
  methods: {
    ...mapActions({
      getAllCategories: 'categories/getAllCategories',
    }),
  },
};
</script>
