export default (context) => {
  // const token = context.store.getters('auth/token')
  const {
    auth: { token, user }
  } = context.store.state

  if (!token || !user) {
    context.redirect('/')
  }

  if (!user.role.includes('admin')) {
    context.redirect('/')
  }
}
