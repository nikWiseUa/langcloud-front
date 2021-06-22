export default async function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.auth._authenticated) {
    await store.dispatch('auth/loginToken');
    // console.log(store.state.auth._authenticated);
    return !store.state.auth._authenticated ? redirect('/auth/login') : false;
  }
}
