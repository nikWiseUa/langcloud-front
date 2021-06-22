<template>
  <div>
    <h2 class="text-h2">Search</h2>
    <v-autocomplete
      v-model="selected"
      :class="{ unvalid: !valid && word }"
      :search-input.sync="word"
      :items="wordsEn"
      placeholder="write what you search"
      class="mt-3"
      dense
      rounded
    >
    </v-autocomplete>
    <div v-if="searched">
      <SearchedItem :item="searched"> </SearchedItem>
    </div>
  </div>
</template>
<script>
// import throttle from 'lodash/throttle';
import { mapGetters, mapActions } from 'vuex';

import SearchedItem from '@/components/SearchedItem.vue';

export default {
  components: {
    SearchedItem,
  },
  data: () => ({
    word: '',
    selected: null,
    regWord: new RegExp('^[a-z ]+$', 'gi'),
    searched: '',
  }),
  computed: {
    ...mapGetters({ words: 'search/words' }),
    wordsEn() {
      return this.words.map((e) => e.en);
    },
    valid() {
      return /^[a-z ]+$/gi.test(this.word);
    },
  },
  watch: {
    word(val) {
      if (!this.valid || !val) return;
      val.trim() && this.findWords(val.trim());
      return val;
    },
    selected(val) {
      this.searched = this.words.find((e) => e.en === val);
    },
  },
  mounted() {},
  methods: {
    ...mapActions({ findWords: 'search/findWords' }),
  },
};
</script>

<style scoped lang="scss">
.unvalid {
  border: 2px solid red;
}
</style>
