<template>
  <div>
    <div class="d-flex align-center justify-space-around my-5">
      <h1 v-if="chousedCategory" class="text-h5">{{ chousedCategory.en }}</h1>
    </div>
    <div v-if="inChouse">
      <img
        :src="`https://via.placeholder.com/400X400.JPEG?text=${currentWord.en}`"
        :alt="currentWord.en"
      />
      <strong class="d-flex justify-center text-h3">
        {{ currentWord.en }}
      </strong>
      <div class="d-flex justify-center my-4">
        <div
          v-for="(el, ind) in currentAnsvers"
          :key="'' + el + ind"
          class="mx-3"
        >
          <v-btn @click="chouseAnswer(ind)">{{ el }}</v-btn>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="d-flex justify-center">
        <div>correct: {{ wordsAnswers }}</div>
        <div class="ml-3">uncorect: {{ wordsCount - wordsAnswers }}</div>
      </div>
      <div>result {{ result }}</div>
    </div>
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
      words: 'testWords/getWords',
      wordsAnswers: 'testWords/getCorrectlyAnswersCount',
      wordsCount: 'testWords/getWordsCount',
      wordsPull: 'testWords/getWordsPull',
      wordsRepeat: 'testWords/getWordsRepeat',
      wordsDone: 'testWords/getWordsDoneNow',
      chousedCategory: 'categories/getChousedCategory',
      currentWord: 'testWords/getCurrentWord',
      currentAnsvers: 'testWords/getCurrentAnsvers',
      currentAnsver: 'testWords/getCurrentAnsver',
    }),
    result() {
      const percentTrueAnswers = (100 / this.wordsCount) * this.wordsAnswers;
      let resylt = 'незадовільно';
      if (percentTrueAnswers > 85) {
        resylt = 'відмінно';
      } else if (percentTrueAnswers > 55) {
        resylt = 'добре';
      } else if (percentTrueAnswers > 35) {
        resylt = 'задовільно';
      }
      return resylt;
    },
  },
  mounted() {
    if (this.words.length === 0) {
      this.$router.push('/words');
    }
    this.setupLearn();
  },
  methods: {
    ...mapActions({
      fetchtestWords: 'testWords/fetchtestWords',
      setNewLearnedWord: 'testWords/setNewLearnedWord',
      setNewRepeatWord: 'testWords/setNewRepeatWord',
      setupLearn: 'testWords/setupLearn',
      chouseCategory: 'categories/chouseCategory',
      submitChouse: 'testWords/submitChouse',
    }),
    async chouseAnswer(ind) {
      this.isRigthAnswer = await this.submitChouse(ind);
      this.setNewLearnedWord(this.currentWord);
      if (this.wordsPull.length + this.wordsRepeat.length === 0) {
        this.inChouse = false;
      }
      // this.inChouse = false;
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
