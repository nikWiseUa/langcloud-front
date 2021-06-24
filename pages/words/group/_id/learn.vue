<template>
  <div>
    <div class="d-flex align-center justify-space-around my-5">
      <h1 v-if="chousedCategory" class="text-h5">{{ chousedCategory.en }}</h1>
      <span
        >Words count: <span>{{ wordsDone.length }}</span></span
      >
    </div>
    <img
      :src="`https://via.placeholder.com/400X400.JPEG?text=${currentWord.en}`"
      :alt="currentWord.en"
    />
    <strong class="d-flex justify-center text-h3">
      {{ currentWord.en }}
    </strong>
    <div v-if="inChouse" class="d-flex justify-center my-4">
      <div
        v-for="(el, ind) in currentAnsvers"
        :key="'' + el + ind"
        class="mx-3"
      >
        <v-btn @click="chouseAnswer(ind)">{{ el }}</v-btn>
      </div>
    </div>
    <div v-else>
      <div>
        <span v-if="isRigthAnswer" class="green--text">true ANS</span>
        <span v-else class="red--text">IT`S a LYE, true ANS is:</span>
        <span> {{ currentAnsver }} </span>
      </div>
      <div></div>
      <div>
        <v-btn v-if="isRigthAnswer" @click="nextStep('done')">done</v-btn>
        <v-btn @click="nextStep('repeat')">repeat</v-btn>
      </div>
    </div>

    <div>Pull: {{ wordsPull.length + wordsRepeat.length }}</div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    inChouse: true,
    isRigthAnswer: false,
  }),
  computed: {
    ...mapGetters({
      words: 'learnWords/getWords',
      wordsPull: 'learnWords/getWordsPull',
      wordsRepeat: 'learnWords/getWordsRepeat',
      wordsDone: 'learnWords/getWordsDoneNow',
      chousedCategory: 'categories/getChousedCategory',
      currentWord: 'learnWords/getCurrentWord',
      currentAnsvers: 'learnWords/getCurrentAnsvers',
      currentAnsver: 'learnWords/getCurrentAnsver',
    }),
  },
  mounted() {
    if (this.words.length === 0) {
      this.$router.push('/words');
    }
    this.setupLearn();
  },
  methods: {
    ...mapActions({
      fetchLearnWords: 'learnWords/fetchLearnWords',
      setNewLearnedWord: 'learnWords/setNewLearnedWord',
      setNewRepeatWord: 'learnWords/setNewRepeatWord',
      setupLearn: 'learnWords/setupLearn',
      chouseCategory: 'categories/chouseCategory',
      submitChouse: 'learnWords/submitChouse',
    }),
    async chouseAnswer(ind) {
      this.isRigthAnswer = await this.submitChouse(ind);
      this.inChouse = false;
    },
    nextStep(type) {
      if (type === 'done') {
        this.setNewLearnedWord(this.currentWord);
      } else if (type === 'repeat') {
        this.setNewRepeatWord(this.currentWord);
      }
      if (this.wordsPull.length + this.wordsRepeat.length === 0) {
        this.$router.push('/words');
      }
      this.inChouse = true;
      // setNewRepeatWord(currentWord)
    },
  },
};
</script>
