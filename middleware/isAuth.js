export default function(context) {
  // Initial Check There is Authentication
  // Example from cookies and localforage (localstorage)
  // And then we set to set VUEX store
  context.store.dispatch('auth/initAuth', context.req)
}
