export default (context) => {
  const {
    auth: { token, user }
  } = context.store.state

  if (token || user) {
    const path = '/user'
    context.redirect(path)
  }
}
