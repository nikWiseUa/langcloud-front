<template>
  <div v-if="chousedCategory">
    <v-progress-circular
      v-if="!gameWords"
      :size="70"
      :width="7"
      color="purple"
      indeterminate
    ></v-progress-circular>
    <div v-else class="game">
      <div>
        <v-btn class="btn sucess">123123</v-btn>
      </div>
      <div v-if="inGame" class="rounds">
        <div>{{ chousedCategory.en }}</div>
        <div>{{ gameWords }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({}),
  computed: {
    ...mapGetters({
      gameWords: 'game/gameWords',
      chousedCategory: 'categories/chousedCategory',
      inGame: 'game/inGame',
    }),
  },
  mounted() {
    const catId = this.chousedCategory?.id;
    if (catId) {
      this.getGamesWords(catId);
    } else {
      this.$router.push('/games');
    }
    // this.startGame();
  },
  methods: {
    ...mapActions({
      getGamesWords: 'game/getGamesWords',
      startGame: 'game/startGame',
    }),
  },
};
</script>
