<template>
  <div>
    <h1 v-if="chousedCategory">Category: {{ chousedCategory.en }}</h1>
    <div class="text-h6"><span>Learned:</span><b> 13%</b></div>
    <div class="text-h6"><span>Words Learned:</span><b>231/3000</b></div>
    <div class="mb-3 text-h6">
      <span>Words Learned in lasm week:</span><b>0</b>
    </div>
    <!-- <div><span>Words repeat:</span><b>123/231</b></div> -->
    <router-link :to="this.$route.params.id + '/learn'"
      ><v-btn color="primary">Learn</v-btn></router-link
    >
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({}),
  computed: {
    ...mapGetters({
      words: 'learnWords/getWords',
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
      fetchLearnWords: 'learnWords/fetchLearnWords',
      chouseCategory: 'categories/chouseCategory',
    }),
  },
};
</script>
