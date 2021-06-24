export const state = () => ({
  _wordsByCategory: [],
});
export const mutations = {
  SET_WORDS(state, words) {
    state._wordsByCategory = words;
  },
};
export const actions = {
  async getAllWords({ commit }, id) {
    const words = await fetch(
      `${process.env.baseUrl}/words/category?id=${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).then((res) => res.json());
    commit('SET_WORDS', words);
  },
};
export const getters = {
  wordsByCategory: (s) => s._wordsByCategory,
};
