export const state = () => ({
  _authenticated: false,
});

export const mutations = {
  loginIn(state, data) {
    state._authenticated = data;
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1);
  },
  toggle(state, todo) {
    todo.done = !todo.done;
  },
};

export const actions = {
  async login({ commit }, pushData) {
    const resp = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pushData),
    });
    const validStatus = resp.status === 201;
    commit('loginIn', validStatus);
    return validStatus;
  },
  async loginToken({ commit }) {
    const a = await fetch('http://localhost:3000/auth/tokenAuth', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
    commit('loginIn', a);
  },
  async register({ commit }, pushData) {
    const status = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pushData),
    }).then((res) => res.status);
    const validStatus = status === 201;
    commit('loginIn', validStatus);
    return validStatus;
  },
  async logout({ commit }) {
    await fetch('http://localhost:3000/auth/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    commit('loginIn', false);
  },
};

export const getters = {
  authenticated: (s) => {
    return s._authenticated;
  },
};
