import throttle from 'lodash/throttle';

export const state = () => ({
  _words: [],
});
export const mutations = {
  SET_WORDS(s, words) {
    s._words = words;
  },
};
export const actions = {
  findWords: throttle(async ({ commit }, text) => {
    const words = await fetch(
      `${process.env.baseUrl}/words/text?text=${text}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((res) => res.json())
      .catch((err) => new Error(err));
    commit('SET_WORDS', words);
  }, 800),
};
export const getters = {
  words: (s) => s._words,
};
