<template>
  <div>
    <div v-for="(word, id) of words" :key="word.en + id + 'word'">
      <v-card class="my-3 py-1">
        <h5 class="text-h5">
          {{ word.en }}
          {{ word.ru }}
          {{ word.ua }}
        </h5>
      </v-card>
    </div>
    <div></div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({}),
  computed: {
    ...mapGetters({ words: 'learnWords/getWords' }),
  },
  mounted() {
    this.fetchLearnWords(this.$route.params.id);
  },
  methods: {
    ...mapActions({ fetchLearnWords: 'learnWords/fetchLearnWords' }),
  },
};
</script>
