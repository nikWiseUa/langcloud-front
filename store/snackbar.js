export const state = () => ({
  _snackbar: false,
  _text: `Hello, I'm a snackbar`,
});

export const mutations = {
  CHANGE_SNACBAR(state, bool) {
    state._snackbar = bool;
  },
  CHANGE_TEXT(state, text) {
    state._text = text;
  },
};

export const actions = {
  openSnacbar({ commit, dispatch }, { time, text }) {
    commit('CHANGE_TEXT', text);
    commit('CHANGE_SNACBAR', true);
    setTimeout(() => {
      dispatch('closeSnacbar');
    }, time);
  },
  closeSnacbar({ commit }) {
    commit('CHANGE_SNACBAR', false);
  },
};

export const getters = {
  snackbar: (s) => s._snackbar,
  text: (s) => s._text,
};
