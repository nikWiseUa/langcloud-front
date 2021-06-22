export const state = () => ({
  _allCategories: [],
  _chousedCategory: {
    en: 'error',
  },
});
export const mutations = {
  SET_CATEGORIES(state, categories) {
    state._allCategories = categories;
  },
  CHOUSE_CATEGORY(state, category) {
    console.log(category);
    state._chousedCategory = category;
  },
};
export const actions = {
  async getAllCategories({ commit }) {
    const categories = await fetch('http://localhost:3000/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
    console.log(categories);
    commit('SET_CATEGORIES', categories);
  },
  chouseCategory({ state, commit }, id) {
    const category = state._allCategories.find((e) => e.id === id);
    commit('CHOUSE_CATEGORY', category);
  },
};
export const getters = {
  allCategories: (s) => s._allCategories,
  getChousedCategory: (s) => s._chousedCategory,
};
