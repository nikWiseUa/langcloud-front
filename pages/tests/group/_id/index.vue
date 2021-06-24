<template>
  <div>
    <h1 v-if="chousedCategory">Category: {{ chousedCategory.en }}</h1>
    <router-link :to="this.$route.params.id + '/learn'"
      ><v-btn color="primary">Start test</v-btn></router-link
    >
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({}),
  computed: {
    ...mapGetters({
      words: 'testWords/getWords',
      chousedCategory: 'categories/getChousedCategory',
      allCategories: 'categories/allCategories',
    }),
  },
  mounted() {
    if (this.allCategories.length === 0) {
      this.$router.push('/words');
    }
    this.chouseCategory(this.$route.params.id);
    this.fetchLearnWords(this.$route.params.id);
  },
  methods: {
    ...mapActions({
      fetchLearnWords: 'testWords/fetchLearnWords',
      chouseCategory: 'categories/chouseCategory',
    }),
  },
};
</script>
