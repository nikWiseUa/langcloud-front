export const state = () => ({
  list: [],
  stats: {
    name: 'user',
    statistic: {},
    learned: {},
    weekData: {
      wordsInWeek: [],
    },
  },
});

export const mutations = {
  add(state, text) {
    state.list.push({
      text,
      done: false,
    });
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1);
  },
  toggle(state, todo) {
    todo.done = !todo.done;
  },
  SET_USER_STATS(state, data) {
    console.log(data);
    state.stats = data;
  },
};

export const actions = {
  add({ commit }) {
    commit('add', 'dde');
  },
  async fetchUserStatistic({ commit }, data) {
    const stats = await fetch('http://localhost:3000/profile/stats', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    }).then((res) => res.json());
    commit('SET_USER_STATS', stats);
  },
};
export const getters = {
  getUserStats: (s) => s.stats,
};
