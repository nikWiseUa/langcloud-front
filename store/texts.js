export const state = () => ({
  _texts: [],
});

export const mutations = {
  SET_TEXTS(state, texts) {
    state._texts = texts;
  },
};
export const actions = {
  async fetchTexts({ commit }) {
    const texts = await fetch('http://localhost:3000/text', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
    console.log(texts);
    commit('SET_TEXTS', texts);
  },
};
export const getters = {
  getTexts: (s) => s._texts,
};
