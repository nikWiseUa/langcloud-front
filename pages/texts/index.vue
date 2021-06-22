<template>
  <div>
    <h2>Choose what you will be improved now!</h2>
    <v-row class="pt-4">
      <v-col v-for="(text, id) in texts" :key="text.en + id + 'text'" cols="4">
        <v-card class="pa-2" elevation="1" outlined shaped>
          <h4 v-if="text.title" class="text-h5">{{ text.title.ua }}</h4>
          <small v-if="text.dificulty" class="text-subtitle-1 text--disabled">
            dificulty: {{ text.dificulty }}
          </small>
          <div class="buttons pt-3">
            <router-link tag="a" :to="`/texts/${text.id}`">
              <v-btn depressed color="primary"> Read text </v-btn>
            </router-link>
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
    ...mapGetters({ texts: 'texts/getTexts' }),
  },
  mounted() {
    this.fetchTexts();
  },
  methods: {
    ...mapActions({
      fetchTexts: 'texts/fetchTexts',
    }),
  },
};
</script>
