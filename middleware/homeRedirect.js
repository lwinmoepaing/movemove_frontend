export default (context) => {
  const {
    auth: { token, user }
  } = context.store.state

  if (token || user) {
    const roles = ['admin', 'user']
    const path = roles.includes(user.role) ? user.role : '/'

    context.redirect(path)
  }
}
