export const state = () => ({
  _words: [],
  _wordsPull: [],
  _wordsRepeat: [],
  _wordsDone: [],
  _wordsDoneNow: [],
  _currentWord: {
    en: 'Error',
  },
  _currentWordList: null,
  _currentAnsvers: [],
  _trueAnsverInd: 0,
  _trueAnsver: '',
});
export const mutations = {
  SET_WORDS(state, words) {
    state._words = words;
  },
  SET_PULL_WORDS(state, words) {
    state._wordsPull = words;
  },
  SET_DONE_WORDS(state, words) {
    state._wordsDone = words;
  },
  REMOVE_CURRENT_WORD(state, word) {
    state[state._currentWordList] = state[state._currentWordList].filter(
      (word) => word.en !== state._currentWord.en,
    );
  },
  PUSH_DONE_WORDS_NOW(state, word) {
    state._wordsDone.push(word);
    const data = JSON.stringify({
      word,
    });
    fetch('http://localhost:3000/words/learned', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
  },
  SET_NEW_ANSWERS(state) {
    const forLoops = state._words.length < 4 ? state._words.length : 4;
    const chousedIndex = Math.floor(Math.random() * forLoops);
    const currentAnsvers = [];
    console.log(forLoops, chousedIndex);
    for (let i = 0; i < forLoops; i++) {
      if (i === chousedIndex) {
        const index = currentAnsvers.indexOf(
          (ans) => ans === state._currentWord?.ua,
        );
        if (~index) {
          state._trueAnsverInd = index;
        } else {
          currentAnsvers.push(state._currentWord?.ua);
          state._trueAnsver = state._currentWord?.ua;
          state._trueAnsverInd = i;
        }
      } else {
        const answer =
          state._words[Math.floor(Math.random() * state._words.length)]?.ua;
        if (currentAnsvers.includes(answer)) {
          i--;
          continue;
        } else {
          currentAnsvers.push(answer);
        }
      }
    }
    state._currentAnsvers = currentAnsvers;
  },
  SET_NEW_CURRENT_WORD(state) {
    const randomNum = Math.random() > 0.5;
    let chousedList = randomNum ? state._wordsPull : state._wordsRepeat;
    state._currentWordList = randomNum ? '_wordsPull' : '_wordsRepeat';
    if (!chousedList.length) {
      chousedList = !randomNum ? state._wordsPull : state._wordsRepeat;
      state._currentWordList = !randomNum ? '_wordsPull' : '_wordsRepeat';
    } else {
      // end game
    }
    const chousedIndex = Math.floor(Math.random() * chousedList.length);
    if (chousedList[chousedIndex]) {
      state._currentWord = chousedList[chousedIndex];
    }
  },
  TEST_CHOUSE(state, ind) {
    //
  },
};
export const actions = {
  async fetchLearnWords({ commit }, id) {
    const words = await fetch(
      `http://localhost:3000/words/category?id=${id}&type=learn`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
      });
    console.log('words', words);
    commit('SET_WORDS', words ?? []);
    commit('SET_PULL_WORDS', words);
  },
  setNewLearnedWord({ commit }, word) {
    commit('PUSH_DONE_WORDS_NOW', word);
    commit('REMOVE_CURRENT_WORD');
    commit('SET_NEW_CURRENT_WORD');
    commit('SET_NEW_ANSWERS');
  },
  setNewRepeatWord({ commit }, word) {
    commit('SET_NEW_CURRENT_WORD');
    commit('SET_NEW_ANSWERS');
  },
  setupLearn({ commit }) {
    commit('SET_NEW_CURRENT_WORD');
    commit('SET_NEW_ANSWERS');
  },
  submitChouse({ state, commit }, ind) {
    commit('TEST_CHOUSE', ind);
    return state._trueAnsverInd === ind;
  },
};
export const getters = {
  getWords: (s) => s._words,
  getWordsPull: (s) => s._wordsPull,
  getWordsRepeat: (s) => s._wordsRepeat,
  getWordsDone: (s) => s._wordsDone,
  getWordsDoneNow: (s) => s._wordsDoneNow,
  getCurrentWord: (s) => s._currentWord,
  getCurrentAnsvers: (s) => s._currentAnsvers,
  getCurrentAnsver: (s) => s._trueAnsver,
};
